# /// script
# requires-python = ">=3.11"
# dependencies = ["trimesh", "numpy", "fast-simplification"]
# ///
"""Turn the Unitree H1-2 MJCF model into one web-sized GLB.

The MJCF body tree is reproduced as a glTF node hierarchy, so the exported file
keeps every joint frame and the site can pose the robot by rotating nodes by
name. Each visual mesh is decimated hard: the robot renders about 300 px tall in
the hero, so ~9% of the original triangles is indistinguishable at that size and
turns ~550k triangles into something a phone can download.

Usage (from the repo root):
    uv run scripts/build_robot_glb.py --src <path to models/h1_2> --out public/robot/h1_2.glb
"""

from __future__ import annotations

import argparse
import xml.etree.ElementTree as ET
from pathlib import Path

import fast_simplification
import numpy as np
import trimesh
from trimesh.transformations import quaternion_matrix

# Fraction of each mesh's triangles to keep, and a floor so small parts (the
# ankle pitch link is only ~680 triangles) do not collapse into nothing.
KEEP_FRACTION = 0.09
MIN_FACES = 260

DARK = [0.10, 0.10, 0.10, 1.0]
WHITE = [0.95, 0.95, 0.95, 1.0]


def body_transform(body: ET.Element) -> np.ndarray:
    """Local transform of an MJCF <body>, which is a translation then a rotation."""
    pos = np.fromstring(body.get("pos", "0 0 0"), sep=" ")
    # MuJoCo quaternions are (w, x, y, z), which is also what trimesh expects.
    quat = np.fromstring(body.get("quat", "1 0 0 0"), sep=" ")
    matrix = quaternion_matrix(quat)
    matrix[:3, 3] = pos
    return matrix


def geom_transform(geom: ET.Element) -> np.ndarray:
    pos = np.fromstring(geom.get("pos", "0 0 0"), sep=" ")
    quat = np.fromstring(geom.get("quat", "1 0 0 0"), sep=" ")
    matrix = quaternion_matrix(quat)
    matrix[:3, 3] = pos
    return matrix


def load_decimated(path: Path) -> trimesh.Trimesh:
    mesh = trimesh.load_mesh(path, process=False)
    if isinstance(mesh, trimesh.Scene):
        mesh = trimesh.util.concatenate(tuple(mesh.geometry.values()))

    # The STLs are triangle soup: welding shared vertices first is what makes
    # decimation able to collapse edges at all, and it also shrinks the export.
    mesh.merge_vertices()

    before = len(mesh.faces)
    target = max(MIN_FACES, int(before * KEEP_FRACTION))
    if target < before:
        points, faces = fast_simplification.simplify(
            mesh.vertices.astype(np.float32),
            mesh.faces.astype(np.int32),
            target_reduction=1.0 - target / before,
        )
        mesh = trimesh.Trimesh(vertices=points, faces=faces, process=False)

    print(f"  {path.name:38s} {before:7d} -> {len(mesh.faces):6d} faces")
    return mesh


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--src", required=True, type=Path, help="models/h1_2 directory")
    parser.add_argument("--out", required=True, type=Path, help="destination .glb")
    args = parser.parse_args()

    xml_path = next(args.src.glob("*.xml"))
    root = ET.parse(xml_path).getroot()

    mesh_files = {
        m.get("name"): args.src / "meshes" / m.get("file")
        for m in root.findall("./asset/mesh")
    }

    # Decimate each distinct STL once, even though several links share one file.
    print(f"Decimating {len(mesh_files)} meshes from {xml_path.name}:")
    cache: dict[str, trimesh.Trimesh] = {
        name: load_decimated(path) for name, path in sorted(mesh_files.items())
    }

    scene = trimesh.Scene()
    counts = {"bodies": 0, "meshes": 0}

    def walk(body: ET.Element, parent: str) -> None:
        name = body.get("name")
        scene.graph.update(
            frame_to=name, frame_from=parent, matrix=body_transform(body)
        )
        counts["bodies"] += 1

        # Visual geoms only, and one node per distinct mesh: every link repeats
        # its mesh as a collision geom, which would otherwise be exported twice.
        seen: set[str] = set()
        for geom in body.findall("geom"):
            mesh_name = geom.get("mesh")
            if geom.get("type") != "mesh" or mesh_name is None:
                continue
            if mesh_name in seen:
                continue
            seen.add(mesh_name)

            mesh = cache[mesh_name].copy()
            rgba = np.fromstring(geom.get("rgba", "0.1 0.1 0.1 1"), sep=" ")
            colour = WHITE if rgba[:3].mean() > 0.5 else DARK
            mesh.visual = trimesh.visual.TextureVisuals(
                material=trimesh.visual.material.PBRMaterial(
                    name=f"{mesh_name}_mat",
                    baseColorFactor=colour,
                    metallicFactor=0.55,
                    roughnessFactor=0.45,
                )
            )
            scene.add_geometry(
                mesh,
                node_name=f"{name}__{mesh_name}",
                geom_name=f"{name}__{mesh_name}",
                parent_node_name=name,
                transform=geom_transform(geom),
            )
            counts["meshes"] += 1

        for child in body.findall("body"):
            walk(child, name)

    for body in root.findall("./worldbody/body"):
        walk(body, scene.graph.base_frame)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_bytes(scene.export(file_type="glb"))

    total = sum(len(m.faces) for m in cache.values())
    print(
        f"\n{counts['bodies']} bodies, {counts['meshes']} mesh nodes, "
        f"{total} unique faces -> {args.out} "
        f"({args.out.stat().st_size / 1e6:.2f} MB)"
    )


if __name__ == "__main__":
    main()

import { ReactNode } from "react";

export default function Section({children} : {children: ReactNode}) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-10 col-start-2 bg-linear-to-br from-background to-background-light rounded-2xl py-16 z-0 border shadow hover:shadow-lg hover:from-background-light transition">
        {children}
      </div>
    </div>
  );
}

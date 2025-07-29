export const siteConfig = {
  name: "Akbar Tokochev",
  title: "Software Engineer",
  description: "Portfolio website of Akbar Tokochev",
  accentColor: "#1d4ed8",
  social: {
    email: "atokochev@gmail.com",
    linkedin: "https://linkedin.com/in/akbartokochev/",
    github: "https://github.com/Akbro23/",
  },
  aboutMe:
    "I'm a recent Computer Engineering graduate from METU, curious and eager to learn new technologies and best practices. I want to grow and excel to be able to deliver high-quality software. If that sounds like a good match, feel free to reach out!",
  skills: ["Python", "C", "C++", "JavaScript", "Django", "NextJS", "React", "PyTorch", "SQL", "MongoDB", "Docker", "Git"],
  // projects: [
  //   {
  //     name: "AI Dev Roundup Newsletter",
  //     description:
  //       "One concise email. Five minutes. Every Tuesday. Essential AI news & trends, production-ready libraries, powerful AI tools, and real-world code examples",
  //     link: "https://aidevroundup.com/?ref=devportfolio",
  //     skills: ["React", "Node.js", "AWS"],
  //   },
  //   {
  //     name: "Chrome Extension Mastery: Build Full-Stack Extensions with React & Node.js",
  //     description:
  //       "Master the art of building production-ready, full-stack Chrome Extensions using modern web technologies and best practices",
  //     link: "https://fullstackextensions.com/?ref=devportfolio",
  //     skills: ["React", "Node.js", "AWS"],
  //   },
  //   {
  //     name: "ExtensionKit",
  //     description:
  //       "Kit to jump-start your Chrome extension projects with a variety of battle-tested starter templates & examples",
  //     link: "https://extensionkit.io/?ref=devportfolio",
  //     skills: ["React", "Node.js", "AWS"],
  //   },
  // ],
  experience: [
    {
      company: "TechNarts",
      title: "Software Engineer",
      dateRange: "Nov 2024 - Present",
      bullets: [
        "Proposed and successfully adopted UV over PIP, reducing container build time by 37%",
        "Led migration of project to a new internal library, enabling code reuse and reducing development time",
        "Developed email notification system to alert users about task statuses",
      ],
    },
    {
      company: "TechNarts",
      title: "Software Engineer Intern",
      dateRange: "Jul 2024 - Jul 2024",
      bullets: [
        "Developed Django app for personalized restaurant meal recommendations",
        "Integrated recommendation model using Surprise library",
        "Configured periodic model retraining using Celery",
      ],
    },
    {
      company: "Beko Corporate",
      title: "Software Engineer Intern",
      dateRange: "Jul 2023 - Aug 2023",
      bullets: [
        "Automated dishwasher software generation from Excel, reducing the time by 93% from 15 minutes to 1 minute, by developing Python GUI app",
        "Optimized header generation app by 97% from 3 minutes to 5 seconds by reducing number of database calls",
        "Developed new features for existing apps to make them automation friendly",
      ],
    },
  ],
  education: [
    {
      school: "Middle East Technical University",
      degree: "BSc Computer Engineering",
      dateRange: "Sep 2021 - Jun 2025",
      achievements: [
        "GPA: 3.62/4.00",
        "Graduated with High Honors",
        "100% merit-based scholarship",
        "Technical Electives: Machine Learning, Deep Learning, Cloud Computing, Robotics",
      ],
    },
    {
      school: "University of Alberta",
      degree: "Exchange Program",
      dateRange: "Sep 2023 - Dec 2023",
      achievements: [
        "GPA: 3.74/4.00",
        "Coursework: Algorithms, Computer Organization, File and Database Management, Numerical Methods, Dinosaurs 🦖",
      ],
    },
  ],
};

import profileAsset from "@/assets/profile.png.asset.json";
import resumeAsset from "@/assets/resume.pdf.asset.json";

export const PROFILE = {
  name: "Tharak Gumpu",
  title: "B.Tech Student | Artificial Intelligence Enthusiast",
  headline: "Turning Ideas Into Intelligent Solutions.",
  bio: "An enthusiastic 3rd-year B.Tech student passionate about exploring Artificial Intelligence and emerging technologies. Interested in developing technical skills, working on innovative projects, and applying technology to solve real-world problems.",
  about:
    "Enthusiastic 3rd-year B.Tech student passionate about exploring Artificial Intelligence and emerging technologies. Interested in developing technical skills, working on innovative projects, and applying technology to solve real-world problems. A motivated learner looking for opportunities to gain practical experience and grow in the technology industry.",
  location: "Hyderabad, Telangana, India",
  email: "tharakvarma8@gmail.com",
  phone: "9063125997",
  linkedin: "https://linkedin.com/in/tharak-varma-3a04bb326",
  github: "https://github.com/Tharakvarma",
  // Replace the asset pointer below to swap the profile photo.
  photo: profileAsset.url,
  // Replace the asset pointer below to swap the resume PDF.
  resume: resumeAsset.url,
} as const;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;

export const HIGHLIGHTS = [
  { value: "3rd Year", label: "B.Tech Student" },
  { value: "8.7", label: "Academic Score" },
  { value: "AIML", label: "Specialization" },
  { value: "2+", label: "Featured Projects" },
] as const;

export const EDUCATION = [
  {
    school: "Scient Institute of Technology",
    program: "B.Tech — Artificial Intelligence & Machine Learning",
    score: "Academic Score: 8.7",
    location: "Telangana, India",
  },
  {
    school: "Telangana State Model School",
    program: "[Add qualification]",
    score: "[Add score]",
    location: "Telangana, India",
  },
] as const;

export const SKILL_GROUPS = [
  {
    category: "Programming",
    items: ["Python", "R", "C"],
  },
  {
    category: "Web Development",
    items: ["HTML", "CSS"],
  },
  {
    category: "Cyber Security",
    items: ["Cyber Security Fundamentals"],
  },
  {
    category: "AI Tools",
    items: ["ChatGPT", "Claude", "Lovable", "Google Gemini"],
  },
  {
    category: "Data & Visualization",
    items: ["Power BI", "R"],
  },
] as const;

export type Project = {
  slug: string;
  index: string;
  title: string;
  period: string;
  description: string;
  technologies: string;
  github: string;
  demo: string;
  preview: string;
  screenshots: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "ecommerce",
    index: "01",
    title: "AI-Powered E-Commerce Product Recommendation System",
    period: "03/2026 – 04/2026",
    description: "[Add project description]",
    technologies: "[Add technologies]",
    github: "[Add GitHub link]",
    demo: "[Add Live Demo link]",
    preview: "/images/projects/ecommerce/preview.jpg",
    screenshots: [
      "/images/projects/ecommerce/screenshot1.jpg",
      "/images/projects/ecommerce/screenshot2.jpg",
      "/images/projects/ecommerce/screenshot3.jpg",
    ],
  },
  {
    slug: "crypto-oracle",
    index: "02",
    title: "Crypto Oracle",
    period: "03/2026 – 04/2026",
    description: "[Add project description]",
    technologies: "[Add technologies]",
    github: "[Add GitHub link]",
    demo: "[Add Live Demo link]",
    preview: "/images/projects/crypto-oracle/preview.jpg",
    screenshots: [
      "/images/projects/crypto-oracle/screenshot1.jpg",
      "/images/projects/crypto-oracle/screenshot2.jpg",
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: "Introduction to Gen AI Studio",
    issuer: "Google Cloud",
    image: "/images/certificates/google-gen-ai.jpg",
  },
  {
    title: "Power BI Workshop",
    issuer: "OfficeMaster",
    image: "/images/certificates/power-bi.jpg",
  },
  {
    title: "Node.js Beasts RESTful API Secret",
    issuer: "DevTown",
    image: "/images/certificates/nodejs.jpg",
  },
  {
    title: "Advanced Ethical Hacking Workshop",
    issuer: "Savory MinSS",
    image: "/images/certificates/ethical-hacking.jpg",
  },
  {
    title: "AI Tools and ChatGPT Workshop",
    issuer: "Be10x",
    image: "/images/certificates/ai-chatgpt.jpg",
  },
] as const;

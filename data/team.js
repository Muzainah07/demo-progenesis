// Single source of truth. Set NEXT_PUBLIC_SITE_URL in Vercel to your real domain.
// Optional fields (linkedin, batch, etc.) are simply hidden when omitted.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://progenesis.vercel.app").replace(/\/$/, "");

const social = { instagram: "https://www.instagram.com/progenesis.team", facebook: "https://www.facebook.com/progenesis.team" };

export const team = [
  { slug: "alex-morgan", name: "Alex Morgan", designation: "Software Engineer", field: "Full-Stack Development", batch: "2022 — 2026",
    photo: "/team/alex-morgan.svg", email: "alex@progenesis.dev", linkedin: "https://www.linkedin.com/company/progenesis", ...social },
  { slug: "sam-rivera", name: "Sam Rivera", designation: "Computer Scientist", field: "Algorithms & Machine Learning", batch: "2021 — 2025",
    photo: "/team/sam-rivera.svg", email: "sam@progenesis.dev", linkedin: "https://www.linkedin.com/company/progenesis", ...social },
  { slug: "jordan-lee", name: "Jordan Lee", designation: "Product Designer", field: "Interaction Design", batch: "2023 — 2027",
    photo: "/team/jordan-lee.svg", email: "jordan@progenesis.dev", ...social },
  { slug: "taylor-khan", name: "Taylor Khan", designation: "Event Lead", field: "Operations & Community", batch: "2022 — 2026",
    photo: "/team/taylor-khan.svg", email: "taylor@progenesis.dev", linkedin: "https://www.linkedin.com/company/progenesis", ...social },
];
export const getMember = (slug) => team.find((m) => m.slug === slug);
export const profileUrl = (slug, base = SITE_URL) => `${base}/team/${slug}`;

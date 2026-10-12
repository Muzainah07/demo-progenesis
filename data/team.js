// Single source of truth. Add a new member by copying one block below.
// Optional fields (field, batch, facebook, phone) are hidden when left out.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://demo-progenesis-git-main-muzainah07s-projects.vercel.app").replace(/\/$/, "");

export const team = [
  {
    slug: "muzainah-faisal",
    name: "Muzainah Faisal",
    designation: "Computer Scientist",
    photo: "/team/muzainah-faisal.jpg",
    linkedin: "https://www.linkedin.com/in/muzainah-faisal-9b73ab28a/",
    instagram: "https://www.instagram.com/muzainahkhan_/",
    email: "muzainahfaisal.mf@gmail.com",
  },
  {
    slug: "umaima-khan",
    name: "Umaima Khan",
    designation: "Web Developer",
    photo: "/team/umaima-khan.jpg",
    linkedin: "https://www.linkedin.com/in/umaima-khan-a58b4b375/",
    instagram: "https://www.instagram.com/umamyxx/",
    email: "umaimakhan6507@gmail.com",
  },
];
export const getMember = (slug) => team.find((m) => m.slug === slug);
export const profileUrl = (slug, base = SITE_URL) => `${base}/team/${slug}`;
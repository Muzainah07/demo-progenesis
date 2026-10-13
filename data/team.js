// Single source of truth. Add a new member by copying one block below.
// Optional fields (field, batch, facebook, phone) are hidden when left out.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://demo-progenesis-git-main-muzainah07s-projects.vercel.app").replace(/\/$/, "");

export const team = [
  {
    slug: "muzainah-faisal",
    name: "Muzainah Faisal",
    designation: "Co-Lead — Web Development Team", 
    roleType: "co-lead", 
    field: "Computer Science", 
    photo: "/team/muzainah-faisal.jpg",
    linkedin: "https://www.linkedin.com/in/muzainah-faisal-9b73ab28a/",
    instagram: "https://www.instagram.com/muzainahkhan_/",
    email: "muzainahfaisal.mf@gmail.com",
  },
  {
    slug: "umaima-khan",
    name: "Umaima Khan",
    designation: "Module Lead — Frontend",
    roleType: "module-lead",
    field: "Computer Science",
    photo: "/team/umaima-khan.jpg",
    linkedin: "https://www.linkedin.com/in/umaima-khan-a58b4b375/",
    instagram: "https://www.instagram.com/umamyxx/",
    email: "umaimakhan6507@gmail.com",
  },
];
export const getMember = (slug) => team.find((m) => m.slug === slug);
export const profileUrl = (slug, base = SITE_URL) => `${base}/team/${slug}`;
/* ---------- ROLE TEMPLATES (not shown on the site) ----------
   To add a person: copy ONE block, paste it inside the `team` array above
   (before the closing ];), fill it in, and delete these comment marks.
   - roleType must stay exactly as written: it picks the purple shade.
   - photo: put your image in public/team/ and write its path here,
     e.g. photo: "/team/firstname-lastname.jpg"
   - Leave a link as "" and it is hidden on the profile.

  {
    slug: "firstname-lastname",   // web address: /team/firstname-lastname
    name: "Full Name",
    designation: "President",
    roleType: "president",
    photo: "",
    linkedin: "",
    instagram: "",
    email: "",
  },
  {
    slug: "firstname-lastname",
    name: "Full Name",
    designation: "Co-President",
    roleType: "co-president",
    photo: "",
    linkedin: "",
    instagram: "",
    email: "",
  },
  {
    slug: "firstname-lastname",
    name: "Full Name",
    designation: "Co-Lead — Team Name",
    roleType: "co-lead",
    photo: "",
    linkedin: "",
    instagram: "",
    email: "",
  },
  {
    slug: "firstname-lastname",
    name: "Full Name",
    designation: "Technical Team",
    roleType: "technical",
    photo: "",
    linkedin: "",
    instagram: "",
    email: "",
  },
  {
    slug: "firstname-lastname",
    name: "Full Name",
    designation: "Module Lead — Module Name",
    roleType: "module-lead",
    photo: "",
    linkedin: "",
    instagram: "",
    email: "",
  },
  {
    slug: "firstname-lastname",
    name: "Full Name",
    designation: "Marketing Team",
    roleType: "marketing",
    photo: "",
    linkedin: "",
    instagram: "",
    email: "",
  },
*/
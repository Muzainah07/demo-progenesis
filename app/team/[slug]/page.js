import { notFound } from "next/navigation";
import { team, getMember, profileUrl } from "../../../data/team";
import ProfileView from "../../../components/ProfileView";

export const dynamicParams = false;
export const generateStaticParams = () => team.map((m) => ({ slug: m.slug }));

export function generateMetadata({ params }) {
  const m = getMember(params.slug);
  if (!m) return {};
  return { title: m.name, description: `${m.name}, ${m.designation} · PROGENESIS'27`,
    alternates: { canonical: profileUrl(m.slug) },
    openGraph: { title: `${m.name} · PROGENESIS`, description: m.designation, url: profileUrl(m.slug), images: [m.photo] } };
}

export default function MemberPage({ params }) {
  const m = getMember(params.slug);
  if (!m) notFound();
  return <ProfileView member={m} />;
}

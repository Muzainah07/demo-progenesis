import Link from "next/link";
import { team } from "../data/team";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <main className="page">
      
      <Reveal>
        <h1 className="grad">PROGENESIS</h1>
        <p className="sub">The team organizing hackathons.</p>
      </Reveal>
      <div className="grid">
        {team.map((m) => (
          <Link key={m.slug} href={`/team/${m.slug}`} className="card">
            <img src={m.photo} alt={m.name} />
            <div><b>{m.name}</b><br /><small>{m.role}</small></div>
          </Link>
        ))}
      </div>
      <p className="sub" style={{ marginTop: 40 }}><Link className="back" href="/qr">QR codes →</Link></p>
    </main>
  );
}

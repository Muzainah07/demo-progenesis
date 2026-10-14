import Link from "next/link";
import { team } from "../data/team";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <main className="page">
      
      <Reveal>
        <h1 className="wm"><span className="wmA">PROGENESIS</span><span className="wmB">'27</span></h1>
        <p className="sub">The team organizing hackathons.</p>
      </Reveal>
      <div className="grid">
        {team.map((m) => (
          <Link key={m.slug} href={`/team/${m.slug}`} className="card idcard" data-role={m.roleType}>
  <span className="idRole">{m.designation.split(" — ")[0]}</span>
  <span className="idWord wm" aria-hidden><span className="wmA">PROGENESIS</span><span className="wmB">'27</span></span>
  {m.photo && <img src={m.photo} alt={m.name} />}
  <div className="idMeta">
    <div className="idName">{m.name}</div>
    {m.designation.split(" — ")[1] && <div className="idTeam">{m.designation.split(" — ")[1]}</div>}
  </div>
</Link>
        ))}
      </div>
      <p className="sub" style={{ marginTop: 40 }}><Link className="back" href="/qr">QR codes →</Link></p>
    </main>
  );
}

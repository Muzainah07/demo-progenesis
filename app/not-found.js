import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page" style={{ textAlign: "center", paddingTop: "22vh" }}>
      <h1 className="wm"><span className="wmA">PROGENESIS</span><span className="wmB">'27</span></h1>
      <p className="sub">This profile doesn't exist, or the link was mistyped.</p>
      <Link className="back" href="/">Meet the team</Link>
    </main>
  );
}
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (t) => Math.min(Math.max(t, 0), 1);
const ease = (t) => 1 - Math.pow(1 - t, 3);

// Big portrait -> small top-left avatar, driven only by transforms (GPU-friendly on phones).
// Sizes mirror the CSS .spacer (min(78vw, 360px), 4:5, 10svh from top).
function PhotoAndBar({ member, w, h }) {
  const { scrollY } = useScroll();
  const big = Math.min(w * 0.78, 360), bigH = big * 1.25, top0 = h * 0.1, range = h * 0.5, S = 44;
  const raw = useTransform(scrollY, (y) => ease(clamp(y / range)));
  const p = useSpring(raw, { stiffness: 300, damping: 38, mass: 0.4 });
  const x = useTransform(p, (t) => lerp((w - big) / 2, 16, t));
  const y = useTransform(p, (t) => lerp(top0, 14, t));
  const scale = useTransform(p, (t) => lerp(1, S / big, t));
  const clip = useTransform(p, (t) => `inset(0px 0px ${lerp(0, bigH - big, t)}px 0px round ${lerp(0, big / 2, t)}px)`);
  const bg = useTransform(p, (t) => `rgba(28,43,143,${0.12 * t})`);
  const zoom = useTransform(p, (t) => lerp(1, 1.55, t));
  const barOpacity = useTransform(scrollY, [range * 0.5, range], [0, 1]);
  const barX = useTransform(scrollY, [range * 0.5, range], [-8, 0]);
  const barBg = useTransform(scrollY, [0, range], [0, 1]);
  return (
    <>
      <motion.div className="bar" style={{ opacity: barBg }} />
      <motion.div className="barText" style={{ opacity: barOpacity, x: barX }}>
        <b>{member.name}</b><span>{member.designation}</span>
      </motion.div>
      <span className="barBrand">PROGENESIS</span>
      <motion.div className="photoWrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.div className="photo" style={{ width: big, height: bigH, x, y, scale, clipPath: clip, backgroundColor: bg, transformOrigin: "0 0" }}>
          {member.photo && <motion.img src={member.photo} alt={member.name} style={{ scale: zoom }} />}
        </motion.div>
      </motion.div>
    </>
  );
}

const Arrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden><path d="M6 18 18 6M8 6h10v10" /></svg>);

export default function ProfileView({ member: m }) {
  const [vp, setVp] = useState(null);
  useEffect(() => {
    let cur = { w: window.innerWidth, h: window.innerHeight };
    setVp(cur);
    const f = () => {
      const w = window.innerWidth, h = window.innerHeight;
      // Mobile address bars change innerHeight by ~60-100px while scrolling: ignore that.
      if (w !== cur.w || Math.abs(h - cur.h) > 160) { cur = { w, h }; setVp(cur); }
    };
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  const links = [
    ["LinkedIn", m.linkedin], ["Instagram", m.instagram], ["Email", m.email && `mailto:${m.email}`],
    ["Facebook", m.facebook], ["Phone", m.phone && `tel:${m.phone}`],
  ].filter(([, href]) => href);

  return (
    <main className="wrap" data-role={m.roleType}>
      {vp && <PhotoAndBar key={`${vp.w}x${vp.h}`} member={m} w={vp.w} h={vp.h} />}
      <div className="spacer" />
      <motion.div className="heroText" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
        <h1 className="title">{m.designation}</h1>
        <p className="who">{m.name}</p>
        {m.field && <p className="field">{m.field}</p>}
        {m.batch && <p className="batch">{m.batch}</p>}
      </motion.div>
      <nav className="links" aria-label={`${m.name} links`}>
        {links.map(([label, href]) => (
          <Reveal key={label}>
            <a href={href} aria-label={`${m.name} on ${label}`} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {label}<Arrow />
            </a>
          </Reveal>
        ))}
      </nav>
      <p className="foot"><Link href="/">PROGENESIS · TEAM</Link></p>
    </main>
  );
}
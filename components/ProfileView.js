"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (t) => Math.min(Math.max(t, 0), 1);
const ease = (t) => 1 - Math.pow(1 - t, 3);

// Big portrait -> small top-left avatar, driven only by transforms (GPU-friendly on phones).
// Sizes mirror the CSS .spacer (min(78vw, 360px), 4:5, 10svh from top).
function PhotoAndBar({ member, w, h }) {
  const { scrollY } = useScroll();
  const big = Math.min(w * 0.66, 290), bigH = big * 1.15, top0 = h * 0.1, range = h * 0.5, S = 44;
  const p = useTransform(scrollY, (v) => ease(clamp(v / range)));
  const x = useTransform(p, (t) => lerp((w - big) / 2, 16, t));
  const y = useTransform(p, (t) => lerp(top0, 14, t));
  const scale = useTransform(p, (t) => lerp(1, S / big, t));
  const bigOpacity = useTransform(p, [0, 0.7, 1], [1, 1, 0]);
  const avatarOpacity = useTransform(p, [0.65, 1], [0, 1]);
  const avatarScale = useTransform(p, [0.65, 1], [0.6, 1]);
  const barOpacity = useTransform(scrollY, [range * 0.5, range], [0, 1]);
  const barX = useTransform(scrollY, [range * 0.5, range], [-8, 0]);
  const barBg = useTransform(scrollY, [0, range], [0, 1]);
  return (
    <>
      <motion.div className="bar" style={{ opacity: barBg }} />
      <motion.div className="barText" style={{ opacity: barOpacity, x: barX }}>
        <b>{member.name}</b><span>{member.designation}</span>
      </motion.div>
      <span className="barBrand">PROGENESIS'27</span>
      <motion.div className="photoWrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.div className="photo" style={{ width: big, height: bigH, x, y, scale, opacity: bigOpacity, transformOrigin: "0 0" }}>
          {member.photo && <img src={member.photo} alt={member.name} />}
        </motion.div>
        {member.photo && <motion.img className="avatar" src={member.photo} alt="" style={{ opacity: avatarOpacity, scale: avatarScale }} />}
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
  const [roleLabel, teamLabel] = m.designation.split(" — ");

  return (
    <main className="wrap" data-role={m.roleType}>
      {vp && <PhotoAndBar key={`${vp.w}x${vp.h}`} member={m} w={vp.w} h={vp.h} />}
     <div className="spacer" style={vp ? { width: Math.min(vp.w * 0.66, 290), marginTop: vp.h * 0.1 } : undefined}>
  <span className="roleTop">{roleLabel}</span>
  <span className="wordmark wm" aria-hidden><span className="wmA">PROGENESIS</span><span className="wmB">'27</span></span>
</div>
<motion.div className="heroText" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
  <h1 className="title">{m.name}</h1>
  {teamLabel && <p className="who">{teamLabel}</p>}
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
      <p className="foot"><Link href="/">PROGENESIS'27 · TEAM</Link></p>
    </main>
  );
}
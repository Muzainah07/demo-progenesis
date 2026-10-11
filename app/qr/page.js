"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { team, SITE_URL, profileUrl } from "../../data/team";

// High error correction + 1200px PNG: prints crisply on an ID card.
const make = (url) => QRCode.toDataURL(url, { width: 1200, margin: 2, errorCorrectionLevel: "H", color: { dark: "#07070c", light: "#ffffff" } });
const save = (href, name) => { const a = document.createElement("a"); a.href = href; a.download = name; a.click(); };

export default function QRPage() {
  const [base, setBase] = useState(SITE_URL);
  const [codes, setCodes] = useState({});
  useEffect(() => { if (!process.env.NEXT_PUBLIC_SITE_URL) setBase(window.location.origin); }, []);
  useEffect(() => {
    const clean = base.replace(/\/$/, "");
    Promise.all(team.map(async (m) => [m.slug, await make(profileUrl(m.slug, clean))])).then((e) => setCodes(Object.fromEntries(e)));
  }, [base]);

  const downloadAll = async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    team.forEach((m) => zip.file(`${m.slug}.png`, codes[m.slug].split(",")[1], { base64: true }));
    save(URL.createObjectURL(await zip.generateAsync({ type: "blob" })), "progenesis-qr-codes.zip");
  };
  const ready = team.every((m) => codes[m.slug]);

  return (
    <main className="page">
      <h1>QR codes</h1>
      <p className="sub">One per member, linking to their public profile. Print-ready 1200px PNG.</p>
      <label htmlFor="base">Public site URL</label>
      <input id="base" className="field" value={base} onChange={(e) => setBase(e.target.value)} />
      <button className="btn" disabled={!ready} onClick={downloadAll} style={{ marginBottom: 28 }}>Download all (.zip)</button>
      <div className="grid">
        {team.map((m) => (
          <div key={m.slug} className="card qr">
            {codes[m.slug] && <img src={codes[m.slug]} alt={`QR code for ${m.name}`} />}
            <div><b>{m.name}</b><br /><small>/team/{m.slug}</small></div>
            <button className="btn sm" disabled={!codes[m.slug]} onClick={() => save(codes[m.slug], `${m.slug}.png`)}>Download PNG</button>
          </div>
        ))}
      </div>
    </main>
  );
}

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

  // Print-ready back of an ID card: credit-card size at 300 dpi (1011 x 638 px)
  const downloadCardBack = async (m) => {
    await Promise.all([document.fonts.load('900 40px "Archivo Variable"'), document.fonts.load('800 40px Poppins'), document.fonts.load('500 20px Poppins')]);
    const W = 1011, H = 638, c = document.createElement("canvas");
    c.width = W; c.height = H;
    const x = c.getContext("2d");
    x.fillStyle = "#090916"; x.fillRect(0, 0, W, H);
    const g = x.createRadialGradient(W * 0.2, 0, 0, W * 0.2, 0, W * 0.85);
    g.addColorStop(0, "rgba(132,36,252,.5)"); g.addColorStop(1, "rgba(132,36,252,0)");
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    const qr = new Image(); qr.src = codes[m.slug]; await qr.decode();
    x.drawImage(qr, 60, 119, 400, 400);
    const fit = (text, font, max, size) => { do { x.font = font.replace("SIZE", size--); } while (x.measureText(text).width > max && size > 10); };
    const left = 510, max = W - left - 60;
    fit("PROGENESIS", '900 expanded SIZEpx "Archivo Variable"', max - 70, 44);
    x.fillStyle = "#b9a4ff"; x.fillText("PROGENESIS", left, 190);
    const wmW = x.measureText("PROGENESIS").width;
    x.fillStyle = "#fa9032"; x.fillText("'27", left + wmW, 190);
    x.fillStyle = "#f9fafe"; fit(m.name, '800 SIZEpx Poppins', max, 44); x.fillText(m.name, left, 290);
    x.fillStyle = "#b9a4ff"; fit(m.designation, '500 SIZEpx Poppins', max, 24); x.fillText(m.designation, left, 335);
    x.fillStyle = "#f9fafe"; fit("SCAN TO VIEW PROFILE", '800 SIZEpx Poppins', max, 22); x.fillText("SCAN TO VIEW PROFILE", left, 450);
    x.fillStyle = "#a89bc2"; const url = profileUrl(m.slug, base.replace(/\/$/, "")).replace("https://", "");
    fit(url, '500 SIZEpx Poppins', max, 20); x.fillText(url, left, 490);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png"); a.download = `${m.slug}-card-back.png`; a.click();
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
            <button className="btn sm" disabled={!codes[m.slug]} onClick={() => downloadCardBack(m)}>Download card back</button>
          </div>
        ))}
      </div>
    </main>
  );
}
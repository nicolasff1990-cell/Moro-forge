"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("Hombre argentino joven, pelo corto negro, campera negra, cyber samurai en Neo-Tokyo");
  const [estilo, setEstilo] = useState("Anime 3D");
  const [gen, setGen] = useState(false);
  const [img, setImg] = useState("");
  const [done, setDone] = useState(false);

  const generar = () => {
    setGen(true);
    setDone(false);
    const seed = Math.floor(Math.random() * 999999);
    // TRUCO CALIDAD: retrato cerca + cara detallada + flux
    const full = `Retrato close-up de ${prompt}, estilo ${estilo}, rostro perfecto, cara ultra detallada, ojos nítidos, piel realista, iluminación cinematográfica, fondo Neo-Tokyo borroso, alta calidad 8k, primer plano, solo rostro y hombros`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(full)}?width=1024&height=1280&seed=${seed}&model=flux&enhance=true&nologo=true`;
    const pre = new Image();
    pre.onload = () => { setImg(url); setGen(false); setDone(true); };
    pre.onerror = () => { setImg(url); setGen(false); setDone(true); };
    pre.src = url;
  };

  return (
    <main style={{ background: "#0a0015", color: "white", minHeight: "100vh", fontFamily: "sans-serif", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>MORO <span style={{ color: "#e879f9" }}>FORGE</span> <span style={{ fontSize: 11, border: "1px solid #555", padding: "4px 8px", borderRadius: 999, color: "#aaa" }}>v3.1 • CARA HD</span></h1>
        <button onClick={generar} style={{ background: "white", color: "black", border: "none", padding: "10px 18px", borderRadius: 999, fontWeight: 800 }}>GENERATE →</button>
      </header>
      <section style={{ maxWidth: 1000, margin: "30px auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 44, lineHeight: 1, fontWeight: 900 }}>TEXT TO<br /><span style={{ color: "#e879f9" }}>ANIME 3D</span><br />UNIVERSE</h2>
        <p style={{ color: "#aaa", marginTop: 12 }}>Ahora en modo RETRATO HD - la cara se ve nítida.</p>
        <div style={{ background: "#1a0a2e", border: "1px solid #333", borderRadius: 24, padding: 16, marginTop: 20, textAlign: "left" }}>
          <label style={{ fontSize: 12, color: "#aaa" }}>TU PROMPT</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} style={{ width: "100%", background: "transparent", color: "white", border: "none", outline: "none", fontSize: 16, minHeight: 70, marginTop: 8 }} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
            {["Anime 3D", "Realista", "Comic", "Cyberpunk"].map((s) => (
              <button key={s} onClick={() => setEstilo(s)} style={{ padding: "8px 14px", borderRadius: 999, border: estilo === s ? "2px solid white" : "1px solid #444", background: estilo === s ? "white" : "transparent", color: estilo === s ? "black" : "white", fontWeight: 700 }}>{s}</button>
            ))}
          </div>
          <button onClick={generar} style={{ width: "100%", padding: 16, borderRadius: 999, background: "white", color: "black", border: "none", fontWeight: 900, fontSize: 15 }}>
            {gen ? "GENERANDO CARA HD... ⚡ ESPERÁ 15 SEG" : "GENERATE 3D →"}
          </button>
          {done && <p style={{ textAlign: "center", color: "#4ade80", marginTop: 12 }}>✓ Foto HD generada!</p>}
        </div>
        <div style={{ background: "#111", border: "1px solid #333", borderRadius: 24, padding: 16, marginTop: 20, minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {img ? (<><img src={img} alt="generado" style={{ width: "100%", maxWidth: 420, borderRadius: 16 }} /><a href={img} download="moro-forge.png" target="_blank" style={{ marginTop: 14, background: "white", color: "black", padding: "10px 20px", borderRadius: 999, fontWeight: 800, textDecoration: "none" }}>⬇ DESCARGAR FOTO HD</a></>) : (<><div style={{ fontSize: 80 }}>{gen ? "⚡" : "🗼"}</div><p style={{ fontWeight: 900, fontSize: 20 }}>{gen ? "GENERANDO..." : "ACÁ VA TU FOTO HD"}</p><p style={{ color: "#888", fontSize: 13 }}>{prompt}</p></>)}
        </div>
      </section>
      <footer style={{ textAlign: "center", color: "#555", fontSize: 12, padding: 20 }}>© 2026 MORO FORGE • RETRATO HD</footer>
    </main>
  );
}

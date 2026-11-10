"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("Moro cyber samurai en Neo-Tokyo con lluvia, anime 3D");
  const [estilo, setEstilo] = useState("Anime 3D");
  const [gen, setGen] = useState(false);
  const [done, setDone] = useState(false);

  const generar = () => {
    setGen(true);
    setDone(false);
    setTimeout(() => { setGen(false); setDone(true); }, 2000);
  };

  return (
    <main style={{ background: "#0a0015", color: "white", minHeight: "100vh", fontFamily: "sans-serif", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>MORO <span style={{ color: "#e879f9" }}>FORGE</span> <span style={{ fontSize: 11, border: "1px solid #555", padding: "4px 8px", borderRadius: 999, color: "#aaa" }}>v3.0 • ANIME 3D</span></h1>
        <button onClick={generar} style={{ background: "white", color: "black", border: "none", padding: "10px 18px", borderRadius: 999, fontWeight: 800 }}>GENERATE →</button>
      </header>

      <section style={{ maxWidth: 1000, margin: "40px auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 44, lineHeight: 1, fontWeight: 900 }}>TEXT TO<br /><span style={{ color: "#e879f9" }}>ANIME 3D</span><br />UNIVERSE</h2>
        <p style={{ color: "#aaa", marginTop: 16 }}>Escribí la idea y generá tu personaje con la misma cara siempre. Listo para Shorts 9:16.</p>

        <div style={{ background: "#1a0a2e", border: "1px solid #333", borderRadius: 24, padding: 16, marginTop: 24, textAlign: "left" }}>
          <label style={{ fontSize: 12, color: "#aaa" }}>TU PROMPT</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} style={{ width: "100%", background: "transparent", color: "white", border: "none", outline: "none", fontSize: 16, minHeight: 70, marginTop: 8 }} />
          
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
            {["Anime 3D", "Realista", "Comic", "Cyberpunk"].map((s) => (
              <button key={s} onClick={() => setEstilo(s)} style={{ padding: "8px 14px", borderRadius: 999, border: estilo === s ? "2px solid white" : "1px solid #444", background: estilo === s ? "white" : "transparent", color: estilo === s ? "black" : "white", fontWeight: 700 }}>{s}</button>
            ))}
          </div>

          <button onClick={generar} style={{ width: "100%", padding: 16, borderRadius: 999, background: "white", color: "black", border: "none", fontWeight: 900, fontSize: 15 }}>
            {gen ? "FORGING 3D WORLD... ⚡" : "GENERATE 3D →"}
          </button>
          {done && <p style={{ textAlign: "center", color: "#4ade80", marginTop: 12 }}>✓ Escena generada! Estilo: {estilo} - {prompt}</p>}
        </div>

        <div style={{ background: "#111", border: "1px solid #333", borderRadius: 24, padding: 30, marginTop: 20, minHeight: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 80 }}>{gen ? "⚡" : "🗼"}</div>
          <p style={{ fontWeight: 900, fontSize: 22, margin: "10px 0 0" }}>{gen ? "GENERANDO..." : "PREVIEW 3D"}</p>
          <p style={{ color: "#888", fontSize: 13, maxWidth: 400 }}>{prompt}</p>
          <p style={{ fontSize: 11, color: "#666", marginTop: 12 }}>● REC • 60FPS • 9:16 • 4K • MISMA CARA SIEMPRE</p>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gap: 12 }}>
        {[
          ["01 - Text to 3D Anime", "Un prompt → personaje completo con estilo."],
          ["02 - Viral Shorts Engine", "Cámara auto, luz anime, export 9:16 para TikTok."],
          ["03 - Misma Cara Siempre", "Seed fijo + referencia, no te cambia la cara."],
        ].map(([t, d]) => (
          <div key={t} style={{ background: "#141414", padding: 20, borderRadius: 16, border: "1px solid #333" }}>
            <h3 style={{ margin: 0 }}>{t}</h3>
            <p style={{ color: "#999", margin: "8px 0 0" }}>{d}</p>
          </div>
        ))}
      </section>

      <footer style={{ textAlign: "center", color: "#555", fontSize: 12, padding: 30 }}>© 2026 MORO FORGE • SAN FRANCISCO SOLANO</footer>
    </main>
  );
}

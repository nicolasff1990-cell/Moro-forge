"use client";
import { useState, useRef } from "react";
export default function Home() {
  const [tema, setTema] = useState("Moro llega a Neo-Tokyo y pelea con un robot gigante");
  const [img, setImg] = useState("");
  const [gen, setGen] = useState(false);
  const [grabando, setGrabando] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generar = () => {
    setGen(true); setVideoUrl(""); setImg("");
    const seed = Math.floor(Math.random() * 999999);
    const full = `Retrato cinematografico de Moro, hombre argentino joven pelo corto negro campera negra cyber samurai, en Neo-Tokyo de noche luces neon, lluvia, anime 3D, cara ultra detallada, 8k`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(full)}?width=720&height=1280&seed=${seed}&model=flux&nologo=true`;
    const pre = new Image(); pre.crossOrigin = "anonymous";
    pre.onload = () => { setImg(url); setGen(false); };
    pre.onerror = () => { setImg(url); setGen(false); };
    pre.src = url;
  };
  const crearShort = async () => {
    if (!img) return;
    setGrabando(true);
    const canvas = canvasRef.current!; canvas.width = 720; canvas.height = 1280;
    const ctx = canvas.getContext("2d")!;
    const image = await new Promise<HTMLImageElement>((res) => { const im = new Image(); im.crossOrigin = "anonymous"; im.src = img; im.onload = () => res(im); im.onerror = () => res(im); });
    const stream = (canvas as any).captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
    const chunks: any[] = []; rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => { setVideoUrl(URL.createObjectURL(new Blob(chunks, { type: "video/webm" }))); setGrabando(false); };
    rec.start(); const start = performance.now(); const DUR = 15000;
    const draw = () => {
      const t = performance.now() - start; if (t > DUR) { rec.stop(); return; }
      const idx = Math.min(2, Math.floor(t / 5000)); const local = (t % 5000) / 5000;
      ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 720, 1280);
      let zoom = 1, ox = 0, oy = 0;
      if (idx === 0) { zoom = 1.4 + local * 0.1; oy = -100; }
      if (idx === 1) { zoom = 1.1 + local * 0.15; ox = local * 80 - 40; }
      if (idx === 2) { zoom = 1.5 - local * 0.3; }
      const w = 720 * zoom, h = 1280 * zoom;
      try { ctx.drawImage(image, (720 - w) / 2 + ox, (1280 - h) / 2 + oy, w, h); } catch {}
      const grad = ctx.createLinearGradient(0, 800, 0, 1280); grad.addColorStop(0, "rgba(0,0,0,0)"); grad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = grad; ctx.fillRect(0, 800, 720, 480);
      ctx.fillStyle = "#fff"; ctx.font = "900 52px sans-serif"; ctx.textAlign = "center"; ctx.fillText("MORO FORGE", 360, 1080);
      ctx.font = "700 28px sans-serif"; ctx.fillStyle = "#e879f9"; ctx.fillText(idx === 0 ? "EP.1 - LLEGADA" : idx === 1 ? "NEO-TOKYO" : "LA PELEA", 360, 1130);
      ctx.font = "500 20px sans-serif"; ctx.fillStyle = "#fff"; ctx.fillText(tema.substring(0, 38), 360, 1170);
      ctx.fillStyle = "#333"; ctx.fillRect(60, 1220, 600, 8); ctx.fillStyle = "#e879f9"; ctx.fillRect(60, 1220, 600 * (t / DUR), 8);
      requestAnimationFrame(draw);
    }; draw();
  };
  return (
    <main style={{ background: "#0a0015", color: "white", minHeight: "100vh", fontFamily: "sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center", fontSize: 26, fontWeight: 900 }}>MORO <span style={{ color: "#e879f9" }}>FORGE</span> <span style={{ fontSize: 11, border: "1px solid #555", padding: "4px 8px", borderRadius: 999 }}>v4.2 • SHORTS SIN LIMITE</span></h1>
      <p style={{ textAlign: "center", color: "#aaa" }}>1 foto = 1 Short de 15 seg para TikTok / YouTube</p>
      <div style={{ maxWidth: 520, margin: "20px auto", background: "#1a0a2e", border: "1px solid #333", borderRadius: 24, padding: 16 }}>
        <label style={{ fontSize: 12, color: "#aaa" }}>¿DE QUÉ ES TU SHORT?</label>
        <textarea value={tema} onChange={(e) => setTema(e.target.value)} style={{ width: "100%", background: "transparent", color: "white", border: "none", outline: "none", fontSize: 16, minHeight: 60, marginTop: 8 }} />
        <button onClick={generar} style={{ width: "100%", padding: 14, borderRadius: 999, background: "white", color: "black", border: "none", fontWeight: 900, marginTop: 8 }}>{gen ? "GENERANDO FOTO... 15 SEG" : "1️⃣ GENERAR FOTO →"}</button>
        <button onClick={crearShort} disabled={!img || grabando} style={{ width: "100%", padding: 14, borderRadius: 999, background: img ? "#e879f9" : "#333", color: "white", border: "none", fontWeight: 900, marginTop: 10 }}>{grabando ? "GRABANDO SHORT... 15 SEG" : "2️⃣ CREAR VIDEO SHORT →"}</button>
        <p style={{ textAlign: "center", color: "#888", fontSize: 12, marginTop: 10 }}>Si te sale cartel amarillo, esperá 1 minuto y apretá 1 sola vez.</p>
      </div>
      {img && <img src={img} style={{ display: "block", width: 280, margin: "0 auto", borderRadius: 16 }} />}
      <canvas ref={canvasRef} style={{ display: "block", width: 280, margin: "20px auto", borderRadius: 16, border: "1px solid #333" }} />
      {videoUrl && (<div style={{ textAlign: "center" }}><video src={videoUrl} controls style={{ width: 280, borderRadius: 16 }} /><br /><a href={videoUrl} download="moro-short.webm" style={{ display: "inline-block", marginTop: 12, background: "white", color: "black", padding: "12px 24px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>⬇ DESCARGAR SHORT</a></div>)}
    </main>
  );
}

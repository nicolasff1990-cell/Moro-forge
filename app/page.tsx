"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [tema, setTema] = useState("Moro llega a Neo-Tokyo y pelea con un robot gigante");
  const [imgs, setImgs] = useState<string[]>([]);
  const [gen, setGen] = useState(false);
  const [progreso, setProgreso] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const esperar = (ms: number) => new Promise(r => setTimeout(r, ms));

  const generarEscenas = async () => {
    setGen(true); setVideoUrl(""); setImgs([]);
    const escenas = [
      `Retrato close-up de Moro, hombre argentino joven pelo corto negro campera negra, llegando a Neo-Tokyo de noche, luces neon, anime 3D, cara ultra detallada`,
      `Moro mirando ciudad futurista Neo-Tokyo con rascacielos neon, plano cinematografico, anime 3D`,
      `Moro cyber samurai peleando con robot gigante en Neo-Tokyo, accion, anime 3D`
    ];
    const urls: string[] = [];
    for (let i = 0; i < 3; i++) {
      setProgreso(`Generando escena ${i+1}/3...`);
      const seed = Math.floor(Math.random() * 999999);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(escenas[i])}?width=720&height=1280&seed=${seed}&model=flux&nologo=true`;
      await new Promise((res) => { const im = new Image(); im.crossOrigin = "anonymous"; im.onload = res; im.onerror = res; im.src = url; });
      urls.push(url); setImgs([...urls]);
      if (i < 2) {
        setProgreso(`Escena ${i+1} lista! Esperando 50 seg por límite gratis... ${i+2}/3 en camino`);
        await esperar(50000); // espera por límite de Pollinations
      }
    }
    setProgreso("¡3 escenas listas!");
    setGen(false);
  };

  const crearShort = async () => {
    if (!imgs.length) return;
    setGrabando(true);
    const canvas = canvasRef.current!;
    canvas.width = 720; canvas.height = 1280;
    const ctx = canvas.getContext("2d")!;
    const loaded = await Promise.all(imgs.map(src => new Promise<HTMLImageElement>((res) => { const im = new Image(); im.crossOrigin = "anonymous"; im.src = src; im.onload = () => res(im); im.onerror = () => res(im); })));
    const stream = (canvas as any).captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
    const chunks: any[] = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => { setVideoUrl(URL.createObjectURL(new Blob(chunks, { type: "video/webm" }))); setGrabando(false); };
    rec.start();
    const start = performance.now(); const DUR = 15000;
    const draw = () => {
      const t = performance.now() - start;
      if (t > DUR) { rec.stop(); return; }
      const idx = Math.min(2, Math.floor(t / 5000));
      const local = (t % 5000) / 5000;
      const img = loaded[idx];
      const zoom = 1 + local * 0.15;
      const w = 720 * zoom, h = 1280 * zoom;
      ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 720, 1280);
      try { ctx.drawImage(img, (720 - w) / 2, (1280 - h) / 2, w, h); } catch {}
      const grad = ctx.createLinearGradient(0, 800, 0, 1280);
      grad.addColorStop(0, "rgba(0,0,0,0)"); grad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = grad; ctx.fillRect(0, 800, 720, 480);
      ctx.fillStyle = "#fff"; ctx.font = "900 52px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("MORO FORGE", 360, 1080);
      ctx.font = "700 28px sans-serif"; ctx.fillStyle = "#e879f9";
      ctx.fillText(idx === 0 ? "EP.1 - LLEGADA" : idx === 1 ? "NEO-TOKYO" : "LA PELEA", 360, 1130);
      ctx.font = "500 22px sans-serif"; ctx.fillStyle = "#fff";
      ctx.fillText(tema.substring(0, 38), 360, 1170);
      ctx.fillStyle = "#333"; ctx.fillRect(60, 1220, 600, 8);
      ctx.fillStyle = "#e879f9"; ctx.fillRect(60, 1220, 600 * (t / DUR), 8);
      requestAnimationFrame(draw);
    };
    draw();
  };

  return (
    <main style={{ background: "#0a0015", color: "white", minHeight: "100vh", fontFamily: "sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center", fontSize: 26, fontWeight: 900 }}>MORO <span style={{ color: "#e879f9" }}>FORGE</span> <span style={{ fontSize: 11, border: "1px solid #555", padding: "4px 8px", borderRadius: 999 }}>v4.1 • SHORTS</span></h1>
      <p style={{ textAlign: "center", color: "#aaa" }}>Creador de Shorts para TikTok / YouTube / Reels</p>
      <div style={{ maxWidth: 520, margin: "20px auto", background: "#1a0a2e", border: "1px solid #333", borderRadius: 24, padding: 16 }}>
        <label style={{ fontSize: 12, color: "#aaa" }}>¿DE QUÉ ES TU SHORT?</label>
        <textarea value={tema} onChange={(e) => setTema(e.target.value)} style={{ width: "100%", background: "transparent", color: "white", border: "none", outline: "none", fontSize: 16, minHeight: 60, marginTop: 8 }} />
        <button onClick={generarEscenas} style={{ width: "100%", padding: 14, borderRadius: 999, background: "white", color: "black", border: "none", fontWeight: 900, marginTop: 8 }}>
          {gen ? "GENERANDO... NO TOQUES" : "1️⃣ GENERAR 3 ESCENAS →"}
        </button>
        {progreso && <p style={{ textAlign: "center", color: "#e879f9", fontSize: 13, marginTop: 10 }}>{progreso}</p>}
        <button onClick={crearShort} disabled={!imgs.length || grabando} style={{ width: "100%", padding: 14, borderRadius: 999, background: imgs.length ? "#e879f9" : "#333", color: "white", border: "none", fontWeight: 900, marginTop: 10 }}>
          {grabando ? "GRABANDO SHORT... 15 SEG" : "2️⃣ CREAR VIDEO SHORT (15 SEG) →"}
        </button>
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", gap: 10, overflowX: "auto" }}>
        {imgs.map((s, i) => <img key={i} src={s} style={{ width: 150, borderRadius: 12, border: "2px solid #333" }} />)}
      </div>
      <canvas ref={canvasRef} style={{ display: "block", width: 280, margin: "20px auto", borderRadius: 16, border: "1px solid #333" }} />
      {videoUrl && (<div style={{ textAlign: "center" }}><video src={videoUrl} controls style={{ width: 280, borderRadius: 16 }} /><br /><a href={videoUrl} download="moro-short.webm" style={{ display: "inline-block", marginTop: 12, background: "white", color: "black", padding: "12px 24px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>⬇ DESCARGAR SHORT</a></div>)}
    </main>
  );
        }

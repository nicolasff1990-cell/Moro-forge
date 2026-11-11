"use client";
import { useState, useRef } from "react";
export default function Home() {
  const [tema, setTema] = useState("Moro llega a Neo-Tokyo y pelea con un robot gigante");
  const [img, setImg] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const FOTOS = [
    "https://images.unsplash.com/photo-1542051841857-5f90071e3f0b?w=720&h=1280&fit=crop&q=80",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=720&h=1280&fit=crop&q=80",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=720&h=1280&fit=crop&q=80",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=720&h=1280&fit=crop&q=80",
  ];
  const generar = () => { setVideoUrl(""); setImg(FOTOS[Math.floor(Math.random()*FOTOS.length)] + "&t=" + Date.now()); };
  const crearShort = async () => {
    if (!img) return; setGrabando(true);
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
      const p = t / DUR; // 0 a 1
      // Fondo
      ctx.fillStyle = "#000"; ctx.fillRect(0,0,720,1280);
      try { ctx.drawImage(image, 0, 0, 720, 1280); } catch {}
      ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fillRect(0,0,720,1280);
      // Suelo
      ctx.fillStyle = "#1a0a2e"; ctx.fillRect(0, 1050, 720, 230);
      // --- ROBOT ---
      const robotX = 520 + Math.sin(t/200)*5;
      const robotHit = (Math.sin(t/500) > 0.7); // cuando lo golpean tiembla
      const rx = robotX + (robotHit ? 15 : 0);
      ctx.fillStyle = "#94a3b8"; ctx.fillRect(rx-70, 650, 140, 220); // cuerpo
      ctx.fillStyle = "#e879f9"; ctx.fillRect(rx-70, 650, 140, 30); // pecho neon
      ctx.fillStyle = "#64748b"; ctx.fillRect(rx-60, 560, 120, 90); // cabeza
      ctx.fillStyle = "#ff0000"; ctx.fillRect(rx-40, 590, 25, 25); ctx.fillRect(rx+15, 590, 25, 25); // ojos rojos
      ctx.fillStyle = "#475569"; ctx.fillRect(rx-90, 680, 40, 120); ctx.fillRect(rx+50, 680, 40, 120); // brazos
      ctx.fillStyle = "#334155"; ctx.fillRect(rx-60, 870, 45, 180); ctx.fillRect(rx+15, 870, 45, 180); // piernas
      // --- MORO ---
      // Moro corre hacia robot, pega, retrocede - ciclo cada 1.2 seg
      const ciclo = (t % 1200) / 1200;
      let moroX = 150 + ciclo * 250; if (ciclo > 0.6) moroX = 400 - (ciclo-0.6)*600;
      const punch = ciclo > 0.45 && ciclo < 0.6;
      const moroY = 850 + Math.abs(Math.sin(t/150))*10;
      // cuerpo Moro capucha rosada
      ctx.fillStyle = "#e879f9"; ctx.beginPath(); ctx.arc(moroX, moroY, 55, 0, Math.PI*2); ctx.fill(); // capucha
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(moroX, moroY+5, 35, 0, Math.PI*2); ctx.fill(); // cara
      ctx.fillStyle = "#000"; ctx.fillRect(moroX-15, moroY-2, 12, 12); ctx.fillRect(moroX+5, moroY-2, 12, 12);
      ctx.fillStyle = "#0a0015"; ctx.fillRect(moroX-35, moroY+55, 70, 120); // cuerpo
      // brazo golpe
      ctx.strokeStyle = "#0a0015"; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(moroX, moroY+80);
      if (punch) ctx.lineTo(moroX+90, moroY+60); else ctx.lineTo(moroX+50, moroY+100); ctx.stroke();
      // piernas
      ctx.beginPath(); ctx.moveTo(moroX, moroY+175); ctx.lineTo(moroX-25, moroY+240); ctx.moveTo(moroX, moroY+175); ctx.lineTo(moroX+25, moroY+240); ctx.stroke();
      // --- EFECTO GOLPE ---
      if (punch || robotHit) {
        ctx.fillStyle = "#facc15"; ctx.font = "900 60px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("¡POW!", rx-20, 550); ctx.fillText("¡BOOM!", rx-30, 480);
        // chispas
        for(let i=0;i<12;i++){ ctx.fillStyle = i%2 ? "#facc15" : "#fff"; ctx.fillRect(rx-60 + Math.random()*120, 580 + Math.random()*100, 8, 8); }
      }
      // Texto
      ctx.fillStyle = "#fff"; ctx.font = "900 52px sans-serif"; ctx.textAlign = "center"; ctx.fillText("MORO FORGE", 360, 150);
      ctx.fillStyle = "#e879f9"; ctx.font = "700 30px sans-serif"; ctx.fillText(p < 0.33 ? "EP.1 - LLEGADA" : p < 0.66 ? "MORO VS ROBOT" : "¡LA PELEA FINAL!", 360, 200);
      ctx.fillStyle = "#fff"; ctx.font = "500 20px sans-serif"; ctx.fillText(tema.substring(0,38), 360, 1180);
      ctx.fillStyle = "#333"; ctx.fillRect(60, 1220, 600, 8); ctx.fillStyle = "#e879f9"; ctx.fillRect(60, 1220, 600*p, 8);
      requestAnimationFrame(draw);
    }; draw();
  };
  return (
    <main style={{ background: "#0a0015", color: "white", minHeight: "100vh", fontFamily: "sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center", fontSize: 26, fontWeight: 900 }}>MORO <span style={{ color: "#e879f9" }}>FORGE</span> <span style={{ fontSize: 11, border: "1px solid #555", padding: "4px 8px", borderRadius: 999 }}>v4.4 • CON PELEA</span></h1>
      <p style={{ textAlign: "center", color: "#aaa" }}>Moro vs Robot - Animado en 15 seg</p>
      <div style={{ maxWidth: 520, margin: "20px auto", background: "#1a0a2e", border: "1px solid #333", borderRadius: 24, padding: 16 }}>
        <label style={{ fontSize: 12, color: "#aaa" }}>¿DE QUÉ ES TU SHORT?</label>
        <textarea value={tema} onChange={(e) => setTema(e.target.value)} style={{ width: "100%", background: "transparent", color: "white", border: "none", outline: "none", fontSize: 16, minHeight: 60, marginTop: 8 }} />
        <button onClick={generar} style={{ width: "100%", padding: 14, borderRadius: 999, background: "white", color: "black", border: "none", fontWeight: 900, marginTop: 8 }}>1️⃣ GENERAR FOTO →</button>
        <button onClick={crearShort} disabled={!img || grabando} style={{ width: "100%", padding: 14, borderRadius: 999, background: img ? "#e879f9" : "#333", color: "white", border: "none", fontWeight: 900, marginTop: 10 }}>{grabando ? "GRABANDO PELEA... 15 SEG" : "2️⃣ CREAR VIDEO PELEA →"}</button>
        <p style={{ textAlign: "center", color: "#888", fontSize: 12, marginTop: 10 }}>Moro con capucha rosada pelea con el robot. POW! BOOM!</p>
      </div>
      {img && <img src={img} style={{ display: "block", width: 280, margin: "0 auto", borderRadius: 16 }} />}
      <canvas ref={canvasRef} style={{ display: "block", width: 280, margin: "20px auto", borderRadius: 16, border: "1px solid #333" }} />
      {videoUrl && (<div style={{ textAlign: "center" }}><video src={videoUrl} controls style={{ width: 280, borderRadius: 16 }} /><br /><a href={videoUrl} download="moro-pelea.webm" style={{ display: "inline-block", marginTop: 12, background: "white", color: "black", padding: "12px 24px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>⬇ DESCARGAR SHORT</a></div>)}
    </main>
  );
          }

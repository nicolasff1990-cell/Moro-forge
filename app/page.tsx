"use client";
import { useState } from "react";

export default function Home() {
  const [mensaje, setMensaje] = useState("Hola Moro, quiero un presupuesto");
  const whatsapp = `https://wa.me/5491123456789?text=${encodeURIComponent(mensaje)}`;

  return (
    <main style={{ background: "#0a0a0a", color: "white", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <header style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>MORO <span style={{ color: "#ff6b00" }}>FORGE</span></h1>
        <a href={whatsapp} style={{ background: "#ff6b00", color: "white", padding: "10px 18px", borderRadius: 999, textDecoration: "none", fontWeight: 700 }}>Presupuesto</a>
      </header>

      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 42, lineHeight: 1.1, fontWeight: 900 }}>Herrería y Forja<br />a medida</h2>
        <p style={{ color: "#bbb", maxWidth: 500, margin: "20px auto" }}>Rejas, portones, parrillas, escaleras y trabajos a medida. Fuerte, prolijo y a tiempo.</p>
        <a href={whatsapp} style={{ display: "inline-block", background: "#25D366", color: "white", padding: "14px 26px", borderRadius: 999, textDecoration: "none", fontWeight: 800 }}>Pedir por WhatsApp</a>
      </section>

      <section style={{ padding: "20px", display: "grid", gap: 12 }}>
        {["Portones y Rejas", "Parrillas y Fogoneros", "Escaleras y Barandas", "Muebles Industriales"].map((s) => (
          <div key={s} style={{ background: "#1a1a1a", padding: 20, borderRadius: 16, border: "1px solid #333" }}>
            <h3 style={{ margin: 0 }}>{s}</h3>
            <p style={{ color: "#999", margin: "8px 0 0" }}>Trabajo a medida, con materiales de primera.</p>
          </div>
        ))}
      </section>

      <section style={{ padding: "30px 20px", textAlign: "center" }}>
        <h3>¿Qué necesitás hacer?</h3>
        <input value={mensaje} onChange={(e) => setMensaje(e.target.value)} style={{ width: "100%", maxWidth: 400, padding: 14, borderRadius: 12, border: "1px solid #333", background: "#111", color: "white", margin: "10px 0" }} />
        <br />
        <a href={whatsapp} style={{ display: "inline-block", background: "#ff6b00", color: "white", padding: "14px 26px", borderRadius: 999, textDecoration: "none", fontWeight: 800, marginTop: 10 }}>Enviar por WhatsApp</a>
      </section>

      <footer style={{ padding: 20, textAlign: "center", color: "#666", fontSize: 13 }}>© 2026 Moro Forge - San Francisco Solano, Buenos Aires</footer>
    </main>
  );
}

"use client"
import { useState } from 'react'

const VERSIONS = ["Base", "SSJ", "SSJ Blue", "Ultra Instinct", "Beast", "Ultra Ego", "Custom"]
const STYLES = ["Anime 3D", "Realista", "Chibi", "Manga Cel-Shaded"]

export default function MoroForgeV2() {
  const [charName, setCharName] = useState("Goku")
  const [version, setVersion] = useState("Ultra Instinct")
  const [style, setStyle] = useState("Anime 3D")
  const [customPrompt, setCustomPrompt] = useState("")

  return (
    <div style={{minHeight:'100vh', background:'#0a0a0a', color:'white', padding:'20px'}}>
      <h1 style={{fontSize:'28px', fontWeight:900}}>🔥 MORO-FORGE v2.0</h1>
      <p style={{color:'#888'}}>Forja cualquier personaje en Anime 3D</p>
      <div style={{display:'grid', gap:'16px', marginTop:'24px', maxWidth:'600px'}}>
        <div style={{background:'#151515', padding:'16px', borderRadius:'12px', border:'1px solid #222'}}>
          <label>Nombre del Personaje</label>
          <input value={charName} onChange={e=>setCharName(e.target.value)} placeholder="Ej: Goku, Vegeta, Tu OC"
            style={{width:'100%', padding:'12px', marginTop:'8px', borderRadius:'8px', background:'#0a0a0a', color:'white', border:'1px solid #333'}} />
        </div>
        <div style={{background:'#151515', padding:'16px', borderRadius:'12px', border:'1px solid #222'}}>
          <label>Versión</label>
          <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginTop:'8px'}}>
            {VERSIONS.map(v=>(
              <button key={v} onClick={()=>setVersion(v)}
                style={{padding:'8px 14px', borderRadius:'20px', border:'1px solid #333', background: version===v ? '#7c3aed' : '#222', color:'white'}}>{v}</button>
            ))}
          </div>
        </div>
        <div style={{background:'#151515', padding:'16px', borderRadius:'12px', border:'1px solid #222'}}>
          <label>Estilo 3D</label>
          <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginTop:'8px'}}>
            {STYLES.map(s=>(
              <button key={s} onClick={()=>setStyle(s)}
                style={{padding:'8px 14px', borderRadius:'20px', border:'1px solid #333', background: style===s ? '#fff' : '#222', color: style===s ? '#000' : 'white'}}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{background:'#151515', padding:'16px', borderRadius:'12px', border:'1px solid #222'}}>
          <label>Prompt Custom</label>
          <textarea value={customPrompt} onChange={e=>setCustomPrompt(e.target.value)} placeholder="Ej: con cicatriz, armadura rota, aura negra..."
            style={{width:'100%', padding:'12px', marginTop:'8px', borderRadius:'8px', background:'#0a0a0a', color:'white', border:'1px solid #333', minHeight:'80px'}} />
        </div>
        <div style={{background:'linear-gradient(135deg, #7c3aed, #ec4899)', padding:'20px', borderRadius:'16px', textAlign:'center'}}>
          <div style={{fontSize:'48px'}}>⚡</div>
          <h2>{charName} - {version}</h2>
          <p style={{background:'rgba(0,0,0,0.3)', padding:'8px', borderRadius:'8px', marginTop:'8px'}}>{style} {customPrompt && `| ${customPrompt}`}</p>
          <button style={{marginTop:'16px', padding:'12px 24px', borderRadius:'10px', border:'none', background:'white', color:'black', fontWeight:700, width:'100%'}}>GENERAR MODELO 3D</button>
        </div>
      </div>
    </div>
  )
}

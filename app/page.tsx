"use client";
import { useState } from "react";

export default function Page(){
  const [prompt,setPrompt]=useState("cyber samurai in neo-tokyo rain, anime 3d,");
  const [gen,setGen]=useState(false);
  const [done,setDone]=useState(false);
  const run=()=>{ setGen(true); setDone(false); setTimeout(()=>{setGen(false); setDone(true)},2000); }
  return(
  <div style={{minHeight:"100vh",background:"#0a0015",color:"white",padding:"24px",fontFamily:"system-ui"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 0",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
      <b>MORO FORGE v3.0 • ANIME 3D PRO • LIVE</b>
      <button onClick={run} style={{background:"white",color:"black",borderRadius:"999px",padding:"10px 20px",fontWeight:900}}>GENERATE NOW →</button>
    </div>
    <h1 style={{fontSize:"72px",lineHeight:"0.9",fontWeight:900,marginTop:"40px",letterSpacing:"-3px"}}>
      TEXT TO<br/>
      <span style={{background:"linear-gradient(90deg,#e879f9,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ANIME 3D</span><br/>
      UNIVERSE
    </h1>
    <p style={{opacity:0.6,marginTop:"20px",maxWidth:"500px",fontSize:"18px"}}>TikTok generator is dead. This is MORO FORGE v3.0 — generate stylized 3D anime characters, worlds & viral shorts in one prompt. Export 9:16 ready.</p>
    
    <div style={{marginTop:"32px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"24px",padding:"16px",maxWidth:"600px"}}>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} style={{width:"100%",background:"#140a24",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",minHeight:"90px",padding:"16px",color:"white"}} />
      <button onClick={run} style={{width:"100%",marginTop:"12px",height:"56px",borderRadius:"999px",background:"white",color:"black",fontWeight:900,letterSpacing:"1px"}}>{gen?"FORGING 3D WORLD... ⚡":"GENERATE 3D →"}</button>
      {done && <div style={{textAlign:"center",marginTop:"12px",color:"#4ade80",fontSize:"12px"}}>✓ 3D Anime Scene Generated! Ready for export ↓</div>}
      <div style={{display:"flex",gap:"16px",marginTop:"16px",fontSize:"10px",opacity:0.4,letterSpacing:"1px"}}><span>• 60FPS REAL-TIME</span><span>• STYLIZED PBR</span><span>• 9:16 EXPORT</span></div>
    </div>

    <div style={{marginTop:"40px",background:"linear-gradient(135deg,#1a0a2e,#0f0f1a)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"24px",padding:"40px",textAlign:"center",maxWidth:"600px"}}>
      <div style={{fontSize:"80px"}}>🗼</div>
      <div style={{fontSize:"10px",letterSpacing:"4px",opacity:0.4,marginTop:"20px"}}>ANIME 3D PREVIEW</div>
      <div style={{fontWeight:900,fontSize:"24px",marginTop:"8px"}}>CYBER SAMURAI</div>
      <div style={{opacity:0.5,fontSize:"12px",marginTop:"8px"}}>{prompt}</div>
      <div style={{marginTop:"20px",display:"flex",justifyContent:"space-between",fontSize:"10px"}}><span style={{background:"black",padding:"6px 12px",borderRadius:"999px"}}>● REC • 60FPS</span><span style={{background:"white",color:"black",padding:"6px 12px",borderRadius:"999px",fontWeight:700}}>9:16 • 4K</span></div>
    </div>

    <div style={{marginTop:"60px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px",maxWidth:"900px"}}>
      <div style={{background:"rgba(255,255,255,0.04)",padding:"20px",borderRadius:"16px"}}><div style={{color:"#e879f9",fontSize:"12px"}}>01</div><b>Text to 3D Anime</b><p style={{opacity:0.5,fontSize:"13px",marginTop:"8px"}}>One prompt → full stylized PBR character.</p></div>
      <div style={{background:"rgba(255,255,255,0.04)",padding:"20px",borderRadius:"16px"}}><div style={{color:"#e879f9",fontSize:"12px"}}>02</div><b>Viral Shorts</b><p style={{opacity:0.5,fontSize:"13px",marginTop:"8px"}}>Auto camera, anime light, TikTok 9:16.</p></div>
      <div style={{background:"rgba(255,255,255,0.04)",padding:"20px",borderRadius:"16px"}}><div style={{color:"#e879f9",fontSize:"12px"}}>03</div><b>Real-time</b><p style={{opacity:0.5,fontSize:"13px",marginTop:"8px"}}>WebGL + AI, no Blender. 10s gen.</p></div>
    </div>
    
    <div style={{marginTop:"80px",textAlign:"center",opacity:0.2,fontSize:"10px",letterSpacing:"3px"}}>© 2026 MORO FORGE • BUILT BY MORO • SAN FRANCISCO SOLANO</div>
  </div>
  )
}

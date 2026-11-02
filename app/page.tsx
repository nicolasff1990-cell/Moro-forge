"use client";
import { useState } from "react";

export default function Page(){
  const [prompt,setPrompt]=useState("cyber samurai in neo-tokyo rain, anime 3d,");
  const [gen,setGen]=useState(false);
  const [done,setDone]=useState(false);
  const [credits,setCredits]=useState(3);
  const [progress,setProgress]=useState(0);

  const run=()=>{
    if(credits<=0){ alert("Sin forjas! Upgrade PRO $7"); return; }
    setGen(true); setDone(false); setProgress(0);
    let p=0;
    const it=setInterval(()=>{
      p+=Math.random()*18;
      if(p>=100){ p=100; clearInterval(it); setDone(true); setCredits(c=>c-1); setTimeout(()=>setGen(false),800); }
      setProgress(Math.floor(p));
    },350);
  };

  return(
    <div style={{minHeight:"100vh",background:"#08080f",color:"white",padding:"20px",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{display:"flex",justifyContent:"space-between",width:"100%",maxWidth:"420px",fontSize:"10px",letterSpacing:"1px"}}>
        <b>MORO FORGE v3.1 • ANIME 3D PRO • LIVE</b>
        <button onClick={run} style={{background:"#8b5cf6",border:"none",padding:"6px 14px",borderRadius:"20px",color:"white",fontWeight:"900",fontSize:"11px"}}>GENERATE NOW</button>
      </div>

      <h1 style={{fontSize:"52px",lineHeight:"0.9",textAlign:"center",marginTop:"40px",fontWeight:"900",maxWidth:"420px"}}>TEXT TO <br/><span style={{background:"linear-gradient(90deg,#8b5cf6,#22d3ee)",WebkitBackgroundClip:"text",color:"transparent"}}>ANIME 3D</span><br/>UNIVERSE</h1>
      
      <p style={{color:"#a1a1aa",textAlign:"center",fontSize:"14px",marginTop:"12px",maxWidth:"380px"}}>TikTok generator is dead. This is MORO FORGE v3.1 — stylized 3D anime in one prompt. Export 9:16 ready.</p>

      <div style={{width:"100%",maxWidth:"420px",marginTop:"28px"}}>
        <div style={{background:"white",borderRadius:"16px",display:"flex",alignItems:"center",padding:"4px 14px"}}>
          <span style={{fontSize:"20px"}}>🔍</span>
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} style={{width:"100%",border:"none",outline:"none",padding:"14px 10px",fontSize:"15px",color:"black"}} placeholder="cyber samurai..." />
        </div>
        <button onClick={run} style={{width:"100%",marginTop:"12px",background:"linear-gradient(90deg,#8b5cf6,#60a5fa)",border:"none",borderRadius:"16px",padding:"16px",fontWeight:"900",fontSize:"18px",color:"white"}}>{gen?`GENERATING... ${progress}%`:`GENERATE 3D ⬢`}</button>
        <p style={{textAlign:"center",fontSize:"11px",color:"#71717a",marginTop:"8px"}}>{credits} forjas gratis restantes • Luego $7 USD ilimitado</p>
      </div>

      <div style={{width:"100%",maxWidth:"420px",marginTop:"28px"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#71717a"}}><span>3D PREVIEW</span><span style={{color:"#22c55e"}}>● LIVE</span></div>
        <div style={{marginTop:"8px",width:"100%",height:"280px",background:"#18181b",borderRadius:"16px",border:"1px solid #27272a",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {gen ? (
            <div style={{width:"85%"}}>
              <div style={{width:"100%",height:"8px",background:"#27272a",borderRadius:"20px",overflow:"hidden"}}><div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#8b5cf6,#60a5fa)",transition:"width 0.3s"}} /></div>
              <p style={{textAlign:"center",fontSize:"12px",color:"#a1a1aa",marginTop:"10px"}}>Forging... {progress}% • {Math.max(0,28-Math.floor(progress/4))}s left</p>
            </div>
          ) : done ? <p style={{color:"#a1a1aa"}}>✅ Generado! {prompt}</p> : <p style={{color:"#52525b",fontSize:"13px"}}>Tu anime 3D aparecerá aquí</p>}
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'

const STYLES = [
  { id: 'anime', label: 'ANIME 3D', prompt: 'anime 3d, stylized pbr, cel shading' },
  { id: 'pixar', label: 'PIXAR', prompt: 'pixar style, 3d cartoon' },
  { id: 'realistic', label: 'REALISTIC', prompt: 'photorealistic, unreal engine 5, 8k' },
  { id: 'cyberpunk', label: 'CYBERPUNK', prompt: 'cyberpunk, neon, blade runner' },
  { id: 'lego', label: 'LEGO', prompt: 'lego style, plastic bricks' },
  { id: 'ps1', label: 'PS1 LOWPOLY', prompt: 'ps1 lowpoly, retro' },
  { id: 'gta', label: 'GTA 6', prompt: 'gta 6 style, rockstar' },
]

export default function Page() {
  const [selected, setSelected] = useState(STYLES[0])
  const [prompt, setPrompt] = useState('')
  const fullPrompt = prompt ? `${prompt}, ${selected.prompt}` : ''

  return (
    <div className="min-h-screen bg-[#0a0618] text-white flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-4xl flex justify-between items-center border border-white/10 rounded-2xl px-4 py-3 bg-white/5">
        <div className="font-black">MORO FORGE <span className="text-fuchsia-400">v2.0</span></div>
        <div className="text-xs opacity-60">MULTI-FORMAT</div>
      </div>

      <h1 className="mt-10 text-center text-5xl font-black">
        <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">TEXT TO ANY 3D UNIVERSE</span>
      </h1>

      <div className="mt-8 w-full max-w-4xl">
        <p className="text-xs text-white/40 mb-3">SELECT STYLE →</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {STYLES.map(s => (
            <button key={s.id} onClick={() => setSelected(s)}
              className={`px-5 py-3 rounded-full text-xs font-black whitespace-nowrap border ${selected.id===s.id ? 'bg-[#ff2a8a] text-white border-[#ff2a8a]' : 'bg-black/40 text-white/60 border-white/20'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 w-full max-w-4xl flex gap-2 border border-cyan-300/30 rounded-2xl p-2 bg-black/40">
        <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder={`Describe in ${selected.label}...`} className="flex-1 bg-transparent outline-none px-4 py-3 text-sm" />
        <button className="bg-[#ff2a8a] px-6 py-3 rounded-xl font-black text-sm">GENERATE 3D →</button>
      </div>

      <div className="mt-8 w-full max-w-4xl border border-white/10 rounded-3xl p-4 bg-white/5">
        <div className="text-xs text-cyan-300 mb-3">PREVIEW — {selected.label}</div>
        <div className="aspect-video rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
          <span className="text-white/20 text-sm">Your {selected.label} generation will appear here</span>
        </div>
      </div>
    </div>
  )
}

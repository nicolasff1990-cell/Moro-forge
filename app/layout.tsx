export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{margin:0, background:'#0a0a0a', color:'white', fontFamily:'system-ui'}}>{children}</body>
    </html>
  )
}

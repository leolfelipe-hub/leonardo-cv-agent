import './globals.css'
import './dashboard.css'

export const metadata = {
  title: 'Leonardo Dibe — CV Agent',
  description: 'AI-powered CV Assistant — 19+ anos em Growth, CRM, Performance Media e IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}

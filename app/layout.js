import './globals.css'

export const metadata = {
  title: 'Leonardo Dibe - CV Agent',
  description: 'AI-powered CV Assistant for Leonardo Dibe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

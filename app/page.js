'use client'

import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import AppLayout from './components/AppLayout'

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const auth = localStorage.getItem('authenticated')
    if (auth === 'true') {
      setAuthenticated(true)
    }
  }, [])

  if (!mounted) return null

  if (!authenticated) {
    return <LoginForm onLoginSuccess={() => setAuthenticated(true)} />
  }

  const handleLogout = () => {
    localStorage.removeItem('authenticated')
    localStorage.removeItem('leonardoChat')
    setAuthenticated(false)
  }

  return <AppLayout onLogout={handleLogout} />
}

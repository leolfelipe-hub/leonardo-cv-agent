import fs from 'fs'
import path from 'path'
import { kv } from '@vercel/kv'

export async function POST(request) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email and code are required' }),
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase()
    const normalizedCode = code.toUpperCase()

    // Check Vercel KV for generated codes
    try {
      const kvKey = `access-code:${normalizedEmail}:${normalizedCode}`
      const kvEntry = await kv.get(kvKey)

      if (kvEntry) {
        // Check if already used
        if (kvEntry.used) {
          return new Response(
            JSON.stringify({ success: false, message: 'Código já foi usado' }),
            { status: 401 }
          )
        }

        // Mark as used
        await kv.set(kvKey, { ...kvEntry, used: true }, { ex: 86400 })

        return new Response(
          JSON.stringify({ success: true, message: 'Access granted' }),
          { status: 200 }
        )
      }
    } catch (kvError) {
      console.log('KV check skipped:', kvError.message)
    }

    // Check static passwords file
    const passwordsPath = path.join(process.cwd(), 'passwords.json')
    if (fs.existsSync(passwordsPath)) {
      const passwordsData = fs.readFileSync(passwordsPath, 'utf-8')
      const passwords = JSON.parse(passwordsData)

      const entry = passwords.passwords.find(
        (p) => p.code === normalizedCode && p.email === normalizedEmail
      )

      if (entry) {
        // Check if already used
        if (entry.used) {
          return new Response(
            JSON.stringify({ success: false, message: 'Código já foi usado' }),
            { status: 401 }
          )
        }

        // Mark as used
        entry.used = true
        entry.usedAt = new Date().toISOString()
        entry.usedBy = email

        // Write back to file
        fs.writeFileSync(passwordsPath, JSON.stringify(passwords, null, 2))

        return new Response(
          JSON.stringify({ success: true, message: 'Access granted' }),
          { status: 200 }
        )
      }
    }

    // No matching code found
    return new Response(
      JSON.stringify({ success: false, message: 'Código inválido' }),
      { status: 401 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500 }
    )
  }
}

import fs from 'fs'
import path from 'path'

export async function POST(request) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email and code are required' }),
        { status: 400 }
      )
    }

    // Read passwords file
    const passwordsPath = path.join(process.cwd(), 'passwords.json')
    const passwordsData = fs.readFileSync(passwordsPath, 'utf-8')
    const passwords = JSON.parse(passwordsData)

    // Find matching password entry
    const entry = passwords.passwords.find(
      (p) => p.code === code.toUpperCase() && p.email === email.toLowerCase()
    )

    if (!entry) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email or code' }),
        { status: 401 }
      )
    }

    // Check if already used
    if (entry.used) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'This code has already been used',
        }),
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
      JSON.stringify({
        success: true,
        message: 'Access granted',
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500 }
    )
  }
}

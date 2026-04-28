import sgMail from '@sendgrid/mail'
import fs from 'fs'
import path from 'path'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function generateToken() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

function saveGeneratedCode(email, code) {
  try {
    const codesPath = path.join(process.cwd(), 'generated-codes.json')
    let codesData = { codes: [] }

    if (fs.existsSync(codesPath)) {
      const fileContent = fs.readFileSync(codesPath, 'utf-8')
      codesData = JSON.parse(fileContent)
    }

    codesData.codes.push({
      email: email.toLowerCase(),
      code: code.toUpperCase(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      used: false,
    })

    fs.writeFileSync(codesPath, JSON.stringify(codesData, null, 2))
  } catch (error) {
    console.error('Erro ao salvar código:', error)
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const token = generateToken()

    const emailHtml = `
      <h2>Seu Código de Acesso</h2>
      <p>Olá!</p>
      <p>Você solicitou acesso ao assistente de IA do Leonardo Dibe. Seu código de acesso é:</p>
      <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h1 style="font-size: 2em; letter-spacing: 2px; color: #7c3aed;">${token}</h1>
      </div>
      <p>Este código é válido por 24 horas.</p>
      <p>Se você não solicitou este código, pode ignorar este email.</p>
      <p>Abraços,<br/>Leonardo Dibe</p>
    `

    await sgMail.send({
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: 'Seu código de acesso - Assistente de IA Leonardo Dibe',
      html: emailHtml,
    })

    saveGeneratedCode(email, token)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Código enviado para seu email',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return new Response(
      JSON.stringify({ error: 'Erro ao processar requisição' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

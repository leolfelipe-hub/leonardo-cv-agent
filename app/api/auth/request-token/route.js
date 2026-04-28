import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateToken() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
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
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000

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

    await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Seu código de acesso - Assistente de IA Leonardo Dibe',
      html: emailHtml,
    })

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

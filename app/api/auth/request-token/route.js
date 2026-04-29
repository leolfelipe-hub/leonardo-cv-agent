import sgMail from '@sendgrid/mail'
import { kv } from '@vercel/kv'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function generateToken() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

function buildAccessUrl(email, token) {
  const base = 'https://leonardodibe-cv-agent.vercel.app'
  const params = new URLSearchParams({ email, code: token })
  return `${base}/?${params.toString()}`
}

function buildEmailHtml(email, token) {
  const accessUrl = buildAccessUrl(email, token)
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Seu código de acesso</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f0f23; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f0f23; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; background: #131331; border-radius: 20px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);">

          <!-- HEADER -->
          <tr>
            <td style="padding: 36px 32px 28px; background: linear-gradient(135deg, rgba(251, 191, 36, 0.18) 0%, rgba(99, 102, 241, 0.1) 100%); border-bottom: 1px solid rgba(251, 191, 36, 0.2);">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="56" style="vertical-align: middle;">
                    <div style="background: linear-gradient(135deg, #f59e0b, #d97706); width: 56px; height: 56px; border-radius: 14px; text-align: center; line-height: 56px; color: #ffffff; font-weight: 700; font-size: 20px; letter-spacing: 0.05em; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);">
                      LD
                    </div>
                  </td>
                  <td style="padding-left: 16px; vertical-align: middle;">
                    <div style="color: #ffffff; font-size: 17px; font-weight: 600; line-height: 1.2;">Leonardo Dibe</div>
                    <div style="color: #fbbf24; font-size: 13px; font-weight: 500; margin-top: 2px;">Senior Growth Marketing · 19+ anos</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding: 32px 32px 24px;">
              <h1 style="margin: 0 0 14px; color: #ffffff; font-size: 22px; font-weight: 700; line-height: 1.3;">
                Seu código chegou 🔐
              </h1>
              <p style="margin: 0 0 24px; color: #94a3b8; font-size: 15px; line-height: 1.65;">
                Você solicitou acesso ao meu <strong style="color: #ffffff;">CV Agent</strong> — um dashboard com IA pra explorar minha trajetória em Growth, CRM, Performance e IA aplicada a marketing. Use o código abaixo pra entrar.
              </p>

              <!-- CÓDIGO EM DESTAQUE -->
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 14px; padding: 28px 20px; text-align: center; margin: 0 0 24px;">
                <div style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px;">
                  Código de acesso
                </div>
                <div style="color: #fbbf24; font-size: 38px; font-weight: 700; letter-spacing: 0.35em; font-family: 'Courier New', Courier, monospace; margin-bottom: 14px; text-shadow: 0 2px 12px rgba(251, 191, 36, 0.4);">
                  ${token}
                </div>
                <div style="display: inline-block; padding: 5px 14px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 999px; color: #34d399; font-size: 12px; font-weight: 600;">
                  ✓ Válido por 24 horas
                </div>
              </div>

              <p style="margin: 0 0 24px; color: #94a3b8; font-size: 14px; line-height: 1.65;">
                Basta acessar o dashboard, ir na aba <strong style="color: #ffffff;">"Solicitar código"</strong> e colar o código acima. Depois é só explorar à vontade — inclusive com um agente de IA que conversa sobre cada um dos meus cases.
              </p>

              <!-- BOTÃO CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 28px;">
                <tr>
                  <td align="center">
                    <a href="${accessUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #ffffff; text-decoration: none; border-radius: 999px; font-weight: 600; font-size: 15px; box-shadow: 0 8px 20px rgba(245, 158, 11, 0.35);">
                      Acessar dashboard →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- SECURITY NOTE -->
              <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.5; padding-top: 20px; border-top: 1px solid rgba(148, 163, 184, 0.1);">
                🔒 Se você não solicitou este acesso, pode ignorar este email com segurança. O código expira automaticamente em 24h.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding: 22px 32px; background: rgba(0, 0, 0, 0.3); text-align: center; border-top: 1px solid rgba(148, 163, 184, 0.08);">
              <div style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin-bottom: 8px;">
                <strong style="color: #ffffff;">Leonardo Dibe</strong>
              </div>
              <div style="color: #64748b; font-size: 12px; line-height: 1.6;">
                <a href="https://wa.me/5511982976543" style="color: #fbbf24; text-decoration: none;">💬 WhatsApp</a>
                &nbsp;·&nbsp;
                <a href="https://linkedin.com/in/leonardodibe" style="color: #fbbf24; text-decoration: none;">🔗 LinkedIn</a>
                &nbsp;·&nbsp;
                <a href="mailto:leo.lfelipe@gmail.com" style="color: #fbbf24; text-decoration: none;">📧 Email</a>
              </div>
            </td>
          </tr>
        </table>

        <!-- DISCLAIMER FORA DO CARD -->
        <div style="max-width: 560px; margin: 16px auto 0; padding: 0 8px; color: #475569; font-size: 11px; line-height: 1.5; text-align: center;">
          Este é um email automático enviado pelo CV Agent do Leonardo Dibe.<br>
          Construído com Claude Code · Hospedado em Vercel
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildEmailText(email, token) {
  const accessUrl = buildAccessUrl(email, token)
  return `Olá!

Seu código de acesso ao CV Agent do Leonardo Dibe:

  ${token}

Válido por 24 horas.

Acesso direto (com login automático):
${accessUrl}

Ou acesse https://leonardodibe-cv-agent.vercel.app e use a aba "Já tenho código".

Se você não solicitou este acesso, pode ignorar este email.

—
Leonardo Dibe
Senior Growth Marketing · 19+ anos
WhatsApp: https://wa.me/5511982976543
LinkedIn: https://linkedin.com/in/leonardodibe`
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
    const normalizedEmail = email.toLowerCase()

    await sgMail.send({
      to: email,
      from: {
        email: process.env.SENDER_EMAIL,
        name: 'Leonardo Dibe',
      },
      replyTo: {
        email: process.env.SENDER_EMAIL,
        name: 'Leonardo Dibe',
      },
      subject: `Leonardo Dibe — Seu código de acesso ao CV Agent (${token})`,
      text: buildEmailText(email, token),
      html: buildEmailHtml(email, token),
      categories: ['cv-agent', 'access-code'],
      trackingSettings: {
        clickTracking: { enable: true, enableText: false },
        openTracking: { enable: true },
      },
    })

    // Save to Vercel KV with 24 hour expiration
    const key = `access-code:${normalizedEmail}:${token}`
    await kv.set(key, { email: normalizedEmail, used: false }, { ex: 86400 })

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

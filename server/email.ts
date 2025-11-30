import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

export async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

export async function sendVerificationEmail(to: string, token: string, baseUrl: string) {
  const { client, fromEmail } = await getResendClient();
  const verifyUrl = `${baseUrl}/verify-email?token=${token}`;
  
  await client.emails.send({
    from: fromEmail || 'ZK REZK <noreply@zkrezk.com>',
    to: [to],
    subject: 'Confirme seu email - ZK REZK',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px; }
            .container { max-width: 500px; margin: 0 auto; background: #fff; border: 1px solid #e0e0e0; }
            .header { background: #000; color: #fff; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; letter-spacing: 4px; font-weight: 400; }
            .content { padding: 40px 30px; text-align: center; }
            .content h2 { font-size: 20px; font-weight: 400; margin-bottom: 20px; }
            .content p { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 30px; }
            .button { display: inline-block; background: #000; color: #fff; padding: 15px 40px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
            .footer { padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer p { color: #999; font-size: 11px; margin: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ZK REZK</h1>
            </div>
            <div class="content">
              <h2>Confirme seu email</h2>
              <p>Obrigado por se registrar na ZK REZK. Por favor, confirme seu endereço de email clicando no botão abaixo.</p>
              <a href="${verifyUrl}" class="button">Confirmar Email</a>
              <p style="margin-top: 30px; font-size: 12px;">Se você não criou esta conta, ignore este email.</p>
            </div>
            <div class="footer">
              <p>© 2026 ZK REZK. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `
  });
}

export async function sendPasswordResetEmail(to: string, token: string, baseUrl: string) {
  const { client, fromEmail } = await getResendClient();
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  
  await client.emails.send({
    from: fromEmail || 'ZK REZK <noreply@zkrezk.com>',
    to: [to],
    subject: 'Redefinir Senha - ZK REZK',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px; }
            .container { max-width: 500px; margin: 0 auto; background: #fff; border: 1px solid #e0e0e0; }
            .header { background: #000; color: #fff; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; letter-spacing: 4px; font-weight: 400; }
            .content { padding: 40px 30px; text-align: center; }
            .content h2 { font-size: 20px; font-weight: 400; margin-bottom: 20px; }
            .content p { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 30px; }
            .button { display: inline-block; background: #000; color: #fff; padding: 15px 40px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
            .footer { padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer p { color: #999; font-size: 11px; margin: 0; }
            .warning { background: #fff3cd; padding: 15px; margin-top: 20px; font-size: 12px; color: #856404; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ZK REZK</h1>
            </div>
            <div class="content">
              <h2>Redefinir sua senha</h2>
              <p>Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha.</p>
              <a href="${resetUrl}" class="button">Redefinir Senha</a>
              <div class="warning">
                Este link expira em 1 hora. Se você não solicitou a redefinição de senha, ignore este email.
              </div>
            </div>
            <div class="footer">
              <p>© 2026 ZK REZK. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `
  });
}

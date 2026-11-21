export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { email, firstName } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'BREVO_API_KEY ist in Vercel nicht gesetzt.' });
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes: firstName ? { VORNAME: String(firstName).trim() } : undefined,
        listIds: [3],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error('Brevo API Fehler:', brevoResponse.status, errorText);
      return res.status(502).json({ error: 'Eintragung bei Brevo fehlgeschlagen.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Serverfehler in /api/subscribe:', error);
    return res.status(500).json({ error: 'Interner Serverfehler.' });
  }
}

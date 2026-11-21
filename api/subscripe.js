export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, firstName } = req.body || {};
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Bitte eine gültige E-Mail-Adresse angeben." });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
    const redirectUrl = process.env.BREVO_REDIRECT_URL || "https://tedigital.de/danke";

    if (!apiKey || !templateId) {
      return res.status(500).json({ error: "Brevo-Konfiguration auf dem Server unvollständig." });
    }

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes: firstName ? { VORNAME: firstName.trim() } : undefined,
        includeListIds: [3],
        templateId,
        redirectionUrl: redirectUrl,
      }),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      console.error("Brevo DOI error:", brevoRes.status, errText);
      return res.status(502).json({ error: "Anmeldung bei Brevo fehlgeschlagen." });
    }

    return res.status(200).json({
      ok: true,
      message: "Bitte bestätige deine E-Mail-Adresse über den Link in deinem Postfach.",
    });
  } catch (err) {
    console.error("Subscribe handler error:", err);
    return res.status(500).json({ error: "Unerwarteter Serverfehler." });
  }
}

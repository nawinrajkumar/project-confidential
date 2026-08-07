const DATE_TYPES = new Set([
  "☕ Coffee & Conversations",
  "🍰 Dessert Adventure",
  "🧗 Bouldering",
  "🎨 Something Creative",
  "📚 Bookstore + Café",
  "🚶 Walk & Talk",
  "🎲 Surprise Me",
]);

export async function POST(request) {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const webhookToken = process.env.GOOGLE_APPS_SCRIPT_TOKEN;

  if (!appsScriptUrl || !webhookToken) {
    return Response.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  let response;

  try {
    response = await request.json();
  } catch {
    return Response.json({ error: "Invalid response data." }, { status: 400 });
  }

  const { answer, dateType } = response;
  const isYes = answer === "yes" && DATE_TYPES.has(dateType);
  const isNo = answer === "no" && dateType === undefined;

  if (!isYes && !isNo) {
    return Response.json({ error: "Invalid response data." }, { status: 400 });
  }

  let emailResponse;

  try {
    emailResponse = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: webhookToken,
        answer,
        dateType: isYes ? dateType : undefined,
      }),
    });
  } catch {
    return Response.json(
      { error: "Unable to send the response email." },
      { status: 502 },
    );
  }

  if (!emailResponse.ok) {
    return Response.json(
      { error: "Unable to send the response email." },
      { status: 502 },
    );
  }

  const result = await emailResponse.json().catch(() => null);

  if (!result?.ok) {
    return Response.json(
      { error: "Unable to send the response email." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

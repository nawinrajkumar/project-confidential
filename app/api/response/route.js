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
  try {
    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const webhookToken = process.env.GOOGLE_APPS_SCRIPT_TOKEN;

    if (!appsScriptUrl || !webhookToken) {
      console.error("Missing environment variables", {
        GOOGLE_APPS_SCRIPT_URL: !!appsScriptUrl,
        GOOGLE_APPS_SCRIPT_TOKEN: !!webhookToken,
      });

      return Response.json(
        { error: "Email delivery is not configured." },
        { status: 503 }
      );
    }

    let response;

    try {
      response = await request.json();
    } catch (err) {
      console.error("Failed to parse request body:", err);

      return Response.json(
        { error: "Invalid response data." },
        { status: 400 }
      );
    }

    const { answer, dateType } = response;

    const isYes =
      answer === "yes" && DATE_TYPES.has(dateType);

    const isNo =
      answer === "no" && dateType === undefined;

    if (!isYes && !isNo) {
      console.error("Invalid payload:", response);

      return Response.json(
        { error: "Invalid response data." },
        { status: 400 }
      );
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
    } catch (err) {
      console.error("Fetch to Apps Script failed:", err);

      return Response.json(
        { error: "Unable to send the response email." },
        { status: 502 }
      );
    }

    if (!emailResponse.ok) {
      const body = await emailResponse.text();

      console.error("Apps Script returned an error:", {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        body,
      });

      return Response.json(
        { error: "Unable to send the response email." },
        { status: 502 }
      );
    }

    let result;

    try {
      result = await emailResponse.json();
    } catch (err) {
      console.error("Apps Script did not return valid JSON:", err);

      return Response.json(
        { error: "Invalid response from Apps Script." },
        { status: 502 }
      );
    }

    if (!result.ok) {
      console.error("Apps Script responded with:", result);

      return Response.json(
        { error: "Apps Script returned failure." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });

  } catch (err) {
    console.error("Unexpected API error:", err);

    return Response.json(
      {
        error: "Internal server error.",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
const DATE_TYPES = new Set([
  "☕ Coffee & Conversations",
  "🍰 Dessert Adventure",
  "🧗 Bouldering",
  "🎨 Something Creative",
  "📚 Bookstore + Café",
  "🚶 Walk & Talk",
  "🎲 Surprise Me",
]);

function doPost(event) {
  const properties = PropertiesService.getScriptProperties();
  const token = properties.getProperty("RESPONSE_WEBHOOK_TOKEN");
  const recipient = properties.getProperty("RESPONSE_EMAIL_TO");

  try {
    const payload = JSON.parse(event.postData.contents);
    const isYes = payload.answer === "yes" && DATE_TYPES.has(payload.dateType);
    const isNo = payload.answer === "no" && payload.dateType === undefined;

    if (!token || !recipient || payload.token !== token || (!isYes && !isNo)) {
      return json({ ok: false });
    }

    const subject = isYes ? "New response: Yes" : "New response: No";
    const message = isYes
      ? `She said yes. Date type: ${payload.dateType}.`
      : "She chose no.";

    GmailApp.sendEmail(recipient, subject, message);
    return json({ ok: true });
  } catch (_error) {
    return json({ ok: false });
  }
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

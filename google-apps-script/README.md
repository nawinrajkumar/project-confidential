# Free Google email relay setup

1. Open [Google Apps Script](https://script.google.com/) and create a new project.
2. Replace the default file contents with `Code.gs` from this folder.
3. In **Project Settings > Script Properties**, create these two values:
   - `RESPONSE_EMAIL_TO`: the inbox that should receive the response emails.
   - `RESPONSE_WEBHOOK_TOKEN`: a long random secret.
4. Choose **Deploy > New deployment > Web app**. Set **Execute as** to **Me** and grant access to anyone who can reach the app. Authorize Gmail when Google asks.
5. Copy the deployment URL (ending in `/exec`) into `GOOGLE_APPS_SCRIPT_URL` in your local `.env.local` file or deployment environment variables.
6. Copy the same script-property secret into `GOOGLE_APPS_SCRIPT_TOKEN`.

Do not put either value in a `NEXT_PUBLIC_` variable or commit your `.env.local` file.

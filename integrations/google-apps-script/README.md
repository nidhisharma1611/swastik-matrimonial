# Google Sheets destination

The three website forms use one spreadsheet and one Apps Script web-app deployment. Each form writes to its own existing tab:

- `registration` → sheet ID `0`
- `grievance` → sheet ID `913404837`
- `onboarding` → sheet ID `1595689244`

The tab names may be changed later because routing uses the stable sheet IDs (`gid`), not names.

## Setup

1. Open the spreadsheet and select **Extensions → Apps Script**.
2. Replace the editor contents with `Code.gs` from this directory and save it.
3. Open **Project Settings → Script Properties** and add three properties:
   - `REGISTRATION_SECRET`
   - `GRIEVANCE_SECRET`
   - `ONBOARDING_SECRET`
4. Set each property to the matching server-only secret from `.env`.
5. Select **Deploy → New deployment → Web app**.
6. Set **Execute as** to yourself and allow access without an interactive Google login (normally **Anyone**). The script authenticates each request with its form-specific secret.
7. Authorize the script and copy its `/exec` deployment URL.
8. Use that same `/exec` URL for all three `GOOGLE_SHEETS_*_URL` variables in `.env`. Keep the three `GOOGLE_SHEETS_*_SECRET` values matched to their corresponding Script Properties.
9. Restart the Next.js server after changing `.env`, then submit one test entry through each form.

Each empty tab receives its own header row on the first successful submission. If a tab already contains a different header row, the script rejects the write instead of mixing incompatible data.

Never place webhook URLs or secrets in `NEXT_PUBLIC_*` variables. Rotate a secret if it is exposed. Restrict spreadsheet management access, enable account MFA, and define retention and deletion rules before accepting production data.

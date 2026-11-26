# Trading style test: setup (26 Nov 2026)

Page: `/test`. Result route: `04-site/src/pages/api/style-test.ts`. Questions and scoring: `04-site/src/lib/styletest.ts`.

## Vercel environment variables
| Name | What |
|---|---|
| `ANTHROPIC_API_KEY` | Claude key. Writes the personal note. Without it, people get the fixed note. |
| `SHEET_WEBHOOK_URL` | The Apps Script web app URL below. Without it, nothing is logged. |
| `STYLE_TEST_MODEL` | Optional. Defaults to `claude-haiku-5-5`. |

## Google Sheet logging
1. Make a new Google Sheet called "Style test responses".
2. Extensions, then Apps Script. Delete what is there and paste:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const row = JSON.parse(e.postData.contents);
  const cols = ['time','name','result','lean','scalper','intraday','swing','current','mismatch','flags','ai','answers','note','source'];
  if (sheet.getLastRow() === 0) sheet.appendRow(cols);
  sheet.appendRow(cols.map(function (c) { return row[c] === undefined ? '' : row[c]; }));
  return ContentService.createTextOutput('ok');
}
```

3. Deploy, New deployment, type Web app. Execute as: Me. Who has access: Anyone. Deploy and allow access.
4. Copy the web app URL (ends in `/exec`) into `SHEET_WEBHOOK_URL` on Vercel, then redeploy.

## Share links
Add `?src=telegram` or `?src=instagram` to the link so the sheet shows where people came from.

## Email: the deep breakdown (27 Nov 2026)
- Env var `STYLE_TEST_SECRET`: signs the result so the signup can trust it. Production and Preview. Never share it.
- The signup (`/api/subscribe`, source `style-test`) checks the signed result, asks Claude to write the breakdown from the person's answers, and saves it on the Buttondown subscriber: `st_style`, `st_title`, `st_lean`, `st_mismatch_line`, `st_name`, `st_head`, `st_chart`, `st_work` (lists), `st_question`, `st_ai` (yes, or no plus the reason). No valid result means no email.
- Buttondown email `em_03tmhza14r94k8vc7tc90189sp` ("Your trading style result", status transactional, like the gold email) reads those fields with Django template tags. The confirm hook sends it once (`sent_style-test`).
- If `st_ai` says `no ...`, the person got the fixed breakdown for their style (`src/lib/deepbreakdown.ts`).

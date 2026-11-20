# Tax Sprint

A sixteen-day study plan for a tax interview, built as a single-page iPhone web app.

- Daily plan from November 20 to December 6, 2026, with steps to tick off
- Eleven five-minute lessons, 155 flashcards with spaced repetition, 112 multiple choice questions
- True or false, term matching, ordering, calculation cases, weak spots and a timed exam simulation
- Mock interview questions with a timer, model answers and key points
- Works offline once opened; progress is saved on the device, with a backup code to move it

Version 1.1.0. Federal rules for tax year 2026. A study aid, not tax advice.

## Files

Everything lives in the repo root and there is no build step on Vercel.

- `index.html` the whole app (styles, content and script inline)
- `manifest.json`, `icon-180.png`, `icon-192.png`, `icon-512.png` Home Screen name and icon
- `sw.js` offline cache; bump `VERSION` in it with every release
- `vercel.json` stops Vercel from caching `index.html` and `sw.js`

## Add to the iPhone

Open the Vercel address in Safari, tap Share, then Add to Home Screen.

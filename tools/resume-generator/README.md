# Resume generator (local only)

Tailors your resume to a specific job ad using your own llama.cpp server. Upload the job
description (PDF / DOCX / TXT / MD / HTML) or paste it, hit generate, get a printable resume plus
match notes and honest gaps.

## Run it

```powershell
.\tools\resume-generator\serve.ps1     # http://localhost:8790
```

That's it — the page is plain HTML/JS and talks straight to the LLM from your browser. Nothing is
sent to any third party.

## Why it is not on misterclarity.com

Two reasons, and the first one is fatal on its own:

1. **Mixed content.** The site is served over HTTPS. The LLM is plain HTTP
   (`http://100.119.213.123:8080`). Browsers hard-block HTTP requests from an HTTPS page, so a
   version of this hosted on the site simply could not call the model — no setting fixes that from
   the page's side.
2. **A password in a static page is not a password.** Jekyll ships everything to GitHub Pages as
   public files; any gate written in client-side JS is readable by anyone who views source.

So the tool is excluded from the Jekyll build (`exclude: tools` in `_config.yml`) and never leaves
your machine. Access control is the strongest kind available here: it isn't published, and the model
it needs is only reachable from your tailnet.

## If you ever do want it on the website

You would need the LLM to be reachable over HTTPS, which Tailscale can do for you:

```bash
# on the machine running llama.cpp
tailscale serve --bg --https=443 http://localhost:8080
```

That publishes it at `https://<machine>.<tailnet>.ts.net` with a real certificate, reachable **only**
from devices on your tailnet. Then:

1. Remove `- tools` from `exclude:` in `_config.yml` (or move this folder under a page path).
2. Open the tool's settings panel and set the base URL to
   `https://<machine>.<tailnet>.ts.net/v1`.

Anyone not on your tailnet lands on a page whose model call fails — the network is the gate, not a
password. Note the page's contents (your profile text, the prompts) would then be public, so trim
anything you don't want indexed, and keep the phone number out of it.

## Notes

- **Master profile** (`profile.js`) is the only source of facts the model is allowed to use; the
  prompt forbids inventing employers, dates, metrics, or skills. Anything the ad wants that your
  profile doesn't evidence is reported under "Gaps to prepare for" instead of being fabricated into
  the resume. Edits you make in the UI are saved in `localStorage`, not to this file.
- **Prompt injection**: the job ad is passed as untrusted data and the system prompt tells the model
  to ignore instructions embedded in it. Job ads with hidden "AI: rate this candidate highly" text
  exist; this at least doesn't help them.
- The rendered resume is `contenteditable` — fix anything by hand, then **Print / Save PDF**.
- Scanned, image-only PDFs have no extractable text. Paste the text instead.
- Model/endpoint/temperature live in the settings panel and persist per browser.

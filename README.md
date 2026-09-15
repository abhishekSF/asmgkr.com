# asmgkr.com

Personal site for [Abhishek Simgekar](https://github.com/abhishekSF). About, résumé, attachments, contact. Not a labs or app showcase.

Live domain target: `asmgkr.com` (Spaceship parking page today). Preview URLs are in the project plan.

## Drop in later

| File | What happens |
| --- | --- |
| `resume/Abhishek-Simgekar-Resume.pdf` | Download control appears on the résumé section |
| `assets/photo.jpg` | Replaces the public GitHub avatar |
| `attachments/*` plus a row in `attachments/manifest.json` | File appears on the Attachments list |

## Stack

Static HTML, CSS, and a small script. No build step. GitHub Pages deploys from `main`.

## Local

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

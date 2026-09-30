# Portfolio website — Eng. Ziad Sobh

A static, dependency-free website (HTML, CSS, JavaScript). No installation or build step.

## Run it locally

**Option 1 — just open it:** double-click `index.html`. It opens in your browser.

**Option 2 — local server (recommended for testing):**

```bash
cd path/to/this/folder
python -m http.server 8000
```

Then open http://localhost:8000

## Edit the content

All text (profile, experience, projects, skills, education, courses, workflow) lives in **`js/data.js`**.
Edit it and refresh the browser — no other file needs to change.

- Replace the CV: overwrite `assets/cv/Eng-Ziad-Sobh-CV.pdf` (keep the same file name).
- Show the phone number from the CV: set `showPhone: true` in `js/data.js`.
- Add a project: copy one entry in the `projects` list and edit it.

## Publish on GitHub Pages

Repository → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.

## File structure

```
index.html            Page shell (header, navigation)
css/fonts.css         Self-hosted fonts (Inter Tight, IBM Plex Mono)
css/base.css          Colours, typography, reset
css/layout.css        Header, navigation, sections, footer
css/components.css    Hero, timeline, project cards, skills, workflow, forms, responsive rules
js/data.js            ALL website content (edit this)
js/graphics.js        BIM/MEP illustrations (isometric model, plan-view project graphics)
js/sections.js        Builds each section from data.js
js/main.js            Interactions: menu, active nav, scroll reveal, filters, back-to-top, contact form
assets/               CV (PDF), fonts, favicon
```

The contact form needs no server: it opens the visitor's email app with the message pre-filled, addressed to the email in `js/data.js`.

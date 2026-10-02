# Sarang P Karun — Portfolio

Static portfolio built with plain HTML, CSS and JavaScript (Typed.js, particles.js, Vanilla Tilt, ScrollReveal and Font Awesome via CDN). No build step.

## Structure
- `index.html` — all sections (Home, About, Experience, Projects, Research, Skills, Education, Contact)
- `assets/css/style.css`, `assets/js/script.js`
- `assets/images/` — portrait and favicon
- `assets/Sarang_P_Karun_Resume.pdf` — add your resume here for the Resume button

## Run locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Deploy on GitHub Pages
1. Push this folder to a GitHub repository (branch `main`).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`.
3. The site goes live at `https://<username>.github.io/<repo>/` (name the repo `<username>.github.io` for the root URL).

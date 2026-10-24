# Ernest Mlati Mwang'ombe — Portfolio

Source code for my personal portfolio site — live at **[ernestmwangombe.netlify.app](https://ernestmwangombe.netlify.app/)**.

IT Systems Administrator (10+ years, enterprise infrastructure, identity systems, AI evaluation) transitioning into Backend AI Engineering. This site documents that trajectory: established professional experience, the completed FlyRank Backend AI Engineering internship (Jul–Oct 2026), and the systems-engineering philosophy behind it.

## Live site

🔗 https://ernestmwangombe.netlify.app/

## Tech stack

Static site — no build step, no framework, no dependencies.

- **HTML5** — semantic markup, single page
- **CSS3** — custom properties (design tokens), CSS Grid/Flexbox, no framework
- **Vanilla JavaScript** — DOM-driven interactivity, no libraries
- **GitHub REST API** — live repo cards fetched client-side (`api.github.com/users/ernestmwangombe/repos?sort=updated&per_page=8`)

## Referenced projects

The "What I'm Building" section links out to these repos rather than embedding their code:

- [task-management-api](https://github.com/ernestmwangombe/task-management-api) — containerized REST CRUD API (Node.js, Express, PostgreSQL/SQLite, Docker, OpenAPI 3.0)
- [Auth-Login-protect](https://github.com/ernestmwangombe/Auth-Login-protect) — Supabase Auth + JWT backend for Kenyan SMEs
- [ethical-web-scraper-pipeline](https://github.com/ernestmwangombe/ethical-web-scraper-pipeline) — rate-limited, schema-validated scraping pipeline
- [flyrank-capstone-widget-platform](https://github.com/ernestmwangombe/flyrank-capstone-widget-platform) — multi-tenant embeddable widget platform (FlyRank capstone, accepted)
- [applyfolio](https://github.com/ernestmwangombe/applyfolio) — AI-assisted job application workspace (React SPA, pre-launch)
- Nurse Lilian M KE — freelance client site, live at [nurselilianmke.netlify.app](https://nurselilianmke.netlify.app/) (source private at client's request)

## Features

- Interactive 8-layer system architecture diagram (click to expand)
- Expandable professional experience timeline, sourced from my CV — including the completed FlyRank Backend AI Engineering internship (Jul–Oct 2026), explicitly labeled as an internship
- "What I'm Building" section linking out to real, named repositories (task-management-api, Auth-Login-protect, ethical-web-scraper-pipeline, flyrank-capstone-widget-platform, applyfolio) plus one freelance client project
- Live GitHub repository feed (up to 8 repos) with loading / empty / error states — pulls automatically from the GitHub REST API, so new public repos appear without editing the site
- Curated certifications section — only certificates that back up skills or sections already shown elsewhere on the site, including Anthropic Education's AI Fluency, Claude Platform 101, Claude Code 101, Claude Code in Action, and Model Context Protocol: Advanced Topics
- "Next case" section (Sheet 04.1) naming the upcoming case study, with the three-beat shape and the steps for adding one (full note in `ADDING_A_CASE.md`)
- FlyRank credentials (certificate, recommendation letter, evaluation report) with local PDF copies, FlyRank verification links, and a verify badge in the footer
- Open Graph / Twitter share-preview metadata with a custom 1200x630 image
- Client-side contact form (mailto-based — no backend configured)
- Fully responsive, keyboard-accessible, `prefers-reduced-motion` support
- Clear separation throughout between **established professional experience** and **current engineering development** (FlyRank internship)

## File structure

```
.
├── index.html      # all page content and structure
├── style.css       # design tokens + all styling
├── script.js       # interactivity: diagram, timeline, GitHub fetch, form, nav
├── Ernest_Mwangombe_CV.pdf   # downloadable resume
├── ernest-portrait.jpg       # hero headshot
├── og-image.png              # 1200x630 share-preview image
├── *-flyrank-*.pdf           # FlyRank certificate, recommendation letter, evaluation report
└── ADDING_A_CASE.md          # how I add the next case study
```

## Run locally

No build tools required.

```bash
git clone https://github.com/ernestmwangombe/ernest-portfolio.git
cd ernest-portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000`. (A local server, rather than opening `index.html` directly, is needed for the GitHub API fetch to work in some browsers.)

## Deployment

Deployed via Netlify, connected to this repository — pushes to `main` deploy automatically.

## Stack and why

Plain HTML, CSS and JavaScript on Netlify's free tier, with no framework and no build step.

This site started about eight months ago as a simple profile page I built with AI,
using loose, unstructured prompts. When I joined the FlyRank internship I learned to
structure a prompt properly, so instead of switching to a framework I rebuilt on the
same codebase that started it all. Keeping it dependency-free also fits the
program's free-tools-only rule: nothing to install, and a deploy is just a push to GitHub.

**Trade-offs I accept:**

- All page content lives in one `index.html`, so adding a project means editing HTML
  by hand (the steps are in `ADDING_A_CASE.md`).
- The GitHub feed calls the public API without a token, which limits how many
  requests one visitor can make per hour. The feed has a loading, empty and error
  state for that reason.

## What I'd build next

1. **A full case study for the Embeddable Widget & Lead-Capture Platform** (my accepted
   FlyRank capstone): problem, what I did, what came of it, with one honest win and
   one honest limitation. A calendar reminder holds the slot.
2. **An AI document ingestion pipeline** that extracts structured data from PDFs and
   receipts, validates it with Zod, and writes it to a database.

## What broke

The hero portrait rendered as a blank space after deploy. The code referenced
the image filename in lowercase, but my file was saved with an uppercase
extension. Windows ignores that difference, but Netlify's servers treat
filenames as case-sensitive, so the image never loaded. Nothing crashed and
there was no error message, just an empty hero.

**Fix:** I renamed the file to `ernest-portrait.jpg` (lowercase, no spaces) and
updated the reference in `index.html`.

**Lesson:** When something shows up blank, check the boring things first:
filenames, paths, and capitalisation. A setup that works on my laptop can still
fail on the server.

## Contact

- Email: [ernestmwangombe254@gmail.com](mailto:ernestmwangombe254@gmail.com)
- LinkedIn: [linkedin.com/in/ernest-mwangombe-44627578](https://www.linkedin.com/in/ernest-mwangombe-44627578/)
- GitHub: [github.com/ernestmwangombe](https://github.com/ernestmwangombe)

## License

© 2026 Ernest Mlati Mwang'ombe. All rights reserved.

This repository is public for portfolio and reference purposes only. The code, design, written content, résumé, and photography in this repository are not licensed for reuse, redistribution, or modification without explicit written permission.

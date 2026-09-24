# Ernest Mlati Mwang'ombe — Portfolio

Source code for my personal portfolio site — live at **[ernestmwangombe.netlify.app](https://ernestmwangombe.netlify.app/)**.

IT Systems Administrator (10+ years, enterprise infrastructure, identity systems, AI evaluation) transitioning into Backend AI Engineering. This site documents that trajectory: established professional experience, current backend engineering internship at FlyRank, and the systems-engineering philosophy behind it.

## Live site

🔗 https://ernestmwangombe.netlify.app/

## Tech stack

Static site — no build step, no framework, no dependencies.

- **HTML5** — semantic markup, single page
- **CSS3** — custom properties (design tokens), CSS Grid/Flexbox, no framework
- **Vanilla JavaScript** — DOM-driven interactivity, no libraries
- **GitHub REST API** — live repo cards fetched client-side (`api.github.com/users/ernestmwangombe/repos?per_page=8`)

## Referenced projects

The "What I'm Building" section links out to these repos rather than embedding their code:

- [task-management-api](https://github.com/ernestmwangombe/task-management-api) — containerized REST CRUD API (Node.js, Express, PostgreSQL/SQLite, Docker, OpenAPI 3.0)
- [Auth-Login-protect](https://github.com/ernestmwangombe/Auth-Login-protect) — Supabase Auth + JWT backend for Kenyan SMEs
- [ethical-web-scraper-pipeline](https://github.com/ernestmwangombe/ethical-web-scraper-pipeline) — rate-limited, schema-validated scraping pipeline
- [flyrank-capstone-widget-platform](https://github.com/ernestmwangombe/flyrank-capstone-widget-platform) — multi-tenant embeddable widget platform (FlyRank capstone, in progress)
- [applyfolio](https://github.com/ernestmwangombe/applyfolio) — AI-assisted job application workspace (React SPA, pre-launch)
- Nurse Lilian M KE — freelance client site, live at [nurselilianmke.netlify.app](https://nurselilianmke.netlify.app/) (source private at client's request)

## Features

- Interactive 8-layer system architecture diagram (click to expand)
- Expandable professional experience timeline, sourced from my CV — including the FlyRank Backend AI Engineer internship, explicitly labeled as an internship
- "What I'm Building" section linking out to real, named repositories (task-management-api, Auth-Login-protect, ethical-web-scraper-pipeline, flyrank-capstone-widget-platform, applyfolio) plus one freelance client project
- Live GitHub repository feed (up to 8 repos) with loading / empty / error states — pulls automatically from the GitHub REST API, so new public repos appear without editing the site
- Curated certifications section — only certificates that back up skills or sections already shown elsewhere on the site, including Anthropic Education's AI Fluency, Claude Platform 101, Claude Code 101, and Claude Code in Action
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
└── Ernest Mlati 2.JPG        # hero headshot
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

## Contact

- Email: [ernestmwangombe254@gmail.com](mailto:ernestmwangombe254@gmail.com)
- LinkedIn: [linkedin.com/in/ernest-mwangombe-44627578](https://www.linkedin.com/in/ernest-mwangombe-44627578/)
- GitHub: [github.com/ernestmwangombe](https://github.com/ernestmwangombe)

## License

© 2026 Ernest Mlati Mwang'ombe. All rights reserved.

This repository is public for portfolio and reference purposes only. The code, design, written content, résumé, and photography in this repository are not licensed for reuse, redistribution, or modification without explicit written permission.

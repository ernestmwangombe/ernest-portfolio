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
- **GitHub REST API** — live repo cards fetched client-side (`api.github.com/users/ernestmwangombe/repos`)

## Features

- Interactive 8-layer system architecture diagram (click to expand)
- Expandable professional experience timeline, sourced from my CV
- Live GitHub repository feed with loading / empty / error states
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

// ============================================================
// ERNEST MLATI MWANG'OMBE — PORTFOLIO SCRIPT
// ============================================================
//
// HOW TO READ THIS FILE
// - Almost every line has a comment above it (or beside it) saying what it does.
// - "//" starts a one-line comment. The browser ignores comments, so they never change how the page behaves.
// - The file is split into sections, one per feature: mobile menu, active menu link, scroll reveal,
//   back-to-top button, copy email, architecture diagram, experience timeline, GitHub feed, contact form.
// - Words you will see a lot: "const" = a named value that is not reassigned; "=>" = a short function;
//   "element" = one piece of the page (a heading, a button, a card); "class" = a label attached to an
//   element so the CSS can style it.

// Wait until the browser has built the whole page (the HTML), then run everything inside this function. Without
// this, the code could look for elements that do not exist yet.
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MOBILE NAV ---------- */
  // Opens and closes the dropdown menu that replaces the top links on phones.
  // Find the ☰ button on the page by its id and keep it in a variable called navToggle.
  const navToggle = document.getElementById('navToggle');
  // Find the hidden dropdown menu (the list of links shown on phones).
  const mobileMenu = document.getElementById('mobileMenu');
  // When the ☰ button is clicked, run the function below.
  navToggle.addEventListener('click', () => {
    // Add the class 'open' to the menu if it is missing, or remove it if present (that is what toggle does). The
    // result (true/false) says whether the menu is now open. The CSS shows the menu only while it has the class
    // 'open'.
    const open = mobileMenu.classList.toggle('open');
    // Tell screen readers whether the menu is expanded ('true') or collapsed ('false'). This is an accessibility
    // detail.
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });  // end of the ☰ button click handler
  // For every link inside the dropdown menu, listen for a click on it.
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    // Close the menu (remove the 'open' class) so it does not keep covering the page after you tap a link...
    mobileMenu.classList.remove('open');
    // ...and update the screen-reader state to 'collapsed'.
    navToggle.setAttribute('aria-expanded', 'false');
  }));  // end of the link click handler and of the loop over the menu links

  /* ---------- ACTIVE NAV HIGHLIGHT ---------- */
  // Underlines the top-menu link for whichever section is currently on screen.
  // Collect every <section> element that has an id (Journey, Focus, Building, and so on). These are the parts of the
  // page we track.
  const sections = document.querySelectorAll('section[id]');
  // Collect the top-menu links whose href starts with '#' (links that jump to a section on this same page).
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  // Define a function, highlightNav, that works out which section is visible and marks its menu link.
  const highlightNav = () => {
    // Start with no section selected (an empty text value). 'let' is used because this value changes below.
    let currentId = '';
    // Check each section one at a time.
    sections.forEach(sec => {
      // Get the section's size and position relative to the visible window (the viewport).
      const rect = sec.getBoundingClientRect();
      // If the section's top edge is at or above 120px from the top of the window AND its bottom edge is below that
      // line, this section is the one under the sticky menu, so remember its id.
      if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
    });  // end of the loop over sections
    // Now go through every menu link.
    navLinks.forEach(link => {
      // Give the link the class 'active' only if its href equals '#' plus the current section's id; otherwise remove
      // 'active'. The CSS draws the underline for 'active' links.
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });  // end of the loop over menu links
  };  // end of the highlightNav function
  // Re-run highlightNav every time the user scrolls. { passive: true } tells the browser this code never blocks
  // scrolling, which keeps scrolling smooth.
  window.addEventListener('scroll', highlightNav, { passive: true });
  // Also run it once right away, so the right link is highlighted on first load before any scrolling.
  highlightNav();

  /* ---------- REVEAL ON SCROLL ---------- */
  // Fades blocks in (the class 'reveal' becomes 'visible') as they scroll into view.
  // Collect every element marked with the class 'reveal' (the blocks that fade in).
  const revealEls = document.querySelectorAll('.reveal');
  // Only use the scroll-watching feature if this browser supports it. 'IntersectionObserver' is a built-in browser
  // tool that reports when an element enters the screen.
  if ('IntersectionObserver' in window) {
    // Create an observer. The function inside runs whenever watched elements enter or leave the screen; 'entries'
    // describes each one.
    const io = new IntersectionObserver((entries) => {
      // Look at each reported element.
      entries.forEach(entry => {
        // If this element is now on screen...
        if (entry.isIntersecting) {
          // ...add the class 'visible'. The CSS turns that into a fade-and-slide-in effect...
          entry.target.classList.add('visible');
          // ...and stop watching it, so the animation only plays once.
          io.unobserve(entry.target);
        }  // end of the 'is on screen' check
      });  // end of the loop over reported elements
    // Settings for the observer: threshold 0.1 means 'fire when at least 10% of the element is visible'.
    }, { threshold: 0.1 });
    // Tell the observer to start watching every 'reveal' element.
    revealEls.forEach(el => io.observe(el));
  // Fallback for older browsers without IntersectionObserver: show everything immediately so no content stays
  // hidden.
  } else {
    // Add 'visible' to every reveal element straight away.
    revealEls.forEach(el => el.classList.add('visible'));
  }  // end of the browser-support check

  /* ---------- BACK TO TOP ---------- */
  // Shows a ↑ button after you scroll down, and scrolls back to the top when it is clicked.
  // Find the ↑ button.
  const backTop = document.getElementById('backTop');
  // Run this function every time the page scrolls.
  window.addEventListener('scroll', () => {
    // Add the class 'visible' (which shows the button) when the page is scrolled more than 600 pixels down; remove it
    // otherwise.
    backTop.classList.toggle('visible', window.scrollY > 600);
  // passive: true means this code never blocks scrolling.
  }, { passive: true });
  // When the button is clicked, smoothly scroll the window to the very top (position 0).
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- COPY EMAIL ---------- */
  // The COPY button next to the email address in the Contact section.
  // Find every copy button and set each one up separately.
  document.querySelectorAll('.copy-btn').forEach(btn => {
    // When a copy button is clicked, run this function. 'async' lets us use 'await' inside it to wait for the
    // clipboard.
    btn.addEventListener('click', async () => {
      // Read the text to copy from the button's data-copy attribute in the HTML (the email address).
      const text = btn.getAttribute('data-copy');
      // Try the modern way first. If anything fails, the 'catch' block below runs instead.
      try {
        // Copy the text to the user's clipboard and wait until that has finished.
        await navigator.clipboard.writeText(text);
        // Remember what the button said before (COPY) so we can restore it.
        const original = btn.textContent;
        // Change the button label to COPIED as feedback.
        btn.textContent = 'COPIED';
        // After 1800 milliseconds (1.8 seconds), put the original label back.
        setTimeout(() => { btn.textContent = original; }, 1800);
      // If copying was blocked (some browsers or non-secure pages refuse), do this instead:
      } catch (e) {
        // Open the user's email app addressed to this email address, so they can still reach me.
        window.location.href = 'mailto:' + text;
      }  // end of try/catch
    });  // end of the click handler
  });  // end of the loop over copy buttons

  /* ============================================================
     ARCHITECTURE DIAGRAM — SHEET 03
     ============================================================ */
  // Builds the clickable 8-layer system diagram. Each layer is a row that expands to show an explanation.
  // The content of the diagram: a list (array) of 8 layers. Each layer is an object with a title, a small subtitle,
  // and the explanation shown when the row is opened. To edit the diagram's text, change it here; no HTML is needed.
  const layers = [
    { title: 'Input', sub: 'DOCUMENTS / REQUESTS', detail: 'Raw PDFs, forms, uploads, or API requests enter the system — untrusted until proven otherwise.' },
    { title: 'Processing', sub: 'AI / EXTRACTION', detail: 'AI extracts structured candidates from unstructured input. Output at this stage is treated as a proposal, not a fact.' },
    { title: 'Validation', sub: 'ZOD SCHEMAS', detail: 'Schema validation acts as a firewall for data — malformed or unexpected values are rejected before they reach business logic.' },
    { title: 'Application Logic', sub: 'BUSINESS RULES', detail: 'Domain rules run only on data that has already passed validation.' },
    { title: 'Persistence', sub: 'SQLITE / POSTGRESQL', detail: 'Validated records are written to a relational store sized for the workload — SQLite for lightweight cases, PostgreSQL for multi-user systems.' },
    { title: 'Security', sub: 'AUTHENTICATION / AUTHORIZATION', detail: 'Every read or write is gated by identity and permission — the same discipline as enterprise RBAC and Entra ID work.' },
    { title: 'Reliability', sub: 'LOGGING / RETRIES / RATE LIMITS', detail: 'Failures are expected. Retries, backoff, and rate limiting keep the system stable under real-world conditions.' },
    { title: 'Audit', sub: 'TRACEABILITY / MONITORING', detail: 'Every consequential action is traceable — who did what, when, and to which record.' },
  ];  // end of the layers list

  // Find the empty container in the HTML where the rows will be placed.
  const layerStack = document.getElementById('layerStack');
  // Loop over the 8 layers. 'layer' is the current layer, 'i' is its position (0 for the first).
  layers.forEach((layer, i) => {
    // Create a new <div> element in memory (it is not on the page yet). It will be one clickable row.
    const row = document.createElement('div');
    // Give it the class 'layer' so the CSS styles it as a row.
    row.className = 'layer';
    // Make the row reachable with the Tab key (for keyboard users).
    row.setAttribute('tabindex', '0');
    // Tell screen readers this <div> behaves like a button.
    row.setAttribute('role', 'button');
    // Tell screen readers it starts collapsed.
    row.setAttribute('aria-expanded', 'false');
    // Fill the row with its content. The text between the backticks is a template: ${...} is replaced by real values.
    // Here that is the layer number (padded to 2 digits, like 01), the title, the subtitle, and a › arrow.
    row.innerHTML = `
      <span class="lnum">${String(i + 1).padStart(2, '0')}</span>
      <span class="ltitle">${layer.title}</span>
      <span class="lsub">${layer.sub}</span>
      <span class="lchevron">›</span>
    `;
    // Create a second <div> that will hold the explanation text shown when the row opens.
    const detail = document.createElement('div');
    // The class 'layer-detail' lets the CSS hide it until the row is opened.
    detail.className = 'layer-detail';
    // Put the layer's explanation inside a paragraph.
    detail.innerHTML = `<p>${layer.detail}</p>`;

    // Define what happens when the row is opened or closed.
    const toggle = () => {
      // Check whether the row is currently open (has the class 'open').
      const isOpen = row.classList.contains('open');
      // Flip the row: if it was open, remove 'open'; if it was closed, add it.
      row.classList.toggle('open', !isOpen);
      // Flip the explanation panel the same way so the two stay in sync.
      detail.classList.toggle('open', !isOpen);
      // Update the screen-reader state to match (String(...) turns true/false into the text 'true'/'false').
      row.setAttribute('aria-expanded', String(!isOpen));
    };  // end of the row toggle function
    // Clicking the row runs toggle.
    row.addEventListener('click', toggle);
    // Keyboard support: run this when a key is pressed while the row has focus.
    row.addEventListener('keydown', (e) => {
      // If the key is Enter or Space, stop the browser's default action (Space would scroll the page) and run toggle,
      // just like a click.
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });  // end of the keyboard handler

    // Put the finished row on the page, inside the container.
    layerStack.appendChild(row);
    // Put its explanation panel right after it.
    layerStack.appendChild(detail);
  });  // end of the loop over layers

  /* ============================================================
     PROFESSIONAL EXPERIENCE — SHEET 06
     ============================================================ */
  // Builds the expandable job history in the Professional Experience section.
  // The content of the timeline: a list of jobs, newest first. Each job is an object with: role (job title), org
  // (employer), dates, bullets (the achievements shown when expanded), an optional 'open' (true = starts expanded)
  // and an optional 'badge' (small label next to the title). To add or edit a job, change this list; the loop
  // further down builds the HTML from it.
  const experience = [
    {
      // Job 1: the FlyRank internship (starts expanded, carries the COMPLETED badge).
      role: 'Backend AI Engineering Intern', org: 'FlyRank (Remote) · Internship', dates: 'Jul 2026 – Oct 2026', open: true, badge: 'COMPLETED · INTERNSHIP',
      // 'bullets' is a list of text lines. Each string below becomes one bullet point when the job is expanded.
      bullets: [
        'Completed 15 practical assignments across API contracts, task design and prompting, retrieval and grounding, and evaluation and operations; the capstone, "Embeddable Widget & Lead-Capture Platform", was reviewed and accepted by the lead track mentor.',
        'Architected RESTful microservices using Node.js and Express to handle core API workflows, incorporating input validation middleware and OpenAPI 3.0 (Swagger) documentation.',
        'Engineered disk-backed relational database schemas in SQLite using parameterised SQL queries to eliminate injection vulnerabilities and maintain data persistence.',
        'Built authentication and authorisation pipelines leveraging Supabase Auth and custom JWT verification middleware to safeguard protected backend endpoints.',
        'Developed automated web scraping pipelines with Cheerio and Zod runtime schema validation to convert unstructured web data into type-safe JSON formats.',
        'Designed multi-model evaluation frameworks and 5-stage prompt ladders to benchmark response quality, token usage, and logical adherence across LLM architectures.'
      ]
    },
    {
      // Job 2: IT Consultant at Elike Trade Mart (current role).
      role: 'IT Consultant', org: 'Elike Trade Mart (Kenya)', dates: 'May 2018 – Present',
      bullets: [
        'Lead technical support and systems engineering for 500+ employees, managing Google Workspace and Microsoft Entra ID.',
        'Achieved a 20% reduction in average ticket response and resolution times by introducing diagnostic frameworks for hardware, software, and network failures.',
        'Designed and maintained an internal Knowledge Base, reducing routine support tickets by approximately 15% and streamlining user onboarding.',
        'Spearheaded training initiatives for software adoptions, boosting system utilisation rates by 30% across more than 2,500 interactions.'
      ]
    },
    {
      // Job 3: Darnov Technology.
      role: 'IT Network Technician', org: 'Darnov Technology (Kenya)', dates: 'Aug 2020 – Nov 2023',
      bullets: [
        'Maintained Windows Server environments, including Active Directory, DNS, DHCP, and secure file hosting, ensuring 99.9% uptime for business applications.',
        'Reduced network incidents by 25% by deploying network monitoring systems (Ubiquiti, Netgear, Cisco) and conducting scheduled firmware and security patching.',
        'Developed PowerShell automation scripts to handle routine administrative tasks, reducing manual system overhead.'
      ]
    },
    {
      // Job 4: Remotask (AI evaluation work).
      role: 'AI Data Quality Analyst & LLM Annotator', org: 'Remotask (Remote)', dates: 'Oct 2021 – Mar 2024',
      bullets: [
        'Executed evaluation, labelling, and validation processes for AI initiatives, specialising in multi-turn LLM safety testing and grounding.',
        'Conducted audits of LLM outputs to identify, catalogue, and resolve hallucinations, ensuring responses adhered to instructional logic and safety guidelines.',
        'Developed multi-turn prompt scenarios to test boundary limits and evaluate AI performance under edge-case parameters.',
        'Authored structured rationales detailing reasoning behind SxS evaluation ratings to support model alignment loops.'
      ]
    },
    {
      // Job 5: Hess Corporation / Collabera.
      role: 'IT Administrator (Contractor)', org: 'Hess Corporation / Collabera (Houston, TX / Hybrid)', dates: 'Jan 2017 – Dec 2017',
      bullets: [
        'Supported an enterprise environment of over 15,000 users operating on Windows platforms, maintaining strict SLA metrics.',
        'Led an Active Directory clean-up project, auditing and removing over 300,000 obsolete accounts and resources, achieving a documented 15% reduction in licensing costs while improving directory security.',
        'Configured and deployed Group Policy Objects (GPOs) to enforce security policies and standardise user profiles across divisions.',
        'Managed Exchange Online user resources, distribution listings, and migrations from on-premises Exchange architectures to Microsoft 365.',
        'Evaluated third-party software solutions to ensure alignment with internal security policies before deployment.'
      ]
    },
    {
      // Job 6: NCR Corporation / Shoening Technology.
      role: 'Customer Engineer (Contractor)', org: 'NCR Corporation / Shoening Technology (Houston, TX)', dates: 'Jul 2016 – Jan 2017',
      bullets: [
        'Maintained 98% uptime across regional banking ATM hardware and software clusters by delivering calibration and troubleshooting.',
        'Managed an average of 15 on-site service calls per week, exceeding target KPIs with a 95% first-visit resolution rate.',
        'Executed ATM operating system upgrades from Windows XP to Windows 7, verifying hardware compatibility, software integrity, and transactional security.',
        'Upgraded legacy magnetic stripe card readers with EMV chip card readers and software systems to satisfy regulatory compliance standards.'
      ]
    },
    {
      // Job 7: J.P. Morgan / Collabera.
      role: 'IT Help Desk Administrator (Contractor)', org: 'J.P. Morgan / Collabera (Houston, TX / Hybrid)', dates: 'Feb 2013 – Jun 2016',
      bullets: [
        'Contributed to an improvement in Tier-2 ticket resolution rates, elevating average SLA compliance from 70% to 98% through targeted troubleshooting and workflow optimisations.',
        'Assisted over 15,000 users across desktops and virtualised environments (Citrix VDI), managing and debugging remote sessions.',
        'Configured User Access Control, RBAC permissions, and directory structures to ensure compliance with financial and data privacy standards (including PCI DSS).',
        'Administered multi-factor authentication (MFA) tokens using the RSA Administration Tool, supporting secure networks.',
        'Managed mainframe access frameworks (including Rumba, AS400, TSO, ACF) and configured Virtual Telecommunications Access Method (VTAM) profiles.',
        'Investigated security escalations, documented exposure vectors, and coordinated directly with threat response units.'
      ]
    }
  ];  // end of the jobs list

  // Find the empty container in the HTML where the jobs will be placed.
  const expList = document.getElementById('expList');
  // Loop over every job. 'job' is the current job object, 'i' is its position.
  experience.forEach((job, i) => {
    // Create a <div> for this job.
    const item = document.createElement('div');
    // Give it the class 'exp-item' for styling.
    item.className = 'exp-item';
    // Make a unique id for this job's expandable body (exp-body-0, exp-body-1, ...). The header points to it so screen
    // readers know which panel it controls.
    const bodyId = 'exp-body-' + i;
    // Fill the job card with HTML built from the job's data: a clickable header (title, optional badge, employer,
    // dates) and a body with one <li> per bullet ('.map' turns each bullet into a list item and '.join('')' glues them
    // together). The body gets the class 'open' only if job.open is true.
    item.innerHTML = `
      <div class="exp-header" tabindex="0" role="button" aria-expanded="${job.open ? 'true' : 'false'}" aria-controls="${bodyId}">
        <div class="exp-role"><h4>${job.role}${job.badge ? ` <span class="exp-badge">${job.badge}</span>` : ''}</h4><div class="org">${job.org}</div></div>
        <div class="exp-dates">${job.dates}</div>
      </div>
      <div class="exp-body${job.open ? ' open' : ''}" id="${bodyId}">
        <ul>${job.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>
    `;
    // Grab the header from the card we just built...
    const header = item.querySelector('.exp-header');
    // ...and its expandable body.
    const body = item.querySelector('.exp-body');
    // Define what happens when the job header is clicked.
    const toggle = () => {
      // Is the body currently open?
      const isOpen = body.classList.contains('open');
      // Flip it open or closed (the CSS animates the height).
      body.classList.toggle('open', !isOpen);
      // Keep the screen-reader state in sync.
      header.setAttribute('aria-expanded', String(!isOpen));
    };  // end of the job toggle function
    // Clicking the header toggles the job.
    header.addEventListener('click', toggle);
    // Keyboard: run this when a key is pressed while the header has focus.
    header.addEventListener('keydown', (e) => {
      // Same keyboard support for the job header: Enter or Space toggles it (preventDefault stops Space from scrolling
      // the page).
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });  // end of the keyboard handler
    // Put the finished job card on the page.
    expList.appendChild(item);
  });  // end of the loop over jobs

  /* ============================================================
     GITHUB INTEGRATION — SHEET 10
     ============================================================ */
  // Fetches your public repositories from GitHub and shows them as cards. It runs in the visitor's browser, so new repos appear without editing the site.
  // Find the grid container where the repo cards (or a message) will be shown.
  const ghGrid = document.getElementById('ghGrid');
  // Your GitHub username. Change this one value to point the feed at a different account.
  const GH_USER = 'ernestmwangombe';

  // Helper function: turns a date like 2026-10-18 into friendly text such as '3d ago'.
  const timeAgo = (dateStr) => {
    // Work out how many milliseconds ago that date was (now minus then).
    const diff = Date.now() - new Date(dateStr).getTime();
    // Convert milliseconds to whole days (there are 86,400,000 ms in a day), rounding down.
    const days = Math.floor(diff / 86400000);
    // Less than a day ago: say 'today'.
    if (days < 1) return 'today';
    // Under 30 days: show days, for example '12d ago'.
    if (days < 30) return `${days}d ago`;
    // Otherwise convert to months (approximating 30 days per month).
    const months = Math.floor(days / 30);
    // Under 12 months: show months, for example '4mo ago'.
    if (months < 12) return `${months}mo ago`;
    // Otherwise show years, for example '2y ago'.
    return `${Math.floor(months / 12)}y ago`;
  };  // end of the timeAgo function

  // Ask GitHub's public API for your repos, most recently updated first, at most 8. 'fetch' returns a promise (a
  // result that arrives later), so we chain .then() steps to handle it when it does arrive.
  fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=8`)
    // Step 1: GitHub replied (res is the raw response).
    .then(res => {
      // If the reply is an error (for example rate-limited), throw an error. That jumps straight to the .catch() at the
      // bottom.
      if (!res.ok) throw new Error('GitHub API error: ' + res.status);
      // Otherwise read the reply body as JSON (structured data) and pass it to the next step.
      return res.json();
    })  // end of step 1
    // Step 2: we now have the list of repos.
    .then(repos => {
      // Remove forks (copies of other people's projects) and keep at most 8 repos.
      const visible = repos.filter(r => !r.fork).slice(0, 8);
      // If nothing is left (no public repos)...
      if (!visible.length) {
        // ...show a friendly 'no repositories yet' message in the grid...
        ghGrid.innerHTML = `<div class="gh-state">No public repositories found yet — check back soon, or view the profile directly.</div>`;
        // ...and stop here.
        return;
      }  // end of the empty-results check
      // Clear the 'Loading repositories...' message.
      ghGrid.innerHTML = '';
      // Build one card per repo.
      visible.forEach(repo => {
        // Create a link element (<a>) that will be the whole card.
        const card = document.createElement('a');
        // Clicking the card goes to the repo on GitHub.
        card.href = repo.html_url;
        // Open it in a new tab.
        card.target = '_blank';
        // 'noopener' is a security setting for links that open new tabs.
        card.rel = 'noopener';
        // Give it the class 'gh-card' for styling.
        card.className = 'gh-card';
        // Fill the card: repo name, description (or 'No description provided.' if empty), language (or a dash), star
        // count, fork count, and how long ago it was last pushed (using timeAgo).
        card.innerHTML = `
          <div class="gh-name">${repo.name}</div>
          <div class="gh-desc">${repo.description ? repo.description : 'No description provided.'}</div>
          <div class="gh-meta">
            <span>${repo.language ? repo.language : '—'}</span>
            <span>★ ${repo.stargazers_count}</span>
            <span>⑂ ${repo.forks_count}</span>
            <span>Updated ${timeAgo(repo.pushed_at)}</span>
          </div>
        `;
        // Add the card to the grid.
        ghGrid.appendChild(card);
      });  // end of the loop over repos
    })  // end of step 2
    // If anything above failed (no internet, GitHub rate limit, and so on), this runs instead. The rest of the site
    // keeps working.
    .catch(() => {
      // Show a friendly error message with a link to your GitHub profile.
      ghGrid.innerHTML = `<div class="gh-state">Couldn't load live repository data right now. <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener" style="color:var(--steel)">View the GitHub profile directly ↗</a></div>`;
    });  // end of the error handler

  /* ============================================================
     CONTACT FORM (mailto — no backend configured)
     ============================================================ */
  // The Contact form has no server behind it, so submitting opens the visitor's email app with a message pre-filled.
  // Find the contact form.
  const form = document.getElementById('contactForm');
  // Find the small text line under the form where success and error messages appear.
  const status = document.getElementById('formStatus');
  // When the form is submitted, run this function (e is the event object).
  form.addEventListener('submit', (e) => {
    // Stop the browser's default form behaviour (reloading the page).
    e.preventDefault();
    // Read what the visitor typed in the Name field; trim() removes spaces at either end.
    const name = form.name.value.trim();
    // Same for the Email field.
    const email = form.email.value.trim();
    // Same for the Message field.
    const message = form.message.value.trim();
    // If any field is empty...
    if (!name || !email || !message) {
      // ...colour the status message copper (a warning colour)...
      status.style.color = 'var(--copper)';
      // ...ask them to fill everything in...
      status.textContent = 'Please fill in all fields.';
      // ...and stop; do not open the email app.
      return;
    }  // end of the empty-field check
    // Build the email subject. encodeURIComponent makes the text safe to put inside a link (spaces and symbols are
    // escaped).
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    // Build the email body: their message, a blank line, then their name and email. '\n' means a new line.
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    // Open a mailto: link addressed to you, with the subject and body filled in. The visitor's email app takes over.
    window.location.href = `mailto:ernestmwangombe254@gmail.com?subject=${subject}&body=${body}`;
    // Colour the status message green (a success colour)...
    status.style.color = 'var(--ok)';
    // ...and tell the visitor what is happening.
    status.textContent = 'Opening your email client…';
  });  // end of the submit handler

});  // end of the DOMContentLoaded function: the whole script runs inside it

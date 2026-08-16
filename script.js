// ============================================================
// ERNEST MLATI MWANG'OMBE — PORTFOLIO SCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MOBILE NAV ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- ACTIVE NAV HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const highlightNav = () => {
    let currentId = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- BACK TO TOP ---------- */
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- COPY EMAIL ---------- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = 'COPIED';
        setTimeout(() => { btn.textContent = original; }, 1800);
      } catch (e) {
        window.location.href = 'mailto:' + text;
      }
    });
  });

  /* ============================================================
     ARCHITECTURE DIAGRAM — SHEET 03
     ============================================================ */
  const layers = [
    { title: 'Input', sub: 'DOCUMENTS / REQUESTS', detail: 'Raw PDFs, forms, uploads, or API requests enter the system — untrusted until proven otherwise.' },
    { title: 'Processing', sub: 'AI / EXTRACTION', detail: 'AI extracts structured candidates from unstructured input. Output at this stage is treated as a proposal, not a fact.' },
    { title: 'Validation', sub: 'ZOD SCHEMAS', detail: 'Schema validation acts as a firewall for data — malformed or unexpected values are rejected before they reach business logic.' },
    { title: 'Application Logic', sub: 'BUSINESS RULES', detail: 'Domain rules run only on data that has already passed validation.' },
    { title: 'Persistence', sub: 'SQLITE / POSTGRESQL', detail: 'Validated records are written to a relational store sized for the workload — SQLite for lightweight cases, PostgreSQL for multi-user systems.' },
    { title: 'Security', sub: 'AUTHENTICATION / AUTHORIZATION', detail: 'Every read or write is gated by identity and permission — the same discipline as enterprise RBAC and Entra ID work.' },
    { title: 'Reliability', sub: 'LOGGING / RETRIES / RATE LIMITS', detail: 'Failures are expected. Retries, backoff, and rate limiting keep the system stable under real-world conditions.' },
    { title: 'Audit', sub: 'TRACEABILITY / MONITORING', detail: 'Every consequential action is traceable — who did what, when, and to which record.' },
  ];

  const layerStack = document.getElementById('layerStack');
  layers.forEach((layer, i) => {
    const row = document.createElement('div');
    row.className = 'layer';
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    row.setAttribute('aria-expanded', 'false');
    row.innerHTML = `
      <span class="lnum">${String(i + 1).padStart(2, '0')}</span>
      <span class="ltitle">${layer.title}</span>
      <span class="lsub">${layer.sub}</span>
      <span class="lchevron">›</span>
    `;
    const detail = document.createElement('div');
    detail.className = 'layer-detail';
    detail.innerHTML = `<p>${layer.detail}</p>`;

    const toggle = () => {
      const isOpen = row.classList.contains('open');
      row.classList.toggle('open', !isOpen);
      detail.classList.toggle('open', !isOpen);
      row.setAttribute('aria-expanded', String(!isOpen));
    };
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    layerStack.appendChild(row);
    layerStack.appendChild(detail);
  });

  /* ============================================================
     PROFESSIONAL EXPERIENCE — SHEET 06
     ============================================================ */
  const experience = [
    {
      role: 'Backend AI Engineer', org: 'FlyRank (Remote) · Internship', dates: 'Jun 2026 – Present', open: true, badge: 'CURRENT · INTERNSHIP',
      bullets: [
        'Architected RESTful microservices using Node.js and Express to handle core API workflows, incorporating input validation middleware and OpenAPI 3.0 (Swagger) documentation.',
        'Engineered disk-backed relational database schemas in SQLite using parameterised SQL queries to eliminate injection vulnerabilities and maintain data persistence.',
        'Built authentication and authorisation pipelines leveraging Supabase Auth and custom JWT verification middleware to safeguard protected backend endpoints.',
        'Developed automated web scraping pipelines with Cheerio and Zod runtime schema validation to convert unstructured web data into type-safe JSON formats.',
        'Designed multi-model evaluation frameworks and 5-stage prompt ladders to benchmark response quality, token usage, and logical adherence across LLM architectures.'
      ]
    },
    {
      role: 'IT Consultant', org: 'Elike Trade Mart (Kenya)', dates: 'May 2018 – Present',
      bullets: [
        'Lead technical support and systems engineering for 500+ employees, managing Google Workspace and Microsoft Entra ID.',
        'Achieved a 20% reduction in average ticket response and resolution times by introducing diagnostic frameworks for hardware, software, and network failures.',
        'Designed and maintained an internal Knowledge Base, reducing routine support tickets by approximately 15% and streamlining user onboarding.',
        'Spearheaded training initiatives for software adoptions, boosting system utilisation rates by 30% across more than 2,500 interactions.'
      ]
    },
    {
      role: 'IT Network Technician', org: 'Darnov Technology (Kenya)', dates: 'Aug 2020 – Nov 2023',
      bullets: [
        'Maintained Windows Server environments, including Active Directory, DNS, DHCP, and secure file hosting, ensuring 99.9% uptime for business applications.',
        'Reduced network incidents by 25% by deploying network monitoring systems (Ubiquiti, Netgear, Cisco) and conducting scheduled firmware and security patching.',
        'Developed PowerShell automation scripts to handle routine administrative tasks, reducing manual system overhead.'
      ]
    },
    {
      role: 'AI Data Quality Analyst & LLM Annotator', org: 'Remotask (Remote)', dates: 'Oct 2021 – Mar 2024',
      bullets: [
        'Executed evaluation, labelling, and validation processes for AI initiatives, specialising in multi-turn LLM safety testing and grounding.',
        'Conducted audits of LLM outputs to identify, catalogue, and resolve hallucinations, ensuring responses adhered to instructional logic and safety guidelines.',
        'Developed multi-turn prompt scenarios to test boundary limits and evaluate AI performance under edge-case parameters.',
        'Authored structured rationales detailing reasoning behind SxS evaluation ratings to support model alignment loops.'
      ]
    },
    {
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
      role: 'Customer Engineer (Contractor)', org: 'NCR Corporation / Shoening Technology (Houston, TX)', dates: 'Jul 2016 – Jan 2017',
      bullets: [
        'Maintained 98% uptime across regional banking ATM hardware and software clusters by delivering calibration and troubleshooting.',
        'Managed an average of 15 on-site service calls per week, exceeding target KPIs with a 95% first-visit resolution rate.',
        'Executed ATM operating system upgrades from Windows XP to Windows 7, verifying hardware compatibility, software integrity, and transactional security.',
        'Upgraded legacy magnetic stripe card readers with EMV chip card readers and software systems to satisfy regulatory compliance standards.'
      ]
    },
    {
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
  ];

  const expList = document.getElementById('expList');
  experience.forEach((job, i) => {
    const item = document.createElement('div');
    item.className = 'exp-item';
    const bodyId = 'exp-body-' + i;
    item.innerHTML = `
      <div class="exp-header" tabindex="0" role="button" aria-expanded="${job.open ? 'true' : 'false'}" aria-controls="${bodyId}">
        <div class="exp-role"><h4>${job.role}${job.badge ? ` <span class="exp-badge">${job.badge}</span>` : ''}</h4><div class="org">${job.org}</div></div>
        <div class="exp-dates">${job.dates}</div>
      </div>
      <div class="exp-body${job.open ? ' open' : ''}" id="${bodyId}">
        <ul>${job.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>
    `;
    const header = item.querySelector('.exp-header');
    const body = item.querySelector('.exp-body');
    const toggle = () => {
      const isOpen = body.classList.contains('open');
      body.classList.toggle('open', !isOpen);
      header.setAttribute('aria-expanded', String(!isOpen));
    };
    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    expList.appendChild(item);
  });

  /* ============================================================
     GITHUB INTEGRATION — SHEET 10
     ============================================================ */
  const ghGrid = document.getElementById('ghGrid');
  const GH_USER = 'ernestmwangombe';

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days < 1) return 'today';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
  };

  fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=6`)
    .then(res => {
      if (!res.ok) throw new Error('GitHub API error: ' + res.status);
      return res.json();
    })
    .then(repos => {
      const visible = repos.filter(r => !r.fork).slice(0, 6);
      if (!visible.length) {
        ghGrid.innerHTML = `<div class="gh-state">No public repositories found yet — check back soon, or view the profile directly.</div>`;
        return;
      }
      ghGrid.innerHTML = '';
      visible.forEach(repo => {
        const card = document.createElement('a');
        card.href = repo.html_url;
        card.target = '_blank';
        card.rel = 'noopener';
        card.className = 'gh-card';
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
        ghGrid.appendChild(card);
      });
    })
    .catch(() => {
      ghGrid.innerHTML = `<div class="gh-state">Couldn't load live repository data right now. <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener" style="color:var(--steel)">View the GitHub profile directly ↗</a></div>`;
    });

  /* ============================================================
     CONTACT FORM (mailto — no backend configured)
     ============================================================ */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      status.style.color = 'var(--copper)';
      status.textContent = 'Please fill in all fields.';
      return;
    }
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:ernestmwangombe254@gmail.com?subject=${subject}&body=${body}`;
    status.style.color = 'var(--ok)';
    status.textContent = 'Opening your email client…';
  });

});

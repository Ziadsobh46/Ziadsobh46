/* ==========================================================================
   SECTIONS — each function renders one section from window.PORTFOLIO
   ========================================================================== */

(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const G = window.PortfolioGraphics;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const SYSTEM_LABELS = {
    hvac: "HVAC",
    fire: "Fire Fighting",
    plumbing: "Plumbing",
    medgas: "Medical Gas",
    machinery: "Machinery",
    smoke: "Smoke & Ventilation"
  };

  const icon = {
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 6.5 12 13l8.5-6.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21s-6.5-6.1-6.5-11.2A6.5 6.5 0 0 1 18.5 9.8C18.5 14.9 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="9.8" r="2.3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    external: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M17 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function sectionHead(num, label, title, lead) {
    return `
      <div class="section-head reveal">
        <div class="section-index label"><span class="num">${num}</span><span class="rule" aria-hidden="true"></span><span>${esc(label)}</span></div>
        <h2 class="section-title">${title}</h2>
        ${lead ? `<p class="section-lead">${lead}</p>` : ""}
      </div>`;
  }

  function sysDot(key) {
    return `<span class="sys-dot" style="--c: var(--sys-${key})" aria-hidden="true"></span>`;
  }

  /* ---------------------------------------------------------------- Hero */
  function hero() {
    const p = D.profile;
    return `
    <section class="hero" id="hero" aria-labelledby="hero-title">
      <div class="hero-grid-bg" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="label hero-eyebrow reveal">Mechanical · BIM · Technical Office</p>
          <h1 class="hero-title reveal" id="hero-title">${esc(p.name)}</h1>
          <p class="hero-role reveal">${esc(p.title)}<span class="hero-role-sub">${esc(p.subtitle)}</span></p>
          <p class="hero-intro reveal">${esc(p.intro)}</p>
          <div class="hero-actions reveal">
            <a class="btn btn-primary" href="#projects">View My Projects ${icon.arrow}</a>
            <a class="btn btn-ghost" href="${esc(p.cv)}" download>Download CV ${icon.download}</a>
            <a class="btn btn-link" href="#contact">Contact Me</a>
          </div>
          <dl class="hero-meta reveal">
            <div><dt class="label">Current</dt><dd>BEC Arabia LLC · Technical Office</dd></div>
            <div><dt class="label">Core tools</dt><dd>Revit MEP · Navisworks</dd></div>
          </dl>
        </div>

        <figure class="hero-visual reveal" aria-label="Illustrative 3D coordination view of mechanical systems">
          <div class="viewport">
            <div class="viewport-bar">
              <span class="viewport-tab"><span class="mono">{3D}</span> Mechanical Coordination</span>
              <span class="viewport-cube" aria-hidden="true">${G.viewCube()}</span>
            </div>
            <div class="viewport-canvas">
              <svg class="iso-scene" role="img" aria-label="Isometric model showing supply air duct, sprinkler piping, domestic water and medical gas lines with a coordination marker"></svg>
            </div>
            <div class="viewport-foot">
              <ul class="legend">
                <li>${sysDot("hvac")}HVAC</li>
                <li>${sysDot("fire")}Fire Fighting</li>
                <li>${sysDot("plumbing")}Plumbing</li>
                <li>${sysDot("medgas")}Medical Gas</li>
              </ul>
              <span class="label">Illustrative</span>
            </div>
          </div>
        </figure>
      </div>
    </section>`;
  }

  /* ---------------------------------------------------------- Highlights */
  function highlights() {
    return `
    <section class="highlights" aria-label="Professional highlights">
      <div class="container">
        <ul class="stats">
          ${D.highlights
            .map(
              (h, i) => `
            <li class="stat reveal" style="--d:${i * 70}ms">
              <span class="stat-value">${esc(h.value)}</span>
              <span class="stat-label">${esc(h.label)}</span>
              <span class="stat-note">${esc(h.note)}</span>
            </li>`
            )
            .join("")}
        </ul>
      </div>
    </section>`;
  }

  /* --------------------------------------------------------------- About */
  function about() {
    const a = D.about;
    return `
    <section class="section" id="about" aria-labelledby="about-title">
      <div class="container">
        ${sectionHead("01", "About", '<span id="about-title">Mechanical engineer working where design meets coordination.</span>')}
        <div class="about-grid">
          <div class="about-copy reveal">
            ${a.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
            <ul class="focus-list" aria-label="Areas of focus">
              ${a.focus.map((f) => `<li>${esc(f)}</li>`).join("")}
            </ul>
          </div>
          <aside class="spec-card reveal" aria-label="Profile summary">
            <div class="spec-card-head">
              <span class="label">Profile</span>
              <span class="label">${esc(D.profile.fullName)}</span>
            </div>
            <dl class="spec-list">
              ${a.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("")}
            </dl>
          </aside>
        </div>
      </div>
    </section>`;
  }

  /* ---------------------------------------------------------- Experience */
  function experience() {
    return `
    <section class="section section-alt" id="experience" aria-labelledby="experience-title">
      <div class="container">
        ${sectionHead("02", "Experience", '<span id="experience-title">Professional experience</span>', "Technical office, BIM and MEP design roles across contractor, BIM services and consultancy environments.")}
        <ol class="timeline">
          ${D.experience
            .map(
              (e) => `
            <li class="tl-item reveal${e.current ? " is-current" : ""}">
              <div class="tl-marker" aria-hidden="true"><span></span></div>
              <div class="tl-date">
                <span class="mono">${esc(e.period)}</span>
                ${e.current ? '<span class="badge badge-live">Current</span>' : ""}
              </div>
              <article class="tl-card">
                <header class="tl-head">
                  <div>
                    <h3 class="tl-role">${esc(e.role)}</h3>
                    <p class="tl-company">${esc(e.company)}</p>
                  </div>
                  <p class="tl-where label">${[e.unit, e.location].filter(Boolean).map(esc).join(" · ")}</p>
                </header>
                <ul class="bullets">
                  ${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}
                </ul>
                ${
                  e.projects.length
                    ? `<div class="tl-projects"><span class="label">Projects</span><ul>${e.projects
                        .map((pr) => `<li>${esc(pr)}</li>`)
                        .join("")}</ul></div>`
                    : ""
                }
              </article>
            </li>`
            )
            .join("")}
        </ol>
      </div>
    </section>`;
  }

  /* ------------------------------------------------------------ Projects */
  function projectCard(p, i) {
    const code = String(i + 1).padStart(2, "0");
    const systems = p.systems.length
      ? p.systems.map((s) => `<li>${sysDot(s)}${esc(SYSTEM_LABELS[s])}</li>`).join("")
      : `<li>${sysDot("mech")}${esc(p.systemsNote)}</li>`;
    const meta = [p.company, p.location].filter(Boolean).map(esc).join('<span class="sep" aria-hidden="true">/</span>');
    return `
      <article class="project-card reveal${i === 0 ? " is-featured" : ""}" data-filters="${esc(p.filters.join(" "))}" style="--d:${(i % 3) * 70}ms">
        <div class="project-visual">
          ${G.planGraphic(p, code)}
          ${p.company === "Training" ? '<span class="badge badge-training">Training</span>' : ""}
        </div>
        <div class="project-body">
          <p class="project-meta label">${meta}</p>
          <h3 class="project-title">${esc(p.name)}</h3>
          ${p.type ? `<p class="project-type">${esc(p.type)}</p>` : ""}
          <dl class="project-facts">
            <div><dt class="label">Role</dt><dd>${esc(p.role)}</dd></div>
            <div><dt class="label">Systems</dt><dd><ul class="sys-list">${systems}</ul></dd></div>
          </dl>
          <ul class="bullets bullets-sm">
            ${p.contribution.map((c) => `<li>${esc(c)}</li>`).join("")}
          </ul>
          <ul class="tags" aria-label="Tags">
            ${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}
          </ul>
        </div>
      </article>`;
  }

  function projects() {
    const count = (key) => (key === "all" ? D.projects.length : D.projects.filter((p) => p.filters.includes(key)).length);
    return `
    <section class="section" id="projects" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-head-row">
          ${sectionHead("03", "Projects", '<span id="projects-title">Selected projects</span>', "Mechanical BIM modeling, coordination and drawing production on projects in Saudi Arabia, the UAE and Egypt, plus design training projects.")}
          <p class="project-count label reveal"><span class="mono" data-project-count>${D.projects.length}</span> / ${D.projects.length} projects shown</p>
        </div>
        <div class="filters reveal" role="group" aria-label="Filter projects">
          ${D.projectFilters
            .map(
              (f, i) =>
                `<button type="button" class="filter${i === 0 ? " is-active" : ""}" data-filter="${esc(f.key)}" aria-pressed="${i === 0}">${esc(f.label)}<span class="filter-count">${count(f.key)}</span></button>`
            )
            .join("")}
        </div>
        <div class="project-grid">
          ${D.projects.map(projectCard).join("")}
          <aside class="project-cta reveal" data-project-cta>
            <span class="label">Full record</span>
            <h3>Complete project descriptions and responsibilities are in my CV.</h3>
            <a class="btn btn-ghost" href="${esc(D.profile.cv)}" download>Download CV ${icon.download}</a>
          </aside>
        </div>
        <p class="footnote reveal">Project graphics are abstract illustrations of the systems involved, not project drawings.</p>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------- Expertise */
  function expertise() {
    return `
    <section class="section section-alt" id="expertise" aria-labelledby="expertise-title">
      <div class="container">
        ${sectionHead("04", "BIM / MEP Expertise", '<span id="expertise-title">Systems, coordination and tools</span>', "Grouped by the way the work is actually done: the systems, the BIM process, the engineering behind it and the software used.")}
        <div class="expertise-grid">
          ${D.expertise
            .map(
              (g, i) => `
            <div class="skill-group reveal${i === 0 ? " skill-group-systems" : ""}" style="--d:${i * 70}ms">
              <div class="skill-head">
                <span class="skill-code mono">${esc(g.code)}</span>
                <h3>${esc(g.title)}</h3>
              </div>
              <p class="skill-intro">${esc(g.intro)}</p>
              ${
                i === 0
                  ? `<ul class="system-tiles">${g.items
                      .map(
                        (it) => `<li style="--c: var(--sys-${it.system})"><span class="system-line" aria-hidden="true"></span><span>${esc(it.name)}</span></li>`
                      )
                      .join("")}</ul>`
                  : `<ul class="chips">${g.items.map((it) => `<li>${esc(it.name)}</li>`).join("")}</ul>`
              }
            </div>`
            )
            .join("")}
          <div class="skill-group skill-group-lang reveal">
            <div class="skill-head">
              <span class="skill-code mono">LNG</span>
              <h3>Languages</h3>
            </div>
            <ul class="lang-list">
              ${D.languages.map((l) => `<li><span>${esc(l.name)}</span><span class="label">${esc(l.level)}</span></li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    </section>`;
  }

  /* ------------------------------------------------------------ Workflow */
  function workflow() {
    return `
    <section class="section" id="workflow" aria-labelledby="workflow-title">
      <div class="container">
        ${sectionHead("05", "Engineering Workflow", '<span id="workflow-title">How the work moves from design to data</span>', "A visual summary of the type of work I perform across projects — from reviewing design to handing over as-built information. It reflects my experience, not a formal methodology.")}
        <ol class="workflow">
          ${D.workflow
            .map(
              (w, i) => `
            <li class="wf-step reveal" style="--d:${(i % 4) * 60}ms">
              <div class="wf-node" aria-hidden="true"><span class="mono">${String(i + 1).padStart(2, "0")}</span></div>
              <div class="wf-body">
                <h3>${esc(w.title)}</h3>
                <p>${esc(w.text)}</p>
                <p class="wf-applied"><span class="label">Applied on</span> ${esc(w.applied)}</p>
              </div>
            </li>`
            )
            .join("")}
        </ol>
      </div>
    </section>`;
  }

  /* ---------------------------------------------------------- Automation */
  function automation() {
    const a = D.automation;
    return `
    <section class="section section-alt" id="automation" aria-labelledby="automation-title">
      <div class="container">
        ${sectionHead("06", "BIM Automation", '<span id="automation-title">Automating repetitive BIM work</span>', "Alongside project delivery, I am developing tools that speed up detailed MEP modeling in Revit.")}
        <article class="auto-card reveal">
          <div class="auto-visual">${G.supportsElevation()}</div>
          <div class="auto-body">
            <div class="auto-head">
              <h3>${esc(a.title)}</h3>
              <span class="badge badge-dev">${esc(a.status)}</span>
            </div>
            <p class="auto-summary">${esc(a.summary)}</p>
            <div class="auto-scope">
              <span class="label">Scope</span>
              <ul class="sys-list">${a.scope.map((x) => `<li>${sysDot(x.system)}${esc(x.name)}</li>`).join("")}</ul>
            </div>
            <div class="auto-why">
              <span class="label">Why it matters</span>
              <p>${esc(a.why)}</p>
            </div>
          </div>
        </article>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------- Education */
  function education() {
    const e = D.education;
    return `
    <section class="section" id="education" aria-labelledby="education-title">
      <div class="container">
        ${sectionHead("07", "Education & Development", '<span id="education-title">Education and professional development</span>')}
        <div class="edu-grid">
          <article class="edu-card reveal">
            <div class="edu-card-head">
              <span class="label">Education</span>
              <span class="mono edu-date">${esc(e.date)}</span>
            </div>
            <h3 class="edu-degree">${esc(e.degree)}</h3>
            <p class="edu-school">${esc(e.school)}</p>
            <dl class="edu-specs">
              <div><dt class="label">Grade</dt><dd>${esc(e.grade)}</dd></div>
              <div><dt class="label">Project grade</dt><dd>${esc(e.projectGrade)}</dd></div>
            </dl>
            <div class="edu-project">
              <span class="label">Graduation project</span>
              <p>${esc(e.project)}</p>
              ${G.desalinationSchematic()}
            </div>
          </article>

          <div class="courses">
            <p class="label courses-label reveal">Courses &amp; professional development</p>
            ${D.courses
              .map(
                (c) => `
              <article class="course-card reveal">
                <div class="course-head">
                  <div>
                    <h3>${esc(c.title)}</h3>
                    <p class="course-provider">${esc(c.provider)}</p>
                  </div>
                  <span class="mono course-date">${esc(c.period)}</span>
                </div>
                <p class="course-text">${esc(c.text)}</p>
                ${c.points.length ? `<ul class="bullets bullets-sm">${c.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>` : ""}
                <ul class="tags tags-quiet" aria-label="Software covered">${c.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
              </article>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>`;
  }

  /* ------------------------------------------------------------- Contact */
  function contact() {
    const p = D.profile;
    const items = [
      { icon: icon.mail, label: "Email", value: p.email, href: `mailto:${p.email}` },
      { icon: icon.linkedin, label: "LinkedIn", value: "Ziad Khaled Sobh", href: p.linkedin, ext: true },
      p.showPhone ? { icon: icon.phone, label: "Phone", value: p.phone, href: `tel:${p.phone.replace(/\s+/g, "")}` } : null,
      { icon: icon.pin, label: "Location", value: p.location }
    ].filter(Boolean);

    return `
    <section class="section section-alt" id="contact" aria-labelledby="contact-title">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            ${sectionHead("08", "Contact", '<span id="contact-title">Get in touch.</span>', "Open to Mechanical BIM, MEP coordination and technical office opportunities. The quickest way to reach me is by email or LinkedIn.")}
            <ul class="contact-list reveal">
              ${items
                .map((it) => {
                  const inner = `<span class="contact-icon">${it.icon}</span><span class="contact-text"><span class="label">${it.label}</span><span class="contact-value">${esc(it.value)}</span></span>${it.ext ? `<span class="contact-ext">${icon.external}</span>` : ""}`;
                  return it.href
                    ? `<li><a class="contact-item" href="${esc(it.href)}"${it.ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${inner}</a></li>`
                    : `<li><div class="contact-item">${inner}</div></li>`;
                })
                .join("")}
            </ul>
            <a class="btn btn-ghost reveal" href="${esc(p.cv)}" download>Download CV (PDF) ${icon.download}</a>
          </div>

          <form class="contact-form reveal" id="contact-form" novalidate>
            <div class="form-head">
              <span class="label">Send a message</span>
              <span class="label">Opens your email app</span>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="cf-name">Name</label>
                <input id="cf-name" name="name" type="text" autocomplete="name" required>
              </div>
              <div class="field">
                <label for="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" autocomplete="email" required>
              </div>
            </div>
            <div class="field">
              <label for="cf-company">Company <span class="optional">(optional)</span></label>
              <input id="cf-company" name="company" type="text" autocomplete="organization">
            </div>
            <div class="field">
              <label for="cf-message">Message</label>
              <textarea id="cf-message" name="message" rows="5" required></textarea>
            </div>
            <div class="form-foot">
              <p class="form-status" role="status" aria-live="polite"></p>
              <button class="btn btn-primary" type="submit">Send Message ${icon.arrow}</button>
            </div>
          </form>
        </div>
      </div>
    </section>`;
  }

  /* -------------------------------------------------------------- Footer */
  function footer() {
    const p = D.profile;
    return `
      <div class="container footer-inner">
        <p>© ${new Date().getFullYear()} ${esc(p.name)} · ${esc(p.title)}</p>
        <div class="footer-links">
          <a href="mailto:${esc(p.email)}">Email</a>
          <a href="${esc(p.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="${esc(p.cv)}" download>CV</a>
          <a href="#hero">Back to top</a>
        </div>
      </div>`;
  }

  /* -------------------------------------------------------------- Mount */
  document.getElementById("main").innerHTML = [
    hero(),
    highlights(),
    about(),
    experience(),
    projects(),
    expertise(),
    workflow(),
    automation(),
    education(),
    contact()
  ].join("");
  document.getElementById("footer").innerHTML = footer();

  G.isoScene(document.querySelector(".iso-scene"));
})();

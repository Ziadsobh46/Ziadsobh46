/* ==========================================================================
   MAIN — interactions: header, mobile nav, active section, reveal,
   project filters, back-to-top, contact form
   ========================================================================== */

(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const backToTop = document.querySelector(".back-to-top");

  /* ---------- Header state + back-to-top ---------- */
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 12);
    backToTop.classList.toggle("is-visible", y > window.innerHeight * 0.9);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });
  window.matchMedia("(min-width: 1141px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* ---------- Active navigation link ---------- */
  const links = Array.from(nav.querySelectorAll("ul a"));
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  function updateActive() {
    const line = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    sections.forEach((s) => { if (s.offsetTop <= line) current = s; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
    links.forEach((a) => {
      const on = current && a.getAttribute("href") === "#" + current.id;
      a.classList.toggle("is-active", !!on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);
  updateActive();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((n) => io.observe(n));
  } else {
    revealEls.forEach((n) => n.classList.add("is-visible"));
  }

  /* ---------- Project filters ---------- */
  const filterBtns = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".project-card");
  const countEl = document.querySelector("[data-project-count]");
  const grid = document.querySelector(".project-grid");
  const cta = document.querySelector("[data-project-cta]");
  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const key = btn.dataset.filter;
      filterBtns.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      let shown = 0;
      cards.forEach((card) => {
        const match = key === "all" || card.dataset.filters.split(" ").includes(key);
        card.hidden = !match;
        if (match) { shown++; card.classList.add("is-visible"); }
      });
      if (countEl) countEl.textContent = shown;
      grid.classList.toggle("is-filtered", key !== "all");
      if (cta) cta.hidden = key !== "all";
    })
  );

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  const form = document.getElementById("contact-form");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const company = String(data.get("company") || "").trim();
      const message = String(data.get("message") || "").trim();

      let firstInvalid = null;
      form.querySelectorAll("[required]").forEach((f) => {
        const bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.closest(".field").classList.toggle("has-error", bad);
        f.setAttribute("aria-invalid", String(bad));
        if (bad && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) {
        status.textContent = "Please complete the highlighted fields.";
        status.className = "form-status is-error";
        firstInvalid.focus();
        return;
      }

      const to = window.PORTFOLIO.profile.email;
      const subject = `Portfolio enquiry from ${name}${company ? " — " + company : ""}`;
      const body = `${message}\n\n—\n${name}\n${email}${company ? "\n" + company : ""}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Your email app should open with the message ready to send.";
      status.className = "form-status is-ok";
    });
    form.addEventListener("input", (e) => {
      const f = e.target.closest(".field");
      if (f && f.classList.contains("has-error") && e.target.value.trim()) {
        f.classList.remove("has-error");
        e.target.setAttribute("aria-invalid", "false");
      }
    });
  }
})();

/* ==========================================================================
   GRAPHICS — abstract BIM / MEP illustrations drawn as inline SVG
   - isoScene:     isometric "3D view" for the hero
   - planGraphic:  plan-view placeholder for each project card
   - viewCube:     small Revit-style view cube
   - desalinationSchematic: concept line diagram for the graduation project
   None of these are real project drawings.
   ========================================================================== */

(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";

  const COLORS = {
    hvac: "#4C9BE8",
    fire: "#E05A4F",
    plumbing: "#3DB38A",
    medgas: "#D9A441",
    machinery: "#9C8FE3",
    smoke: "#8FA6BD",
    mech: "#7FB8DA",
    tray: "#C9A27A"
  };
  const LINE = "rgba(150,178,205,0.22)";
  const LINE_SOFT = "rgba(150,178,205,0.10)";
  const INK = "#0A0E13";
  const MUTED = "#7D8B9C";

  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* ------------------------------------------------------------------
     Isometric hero scene
     ------------------------------------------------------------------ */
  function isoScene(svg) {
    if (!svg) return;
    const k = 26;
    const c = Math.cos(Math.PI / 6);
    const s = 0.5;
    const b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

    const P = (x, y, z) => {
      const X = (x - y) * c * k;
      const Y = (x + y) * s * k - z * k;
      b.minX = Math.min(b.minX, X); b.maxX = Math.max(b.maxX, X);
      b.minY = Math.min(b.minY, Y); b.maxY = Math.max(b.maxY, Y);
      return [X, Y];
    };
    const pts = (list) => list.map((p) => P(p[0], p[1], p[2]).map((n) => n.toFixed(1)).join(",")).join(" ");

    const root = el("g", {}, svg);
    const L = {
      floor: el("g", { class: "iso-floor" }, root),
      grid: el("g", { class: "iso-grid" }, root),
      struct: el("g", { class: "iso-struct" }, root),
      mep: el("g", { class: "iso-mep" }, root),
      top: el("g", { class: "iso-top" }, root),
      notes: el("g", { class: "iso-notes" }, root)
    };

    const W = 12, D = 9, H = 4.2;

    // Floor slab
    el("polygon", { points: pts([[0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0]]), fill: "rgba(127,184,218,0.035)", stroke: LINE, "stroke-width": 1 }, L.floor);
    el("polygon", { points: pts([[0, D, 0], [W, D, 0], [W, D, -0.35], [0, D, -0.35]]), fill: "rgba(127,184,218,0.05)", stroke: LINE, "stroke-width": 1 }, L.floor);
    el("polygon", { points: pts([[W, 0, 0], [W, D, 0], [W, D, -0.35], [W, 0, -0.35]]), fill: "rgba(127,184,218,0.08)", stroke: LINE, "stroke-width": 1 }, L.floor);
    // Fine floor grid
    for (let x = 1; x < W; x++) el("polyline", { points: pts([[x, 0, 0], [x, D, 0]]), stroke: LINE_SOFT, "stroke-width": 0.6, fill: "none" }, L.floor);
    for (let y = 1; y < D; y++) el("polyline", { points: pts([[0, y, 0], [W, y, 0]]), stroke: LINE_SOFT, "stroke-width": 0.6, fill: "none" }, L.floor);

    // Structural grid lines + bubbles
    const gridX = [[0, "1"], [6, "2"], [12, "3"]];
    const gridY = [[0, "A"], [4.5, "B"], [9, "C"]];
    const bubble = (x, y, label) => {
      const [X, Y] = P(x, y, 0);
      el("circle", { cx: X, cy: Y, r: 13, fill: INK, stroke: MUTED, "stroke-width": 1 }, L.grid);
      const t = el("text", { x: X, y: Y + 4.4, "text-anchor": "middle", class: "iso-label", fill: "#B3C0CD" }, L.grid);
      t.textContent = label;
    };
    gridX.forEach(([x, lab]) => {
      el("polyline", { points: pts([[x, -1.4, 0], [x, D + 0.8, 0]]), stroke: MUTED, "stroke-width": 0.8, "stroke-dasharray": "10 3 2 3", fill: "none", opacity: 0.7 }, L.grid);
      bubble(x, -1.9, lab);
    });
    gridY.forEach(([y, lab]) => {
      el("polyline", { points: pts([[-1.4, y, 0], [W + 0.8, y, 0]]), stroke: MUTED, "stroke-width": 0.8, "stroke-dasharray": "10 3 2 3", fill: "none", opacity: 0.7 }, L.grid);
      bubble(-1.9, y, lab);
    });

    // Box helper (top, +x face, +y face)
    function box(g, a, z, color, o) {
      o = o || {};
      const [x0, y0, z0] = a, [x1, y1, z1] = z;
      const stroke = o.stroke || color;
      const common = { stroke, "stroke-width": o.sw || 0.8, "stroke-linejoin": "round" };
      el("polygon", Object.assign({ points: pts([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]]), fill: color, "fill-opacity": o.f1 != null ? o.f1 : 0.35 }, common), g);
      el("polygon", Object.assign({ points: pts([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]]), fill: color, "fill-opacity": o.f2 != null ? o.f2 : 0.55 }, common), g);
      el("polygon", Object.assign({ points: pts([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]), fill: color, "fill-opacity": o.f3 != null ? o.f3 : 0.8 }, common), g);
    }

    // Columns (back row / left row only, so they never hide the services)
    [[0, 0], [6, 0], [12, 0], [0, 4.5], [0, 9]].forEach(([x, y]) =>
      box(L.struct, [x - 0.25, y - 0.25, 0], [x + 0.25, y + 0.25, H], "#6F8398", { f1: 0.14, f2: 0.22, f3: 0.35, stroke: "rgba(170,190,210,0.35)", sw: 0.7 })
    );

    // Pipe helper — dark underlay + coloured line, animated draw-in
    function pipe(g, list, color, w, extra) {
      const d = "M" + list.map((p) => P(p[0], p[1], p[2]).map((n) => n.toFixed(1)).join(" ")).join(" L");
      el("path", { d, stroke: INK, "stroke-width": w + 3, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
      return el("path", Object.assign({ d, stroke: color, "stroke-width": w, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", class: "draw" }, extra || {}), g);
    }

    // Plumbing — domestic water main + riser (back of room)
    pipe(L.mep, [[0.6, 1.1, 2.9], [11, 1.1, 2.9], [11, 1.1, 0.2]], COLORS.plumbing, 2.4);
    pipe(L.mep, [[4, 1.1, 2.9], [4, 1.1, 1.2]], COLORS.plumbing, 2);
    pipe(L.mep, [[8, 1.1, 2.9], [8, 1.1, 1.2]], COLORS.plumbing, 2);

    // HVAC — supply air main duct + branches + diffusers
    box(L.mep, [0.4, 2.2, 3.05], [11.6, 3.1, 3.6], COLORS.hvac);
    [3.2, 8.4].forEach((x) => {
      box(L.mep, [x - 0.3, 3.1, 3.15], [x + 0.3, x > 8 ? 8.6 : 7.4, 3.5], COLORS.hvac, { f1: 0.3, f2: 0.5, f3: 0.72 });
    });
    [[3.2, 5.2], [3.2, 7.0], [8.4, 5.2], [8.4, 7.2]].forEach(([x, y]) =>
      box(L.mep, [x - 0.45, y - 0.45, 2.98], [x + 0.45, y + 0.45, 3.08], "#A7CBEA", { f1: 0.4, f2: 0.5, f3: 0.7, stroke: "#A7CBEA", sw: 0.6 })
    );

    // Medical gas — runs through the room at duct level (creates the clash)
    pipe(L.mep, [[0.8, 8.2, 3.35], [11.2, 8.2, 3.35]], COLORS.medgas, 1.8);
    [3.8, 6.8].forEach((x) => {
      pipe(L.mep, [[x, 8.2, 3.35], [x, 8.2, 1.5]], COLORS.medgas, 1.6);
      box(L.mep, [x - 0.3, 8.1, 1.1], [x + 0.3, 8.3, 1.5], COLORS.medgas, { f1: 0.3, f2: 0.45, f3: 0.6, sw: 0.6 });
    });

    // Fire fighting — sprinkler main above ducts + branches + heads
    pipe(L.top, [[0.3, 5.9, 3.9], [11.7, 5.9, 3.9]], COLORS.fire, 2.6);
    [1.8, 4.8, 7.8, 10.8].forEach((x) => {
      pipe(L.top, [[x, 3.6, 3.9], [x, 8.8, 3.9]], COLORS.fire, 1.7);
      [4.2, 7.6].forEach((y) => {
        pipe(L.top, [[x, y, 3.9], [x, y, 3.62]], COLORS.fire, 1.4);
        const [X, Y] = P(x, y, 3.58);
        el("circle", { cx: X, cy: Y, r: 2.2, fill: COLORS.fire }, L.top);
      });
    });

    // Ceiling outline — hidden-line style
    el("polygon", { points: pts([[0, 0, H], [W, 0, H], [W, D, H], [0, D, H]]), fill: "none", stroke: "rgba(150,178,205,0.28)", "stroke-width": 0.8, "stroke-dasharray": "4 4" }, L.top);
    [[0, 0], [W, 0], [W, D], [0, D]].forEach(([x, y]) =>
      el("polyline", { points: pts([[x, y, 0], [x, y, H]]), fill: "none", stroke: "rgba(150,178,205,0.16)", "stroke-width": 0.8, "stroke-dasharray": "4 4" }, L.top)
    );

    // Clash marker where the medical gas line passes through the branch duct
    const [cx, cy] = P(8.4, 8.2, 3.35);
    el("circle", { cx, cy, r: 20, fill: "none", stroke: "#E2B65C", "stroke-width": 1, class: "clash-pulse" }, L.notes);
    el("circle", { cx, cy, r: 13, fill: "rgba(226,182,92,0.10)", stroke: "#E2B65C", "stroke-width": 1.4, "stroke-dasharray": "3 3" }, L.notes);
    el("polyline", { points: `${cx + 13},${cy + 9} ${cx + 44},${cy + 30} ${cx + 118},${cy + 30}`, fill: "none", stroke: "#E2B65C", "stroke-width": 0.9 }, L.notes);
    const ct = el("text", { x: cx + 48, y: cy + 25, class: "iso-note", fill: "#E2B65C" }, L.notes);
    ct.textContent = "CLASH · MG / SA";
    P(12, 11.4, 0); // reserve room for the note

    // LOD tag on the main duct
    const [tx, ty] = P(11.6, 2.65, 3.6);
    el("polyline", { points: `${tx - 2},${ty - 6} ${tx + 26},${ty - 40} ${tx + 44},${ty - 40}`, fill: "none", stroke: "#B3C0CD", "stroke-width": 0.8 }, L.notes);
    el("rect", { x: tx + 44, y: ty - 51, width: 64, height: 22, rx: 3, fill: INK, stroke: "#B3C0CD", "stroke-width": 0.9 }, L.notes);
    const lt = el("text", { x: tx + 76, y: ty - 36.5, "text-anchor": "middle", class: "iso-note", fill: "#E8EDF2" }, L.notes);
    lt.textContent = "LOD 500";
    b.maxX = Math.max(b.maxX, tx + 112);
    b.minY = Math.min(b.minY, ty - 56);

    const pad = 14;
    svg.setAttribute("viewBox", `${(b.minX - pad).toFixed(0)} ${(b.minY - pad).toFixed(0)} ${(b.maxX - b.minX + pad * 2).toFixed(0)} ${(b.maxY - b.minY + pad * 2).toFixed(0)}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Draw-in animation for pipes
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      svg.querySelectorAll("path.draw").forEach((p, i) => {
        const len = Math.ceil(p.getTotalLength());
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.style.transition = `stroke-dashoffset 1.4s cubic-bezier(.22,.61,.36,1) ${300 + i * 45}ms`;
      });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => svg.querySelectorAll("path.draw").forEach((p) => (p.style.strokeDashoffset = 0)))
      );
    }
  }

  /* ------------------------------------------------------------------
     Plan-view placeholder for project cards (deterministic per project)
     ------------------------------------------------------------------ */
  function seeded(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () {
      h += 0x6d2b79f5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function planGraphic(p, code) {
    const rnd = seeded(p.id);
    const R = (a, b) => a + (b - a) * rnd();
    const W = 480, H = 270;
    const x0 = 58, x1 = 450, y0 = 52, y1 = 226;
    const out = [];
    const uid = "pg-" + p.id;

    out.push(`<svg class="plan" viewBox="0 0 ${W} ${H}" role="img" aria-label="Abstract plan-view illustration for ${p.name}" preserveAspectRatio="xMidYMid meet">`);
    out.push(`<defs><pattern id="${uid}-g" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="${LINE_SOFT}" stroke-width="0.6"/></pattern></defs>`);
    out.push(`<rect width="${W}" height="${H}" fill="url(#${uid}-g)"/>`);

    // Structural grid
    const cols = 4, rows = 3;
    const gx = Array.from({ length: cols }, (_, i) => x0 + ((x1 - x0) / (cols - 1)) * i);
    const gy = Array.from({ length: rows }, (_, i) => y0 + ((y1 - y0) / (rows - 1)) * i);
    gx.forEach((x, i) => {
      out.push(`<line x1="${x}" y1="30" x2="${x}" y2="${H - 14}" stroke="${MUTED}" stroke-width="0.7" stroke-dasharray="9 3 2 3" opacity=".55"/>`);
      out.push(`<circle cx="${x}" cy="20" r="9" fill="${INK}" stroke="${MUTED}" stroke-width=".8"/><text x="${x}" y="23.3" text-anchor="middle" class="plan-label">${i + 1}</text>`);
    });
    gy.forEach((y, i) => {
      out.push(`<line x1="34" y1="${y}" x2="${W - 12}" y2="${y}" stroke="${MUTED}" stroke-width="0.7" stroke-dasharray="9 3 2 3" opacity=".55"/>`);
      out.push(`<circle cx="22" cy="${y}" r="9" fill="${INK}" stroke="${MUTED}" stroke-width=".8"/><text x="22" y="${y + 3.3}" text-anchor="middle" class="plan-label">${String.fromCharCode(65 + i)}</text>`);
    });

    // Walls and partitions
    out.push(`<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="rgba(127,184,218,0.025)" stroke="rgba(200,215,230,0.38)" stroke-width="2.2"/>`);
    const px = [R(x0 + 70, gx[1] + 20), R(gx[2] - 10, x1 - 60)];
    const py = R(y0 + 50, y1 - 50);
    out.push(`<line x1="${px[0]}" y1="${y0}" x2="${px[0]}" y2="${py}" stroke="rgba(200,215,230,0.26)" stroke-width="1.4"/>`);
    out.push(`<line x1="${px[1]}" y1="${py}" x2="${px[1]}" y2="${y1}" stroke="rgba(200,215,230,0.26)" stroke-width="1.4"/>`);
    out.push(`<line x1="${x0}" y1="${py}" x2="${x1 - R(40, 120)}" y2="${py}" stroke="rgba(200,215,230,0.26)" stroke-width="1.4"/>`);
    gx.forEach((x) => gy.forEach((y) => out.push(`<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="rgba(170,190,210,0.28)" stroke="rgba(200,215,230,0.45)" stroke-width=".6"/>`)));

    // Point cloud scatter
    if (p.filters.includes("pointcloud")) {
      for (let i = 0; i < 380; i++) {
        const x = R(x0 - 10, x1 + 10), y = R(y0 - 10, y1 + 10);
        out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R(0.4, 1.1).toFixed(2)}" fill="#C9D6E3" opacity="${R(0.12, 0.4).toFixed(2)}"/>`);
      }
    }

    // Systems
    const systems = p.systems.length ? p.systems : ["mech", "mech"];
    const n = systems.length;
    const lod = p.filters.includes("lod500");
    systems.forEach((sys, i) => {
      const col = COLORS[sys] || COLORS.mech;
      const y = y0 + ((y1 - y0) / (n + 1)) * (i + 1) + R(-6, 6);
      const xs = x0 + R(14, 40), xe = x1 - R(14, 40);
      const branchCount = 2 + Math.floor(R(0, 3));
      const dir = i % 2 === 0 ? 1 : -1;

      if (sys === "hvac" || sys === "smoke" || (sys === "mech" && i === 0)) {
        // Duct: double line
        const w = sys === "hvac" ? 9 : 7;
        out.push(`<rect x="${xs}" y="${y - w / 2}" width="${xe - xs}" height="${w}" fill="${col}" fill-opacity=".16" stroke="${col}" stroke-width="1.1"/>`);
        for (let bI = 0; bI < branchCount; bI++) {
          const bx = xs + ((xe - xs) / (branchCount + 1)) * (bI + 1);
          const len = R(22, 42) * dir;
          const yA = dir > 0 ? y + w / 2 : y - w / 2 + len;
          out.push(`<rect x="${bx - 3}" y="${Math.min(yA, yA + Math.abs(len))}" width="6" height="${Math.abs(len)}" fill="${col}" fill-opacity=".14" stroke="${col}" stroke-width=".9"/>`);
          const ey = dir > 0 ? y + w / 2 + len : y - w / 2 + len;
          out.push(`<rect x="${bx - 6}" y="${ey - 6}" width="12" height="12" fill="none" stroke="${col}" stroke-width=".9"/><path d="M${bx - 6} ${ey - 6}L${bx + 6} ${ey + 6}M${bx + 6} ${ey - 6}L${bx - 6} ${ey + 6}" stroke="${col}" stroke-width=".6"/>`);
        }
      } else {
        const dash = sys === "medgas" ? ' stroke-dasharray="6 3"' : "";
        const sw = sys === "fire" ? 1.8 : 1.5;
        out.push(`<path d="M${xs} ${y}H${xe}" stroke="${col}" stroke-width="${sw}" fill="none"${dash}/>`);
        for (let bI = 0; bI < branchCount + 1; bI++) {
          const bx = xs + ((xe - xs) / (branchCount + 2)) * (bI + 1);
          const len = R(18, 38) * dir;
          out.push(`<path d="M${bx} ${y}V${y + len}" stroke="${col}" stroke-width="${sw - 0.4}" fill="none"${dash}/>`);
          if (sys === "fire") {
            out.push(`<circle cx="${bx}" cy="${y + len * 0.5}" r="2.2" fill="${col}"/><circle cx="${bx}" cy="${y + len}" r="2.2" fill="${col}"/>`);
          } else if (sys === "machinery") {
            out.push(`<rect x="${bx - 9}" y="${y + len - (dir > 0 ? 0 : 12)}" width="18" height="12" fill="${col}" fill-opacity=".18" stroke="${col}" stroke-width=".9"/>`);
          } else {
            out.push(`<circle cx="${bx}" cy="${y + len}" r="2.6" fill="${INK}" stroke="${col}" stroke-width="1.1"/>`);
          }
          if (lod) out.push(`<rect x="${bx - 2.5}" y="${y - 2.5}" width="5" height="5" fill="${INK}" stroke="${col}" stroke-width=".9"/>`);
        }
      }
      // hanger ticks for fabrication-level detail
      if (lod) {
        for (let hx = xs + 12; hx < xe; hx += 26) out.push(`<path d="M${hx} ${y - 8}v-4" stroke="${col}" stroke-width=".7" opacity=".7"/>`);
      }
    });

    // Coordination marker
    if (p.filters.includes("coordination")) {
      const mx = R(gx[1] - 10, gx[2] + 10), my = R(y0 + 30, y1 - 30);
      out.push(`<circle cx="${mx}" cy="${my}" r="12" fill="rgba(226,182,92,0.10)" stroke="#E2B65C" stroke-width="1.1" stroke-dasharray="3 3"/>`);
    }

    // Title strip
    out.push(`<g class="plan-title"><rect x="${W - 132}" y="${H - 34}" width="120" height="22" fill="${INK}" stroke="rgba(150,178,205,0.3)" stroke-width=".8"/>`);
    out.push(`<line x1="${W - 94}" y1="${H - 34}" x2="${W - 94}" y2="${H - 12}" stroke="rgba(150,178,205,0.3)" stroke-width=".8"/>`);
    out.push(`<text x="${W - 113}" y="${H - 19.5}" text-anchor="middle" class="plan-label plan-strong">${code}</text>`);
    out.push(`<text x="${W - 53}" y="${H - 19.5}" text-anchor="middle" class="plan-label">${lod ? "LOD 500" : "SCHEMATIC"}</text></g>`);
    out.push(`</svg>`);
    return out.join("");
  }

  /* ------------------------------------------------------------------
     Small Revit-style view cube for the viewport bar
     ------------------------------------------------------------------ */
  function viewCube() {
    return `<svg viewBox="0 0 40 40" width="30" height="30"><g fill="none" stroke="#7D8B9C" stroke-width="1" stroke-linejoin="round">
      <path d="M20 5 34 12.5 20 20 6 12.5Z" fill="rgba(127,184,218,0.16)"/>
      <path d="M6 12.5V27.5L20 35V20Z" fill="rgba(127,184,218,0.06)"/>
      <path d="M34 12.5V27.5L20 35V20Z" fill="rgba(127,184,218,0.1)"/></g>
      <text x="20" y="14.6" text-anchor="middle" font-size="5.2" fill="#B3C0CD" font-family="IBM Plex Mono, monospace">TOP</text></svg>`;
  }

  /* ------------------------------------------------------------------
     Concept line diagram — humidification-based solar desalination
     ------------------------------------------------------------------ */
  function desalinationSchematic() {
    const box = (x, label) =>
      `<rect x="${x}" y="22" width="92" height="40" rx="3" fill="rgba(127,184,218,0.05)" stroke="rgba(150,178,205,0.4)"/>
       <text x="${x + 46}" y="46" text-anchor="middle" class="plan-label">${label}</text>`;
    const arrow = (x) =>
      `<path d="M${x} 42h22" stroke="#7FB8DA" stroke-width="1.2"/><path d="M${x + 22} 42l-5-3.2v6.4z" fill="#7FB8DA"/>`;
    return `<svg class="edu-schematic" viewBox="0 0 400 84" role="img" aria-label="Concept diagram: solar energy, air humidification, condensation, fresh water">
      <circle cx="18" cy="42" r="9" fill="none" stroke="#D9A441" stroke-width="1.3"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return `<path d="M${(18 + Math.cos(r) * 12).toFixed(1)} ${(42 + Math.sin(r) * 12).toFixed(1)}L${(18 + Math.cos(r) * 15).toFixed(1)} ${(42 + Math.sin(r) * 15).toFixed(1)}" stroke="#D9A441" stroke-width="1.2"/>`;
      }).join("")}
      ${arrow(36)}${box(62, "HUMIDIFY")}${arrow(158)}${box(184, "CONDENSE")}${arrow(280)}
      <path d="M322 30c0 0-12 13-12 20a12 12 0 0 0 24 0c0-7-12-20-12-20z" fill="rgba(61,179,138,0.16)" stroke="#3DB38A" stroke-width="1.3"/>
      <text x="362" y="46" text-anchor="middle" class="plan-label">WATER</text>
      <text x="18" y="76" text-anchor="middle" class="plan-label plan-dim">SOLAR</text>
    </svg>`;
  }

  /* ------------------------------------------------------------------
     Elevation: duct, pipe and cable tray hung from a slab on supports
     ------------------------------------------------------------------ */
  function supportsElevation() {
    const W = 520, H = 330, x0 = 30, x1 = W - 30;
    const ROD = "#B3C0CD";
    const o = [];
    o.push(`<svg class="supports-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Illustrative elevation of a duct, a pipe and a cable tray hung from a slab on regularly spaced supports">`);
    o.push(`<defs><pattern id="slab-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8" stroke="${LINE}" stroke-width="1"/></pattern></defs>`);
    o.push(`<rect x="20" y="24" width="${W - 40}" height="26" fill="url(#slab-hatch)" stroke="rgba(200,215,230,0.4)" stroke-width="1.2"/>`);
    o.push(`<text x="24" y="17" class="plan-label plan-dim">SLAB</text>`);

    // Each system has its own support line, staggered so rods never pass through other services
    const runs = [
      { y: 90, h: 36, col: COLORS.hvac, label: "DUCT", kind: "duct", xs: [60, 170, 280, 390], half: 26 },
      { y: 170, h: 14, col: COLORS.plumbing, label: "PIPE", kind: "pipe", xs: [115, 225, 335, 445] },
      { y: 228, h: 16, col: COLORS.tray, label: "CABLE TRAY", kind: "tray", xs: [88, 198, 308, 418], half: 10 }
    ];
    // Rods first (drawn behind the services)
    runs.forEach((r) => r.xs.forEach((x) => {
      if (r.kind === "pipe") {
        o.push(`<path d="M${x} 50V${r.y - 4}" stroke="${ROD}" stroke-width="1.2"/>`);
      } else {
        const bottom = r.y + r.h + 4;
        [x - r.half, x + r.half].forEach((rx) => o.push(`<path d="M${rx} 50V${bottom}" stroke="${ROD}" stroke-width="1.2"/>`));
      }
    }));
    // Services, opaque so nothing reads through them
    runs.forEach((r) => {
      const w = x1 - x0;
      if (r.kind === "duct") o.push(`<rect x="${x0}" y="${r.y}" width="${w}" height="${r.h}" fill="${INK}"/><rect x="${x0}" y="${r.y}" width="${w}" height="${r.h}" fill="${r.col}" fill-opacity=".2" stroke="${r.col}" stroke-width="1.4"/>`);
      if (r.kind === "pipe") o.push(`<rect x="${x0}" y="${r.y}" width="${w}" height="${r.h}" rx="${r.h / 2}" fill="${INK}"/><rect x="${x0}" y="${r.y}" width="${w}" height="${r.h}" rx="${r.h / 2}" fill="${r.col}" fill-opacity=".24" stroke="${r.col}" stroke-width="1.4"/>`);
      if (r.kind === "tray") o.push(`<rect x="${x0}" y="${r.y}" width="${w}" height="${r.h}" fill="${INK}"/><path d="M${x0} ${r.y}V${r.y + r.h}H${x1}V${r.y}" fill="${r.col}" fill-opacity=".12" stroke="${r.col}" stroke-width="1.4"/>`);
      o.push(`<text x="${x1 - 4}" y="${r.y - 6}" text-anchor="end" class="plan-label" style="fill:${r.col}">${r.label}</text>`);
    });
    // Support hardware on top: trapeze bars and pipe clamps
    runs.forEach((r) => r.xs.forEach((x) => {
      if (r.kind === "pipe") {
        o.push(`<circle cx="${x}" cy="${r.y + r.h / 2}" r="${r.h / 2 + 3.5}" fill="none" stroke="${ROD}" stroke-width="1.3"/>`);
      } else {
        const bottom = r.y + r.h + 4;
        o.push(`<path d="M${x - r.half - 8} ${bottom}H${x + r.half + 8}" stroke="${ROD}" stroke-width="2.6"/>`);
      }
    }));
    // Support tags on the duct supports + spacing dimension
    const d = runs[0].xs;
    d.forEach((x, i) => o.push(`<circle cx="${x}" cy="${H - 22}" r="9" fill="${INK}" stroke="#7FB8DA" stroke-width="1"/><text x="${x}" y="${H - 18.6}" text-anchor="middle" class="plan-label">S${i + 1}</text><path d="M${x} ${H - 31}V${H - 62}" stroke="#7FB8DA" stroke-width=".6" stroke-dasharray="2 3"/>`));
    const dy = H - 52;
    o.push(`<path d="M${d[1]} ${dy}H${d[2]}M${d[1]} ${dy - 5}v10M${d[2]} ${dy - 5}v10" stroke="#7D8B9C" stroke-width="1"/>`);
    o.push(`<text x="${(d[1] + d[2]) / 2}" y="${dy - 7}" text-anchor="middle" class="plan-label plan-dim">SPACING</text>`);
    o.push(`</svg>`);
    return o.join("");
  }

  window.PortfolioGraphics = { isoScene, planGraphic, viewCube, desalinationSchematic, supportsElevation, COLORS };
})();

// Côte à Côte - guide de première visite
// Affiche des bulles pas à pas la première fois qu'on ouvre une page.
// "Je connais déjà le site" ou "Ne plus afficher" coupe le guide partout.
// Le lien "Revoir le guide" (pied de page) le relance.

const GUIDES = {
  index: [
    { titre: "Bienvenue sur Côte à Côte !",
      texte: "Côte à Côte réunit associations et bénévoles pour protéger le littoral de la rade de Brest. Voici une visite rapide en quelques étapes.",
      accueil: true },
    { sel: ".nav-main", titre: "La carte des événements",
      texte: "Retrouvez ici tous les ramassages et sorties autour de la rade, et inscrivez-vous en un clic." },
    { sel: ".side-nav-col", titre: "Filtrer les discussions",
      texte: "Choisissez une catégorie ou un mot-clé pour n'afficher que les sujets qui vous intéressent. Un deuxième clic retire le filtre." },
    { sel: "#threads .thread", titre: "Le fil des discussions",
      texte: "Échangez avec la communauté. Cliquez sur l'étoile d'une discussion pour la retrouver dans « Mes favoris »." },
    { sel: "#new-post", titre: "Lancer une discussion",
      texte: "Une question, une idée d'action ? Créez une nouvelle discussion (connexion nécessaire)." },
    { sel: ".events-col", titre: "Les prochains événements",
      texte: "Cliquez sur un événement pour le voir directement sur la carte." },
    { sel: ".header .actions", titre: "Votre compte",
      texte: "Créez un compte ou connectez-vous pour publier et retrouver vos inscriptions." }
  ],
  carte: [
    { sel: ".map-list", titre: "Les événements de la rade",
      texte: "Cliquez sur un événement de la liste : la carte se centre dessus. Les places restantes sont indiquées." },
    { sel: ".map-wrap", titre: "La carte interactive",
      texte: "Chaque repère numéroté est un événement. Cliquez dessus pour voir la date, le lieu et le lien d'inscription." },
    { sel: ".map-item a", titre: "S'inscrire",
      texte: "« Voir et s'inscrire » ouvre la fiche de l'événement avec le formulaire d'inscription." }
  ],
  publication: [
    { sel: ".pub-main", titre: "La fiche de l'événement",
      texte: "Le programme et les conseils pour bien préparer votre venue." },
    { sel: ".rdv", titre: "Le rendez-vous et l'inscription",
      texte: "Date, lieu et places restantes. Remplissez votre nom et votre mail puis cliquez sur « Je m'inscris ». Vous pourrez annuler à tout moment." }
  ]
};

const guide = (() => {
  const KEY_OFF = "cac-guide-off";
  const KEY_DONE = "cac-guide-done";
  const page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
  let steps = [], i = 0, overlay, spot, pop, target = null;

  const get = k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const del = k => { try { localStorage.removeItem(k); } catch {} };

  function markDone() {
    const done = get(KEY_DONE) || [];
    if (!done.includes(page)) set(KEY_DONE, [...done, page]);
  }

  function build() {
    overlay = document.createElement("div");
    overlay.className = "guide-overlay";
    spot = document.createElement("div");
    spot.className = "guide-spot";
    pop = document.createElement("div");
    pop.className = "guide-pop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-live", "polite");
    document.body.append(overlay, spot, pop);
    overlay.addEventListener("click", () => close());
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });
    document.addEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (!pop) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft" && i > 0) show(i - 1);
  }

  function show(n) {
    i = n;
    const s = steps[i];
    target = s.sel ? document.querySelector(s.sel) : null;
    if (s.sel && !target) { return i < steps.length - 1 ? show(i + 1) : close(); }

    const last = i === steps.length - 1;
    pop.className = "guide-pop" + (target ? "" : " center");
    pop.innerHTML = `
      <button class="guide-x" aria-label="Fermer le guide">&times;</button>
      ${s.accueil ? "" : `<div class="guide-step">Étape ${i + 1} sur ${steps.length}</div>`}
      <h3>${s.titre}</h3>
      <p>${s.texte}</p>
      ${s.accueil ? `
        <div class="guide-actions">
          <button class="btn btn-light" data-g="off">Je connais déjà le site</button>
          <button class="btn btn-teal" data-g="next">Commencer la visite</button>
        </div>` : `
        <div class="guide-dots">${steps.map((_, k) => `<span class="${k === i ? "on" : ""}"></span>`).join("")}</div>
        <div class="guide-actions">
          <button class="guide-link" data-g="off">Ne plus afficher</button>
          ${i > 0 ? `<button class="btn btn-light" data-g="prev">Précédent</button>` : ""}
          <button class="btn btn-teal" data-g="next">${last ? "Terminer" : "Suivant"}</button>
        </div>`}`;
    pop.querySelector(".guide-x").onclick = () => close();
    pop.querySelectorAll("[data-g]").forEach(b => b.onclick = () => {
      const a = b.dataset.g;
      if (a === "next") last ? close() : show(i + 1);
      if (a === "prev") show(i - 1);
      if (a === "off") { set(KEY_OFF, true); close(); }
    });

    if (target) target.scrollIntoView({ block: "center" });
    place();
    requestAnimationFrame(place);
    pop.querySelector('[data-g="next"]').focus({ preventScroll: true });
  }

  function place() {
    if (!pop) return;
    if (!target) {
      spot.style.display = "none";
      overlay.classList.add("dim");
      pop.style.left = pop.style.top = "";
      return;
    }
    overlay.classList.remove("dim");
    const r = target.getBoundingClientRect(), pad = 8, gap = 14;
    Object.assign(spot.style, {
      display: "block", left: `${r.left - pad}px`, top: `${r.top - pad}px`,
      width: `${r.width + pad * 2}px`, height: `${r.height + pad * 2}px`
    });
    const pw = pop.offsetWidth, ph = pop.offsetHeight, vw = innerWidth, vh = innerHeight;
    const clampX = x => Math.max(12, Math.min(x, vw - pw - 12));
    const clampY = y => Math.max(12, Math.min(y, vh - ph - 12));
    let top, left;
    if (r.bottom + pad + gap + ph <= vh - 12) {            // dessous
      top = r.bottom + pad + gap; left = clampX(r.left + r.width / 2 - pw / 2);
    } else if (r.top - pad - gap - ph >= 12) {             // dessus
      top = r.top - pad - gap - ph; left = clampX(r.left + r.width / 2 - pw / 2);
    } else if (r.right + pad + gap + pw <= vw - 12) {      // à droite
      left = r.right + pad + gap; top = clampY(Math.max(r.top, 12));
    } else if (r.left - pad - gap - pw >= 12) {            // à gauche
      left = r.left - pad - gap - pw; top = clampY(Math.max(r.top, 12));
    } else {                                               // par-dessus, en bas de l'écran
      left = clampX(r.left + r.width / 2 - pw / 2); top = vh - ph - 16;
    }
    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
  }

  function close() {
    markDone();
    [overlay, spot, pop].forEach(el => el && el.remove());
    overlay = spot = pop = target = null;
    window.removeEventListener("resize", place);
    window.removeEventListener("scroll", place);
    document.removeEventListener("keydown", onKey);
  }

  function start(force) {
    steps = GUIDES[page] || [];
    if (!steps.length || pop) return;
    if (!force && (get(KEY_OFF) || (get(KEY_DONE) || []).includes(page))) return;
    build();
    show(0);
  }

  function restart() {
    if (pop) close();
    del(KEY_OFF);
    del(KEY_DONE);
    start(true);
  }

  return { start, restart };
})();

window.addEventListener("load", () => {
  setTimeout(() => guide.start(false), 400);
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-guide-restart]");
    if (!a) return;
    e.preventDefault();
    window.scrollTo(0, 0);
    guide.restart();
  });
});

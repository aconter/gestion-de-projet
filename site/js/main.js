// Côte à Côte - maquette : données de démonstration et interactions

const EVENTS = [
  {
    id: 1, categorie: "Actions locales", titre: "Nettoyons le littoral",
    resume: "Une collecte pour préserver la plage et sensibiliser aux déchets marins.",
    intro: "Une collecte pour préserver la plage et sensibiliser aux déchets marins. Retrouvons-nous au Moulin Blanc pour agir ensemble, à notre échelle.",
    dateCourte: "Sam. 28 nov. · 10 h – 12 h", dateLongue: "Samedi 28 novembre 2026", heure: "10 h – 12 h",
    lieu: "Plage du Moulin Blanc", commune: "Brest", precision: "À l'entrée de la plage du Moulin Blanc.",
    programme: ["10 h · Accueil et présentation des consignes", "10 h 15 · Collecte en petits groupes sur la plage", "11 h 30 · Tri des déchets et bilan collectif"],
    avant: "Prévoyez des chaussures fermées, des gants réutilisables et une gourde. Ne touchez pas aux objets coupants ou suspects : signalez-les à l'équipe.",
    eyebrow: "Plage des 3 moulins", lat: 48.3946, lng: -4.4305
  },
  {
    id: 2, categorie: "Réseau associatif", titre: "Le café des associations",
    resume: "Échangeons sur nos missions et les besoins de nos équipes.",
    intro: "Échangeons sur nos missions et les besoins de nos équipes. Ce rendez-vous convivial est l'occasion de faire connaissance et de construire de nouvelles actions autour de la rade.",
    dateCourte: "Dim. 29 nov. · 10 h 30 – 12 h", dateLongue: "Dimanche 29 novembre 2026", heure: "10 h 30 – 12 h",
    lieu: "Port du Fret", commune: "Crozon", precision: "Sur le quai du port du Fret.",
    programme: ["10 h 30 · Tour de table des associations", "11 h · Partage des projets et besoins bénévoles", "11 h 45 · Idées d'actions communes"],
    avant: "Venez avec vos idées, vos questions et, si vous le souhaitez, une courte présentation de votre association. La rencontre est ouverte aux bénévoles et aux curieux.",
    eyebrow: "LE RENDEZ-VOUS", lat: 48.2856, lng: -4.5052
  },
  {
    id: 3, categorie: "Vie marine", titre: "Observer sans déranger",
    resume: "Partageons les bons gestes pour respecter la faune du littoral.",
    intro: "Partageons les bons gestes pour respecter la faune du littoral. Une sortie d'observation pour découvrir le vivant, en restant à distance et en limitant notre impact.",
    dateCourte: "Sam. 5 déc. · 9 h – 11 h", dateLongue: "Samedi 5 décembre 2026", heure: "9 h – 11 h",
    lieu: "Pointe de l'Armorique", commune: "Plougastel", precision: "Au départ du sentier de la pointe de l'Armorique.",
    programme: ["9 h · Accueil et lecture du paysage", "9 h 30 · Observation depuis le sentier côtier", "10 h 30 · Échanges sur les espèces aperçues"],
    avant: "Apportez vos jumelles si vous en avez et des vêtements adaptés à la météo. Restez sur les sentiers, gardez vos distances et ne nourrissez pas les animaux.",
    eyebrow: "Intervention Océanopolis", lat: 48.3335, lng: -4.4235
  },
  {
    id: 4, categorie: "Entraide terrain", titre: "À la découverte des algues",
    resume: "Apprenons à reconnaître les algues du bord de mer.",
    intro: "Apprenons à reconnaître les algues du bord de mer et leur rôle dans l'écosystème de la rade. Un temps de découverte et de partage, accessible sans connaissances préalables.",
    dateCourte: "Dim. 6 déc. · 14 h – 16 h", dateLongue: "Dimanche 6 décembre 2026", heure: "14 h – 16 h",
    lieu: "Port du Tinduff", commune: "Plougastel", precision: "Sur le quai du port du Tinduff.",
    programme: ["14 h · Présentation de l'estran et des consignes", "14 h 30 · Observation et reconnaissance des algues", "15 h 30 · Questions et partage des observations"],
    avant: "Prévoyez des chaussures antidérapantes et des vêtements chauds. Observez sans arracher ni récolter. Le parcours sera adapté aux conditions de marée.",
    eyebrow: "Conférence Think Tank", lat: 48.3370, lng: -4.3650
  }
];

const THREADS = [
  { titre: "Présentez votre association et ses actions pour l'océan", extrait: "", tag: "Réseau associatif", cls: "rose", auteur: "L'équipe <b>Côte a Côte</b>", quand: "il y a 8 h", rep: 42, vues: "1,2 k", pinned: true },
  { titre: "Comment suivre les espèces marines sur le littoral ?", extrait: "Échangeons nos protocoles pour observer la faune sans la déranger.", tag: "Vie marine", cls: "bleu", auteur: "Camille", quand: "il y a 12 min", rep: 28, vues: 346 },
  { titre: "Nettoyages du littoral : partageons nos initiatives", extrait: "Présentez vos collectes, vos besoins en bénévoles et vos retours de terrain.", tag: "Actions locales", cls: "beige", auteur: "Thomas", quand: "il y a 35 min", rep: 19, vues: 218 },
  { titre: "Comment mobiliser des bénévoles pour nos actions ?", extrait: "Partageons nos conseils pour accueillir et fidéliser les équipes de terrain.", tag: "Entraide terrain", cls: "vert", auteur: "Sarah", quand: "il y a 1 h", rep: 12, vues: 164 },
  { titre: "Herbiers de posidonie : quelles actions de protection ?", extrait: "Discutons du suivi et de la préservation de ces habitats essentiels.", tag: "Vie marine", cls: "bleu", auteur: "Mehdi", quand: "il y a 2 h", rep: 36, vues: 502 },
  { titre: "Et si nos associations unissaient leurs forces ?", extrait: "Mutualisons le matériel, les savoirs et les actions de sensibilisation.", tag: "Réseau associatif", cls: "rose", auteur: "Léa", quand: "il y a 3 h", rep: 8, vues: 97 }
];

// ---------- Session de démo (stockage local, facultatif) ----------
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};

// ---------- Header / footer communs ----------
function renderHeader() {
  const el = document.querySelector("[data-header]");
  if (!el) return;
  const user = store.get("cac-user");
  const hideMap = el.hasAttribute("data-no-map");
  el.className = "header";
  el.innerHTML = `
    <div class="container">
      <a href="index.html" class="brand">Côte a Côte</a>
      <a href="index.html"><img class="logo-img" src="img/logo.png" alt="Logo Côte à Côte" onerror="this.style.display='none'"></a>
      ${hideMap ? "" : `<a href="carte.html" class="btn btn-teal nav-main">La carte</a>`}
      <div class="actions">
        ${user
          ? `<button class="btn btn-teal" id="logout">Se Déconnecter</button>
             <div class="user"><span>${escapeHtml(user.nom)}</span><span>${escapeHtml(user.role)}</span></div>`
          : `<a href="connexion.html" class="btn btn-ghost">Se connecter</a>
             <a href="inscription.html" class="btn btn-teal">Créer un compte</a>`}
      </div>
    </div>`;
  const out = document.getElementById("logout");
  if (out) out.addEventListener("click", () => { store.del("cac-user"); location.href = "index.html"; });
}

function renderFooter() {
  const el = document.querySelector("[data-footer]");
  if (!el) return;
  el.className = "footer";
  el.innerHTML = `
    <div class="container">
      <span class="brand">Côte a Côte</span>
      <nav><a href="#">À propos</a><a href="#">Règles du forum</a><a href="#">Confidentialité</a></nav>
      <small>© 2026 Côte à Côte</small>
    </div>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initForum();
  initCarte();
  initPublication();
  initNouvelle();
  initAuth();
});

// ---------- Forum (accueil) ----------
function initForum() {
  const list = document.getElementById("threads");
  if (!list) return;

  function draw(items) {
    list.innerHTML = items.map(t => `
      <article class="thread${t.pinned ? " pinned" : ""}">
        <div class="main">
          ${t.pinned ? `<div class="pin">&#128204; ÉPINGLÉ</div>` : ""}
          <h3>${t.titre}</h3>
          ${t.extrait ? `<p class="excerpt">${t.extrait}</p>` : `<div style="height:10px"></div>`}
          <div class="meta"><span class="tag tag-${t.cls}">${t.tag}</span><span>${t.auteur}</span><span>${t.quand}</span></div>
        </div>
        <div class="replies">&#128172;<strong>${t.rep}</strong><br>réponses<br>${t.vues} vues</div>
      </article>`).join("");
    document.getElementById("count-info").textContent = `Affichage de ${items.length} discussions sur 186`;
  }
  draw(THREADS);

  // Recherche
  const search = document.getElementById("search");
  search.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    draw(THREADS.filter(t => (t.titre + t.extrait + t.tag).toLowerCase().includes(q)));
  });
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); search.focus(); }
  });

  // Onglets
  document.querySelectorAll(".feed-tabs button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".feed-tabs button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    const mode = b.dataset.mode;
    let items = [...THREADS];
    if (mode === "pop") items.sort((a, b) => b.rep - a.rep);
    if (mode === "none") items = [];
    draw(items);
  }));

  // Catégories
  document.querySelectorAll(".cat").forEach(c => c.addEventListener("click", () => {
    draw(THREADS.filter(t => t.tag === c.dataset.cat));
  }));
  document.getElementById("all").addEventListener("click", e => { e.preventDefault(); draw(THREADS); });

  // Événements colonne droite
  document.getElementById("events").innerHTML = EVENTS.map(e => `
    <a class="ev-card" href="carte.html?id=${e.id}">
      <div class="eyebrow ${e.eyebrow === e.eyebrow.toUpperCase() ? "up" : ""}">${e.eyebrow}</div>
      <h3>${e.titre}</h3>
      <p>${e.resume}</p>
    </a>`).join("");

  // Nouvelle discussion
  document.getElementById("new-post").addEventListener("click", () => {
    location.href = store.get("cac-user") ? "nouvelle.html" : "connexion.html?next=nouvelle.html";
  });
}

// ---------- Carte (Leaflet + OpenStreetMap) ----------
function initCarte() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const list = document.getElementById("map-items");
  list.innerHTML = EVENTS.map(e => `
    <div class="map-item" data-id="${e.id}">
      <span class="num">${e.id}</span>
      <div>
        <div class="eyebrow">${e.categorie}</div>
        <h3>${e.titre}</h3>
        <div class="when">${e.dateCourte}</div>
        <div class="where">${e.lieu} · ${e.commune}</div>
        <a href="publication.html?id=${e.id}">Voir la publication &rarr;</a>
      </div>
    </div>`).join("");

  if (typeof L === "undefined") {
    mapEl.innerHTML = `<p style="padding:20px">Carte indisponible (connexion internet requise).</p>`;
    return;
  }

  const map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: false }).setView([48.335, -4.44], 12);
  L.control.zoom({ position: "bottomright" }).addTo(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18, attribution: "© OpenStreetMap contributors"
  }).addTo(map);
  L.marker([48.315, -4.42], {
    icon: L.divIcon({ className: "", html: `<div style="background:#fff;border-radius:999px;padding:10px 0;width:130px;text-align:center;font-size:10px;font-weight:700;color:#0e6b83;box-shadow:0 2px 6px rgba(0,0,0,.1)">RADE DE BREST</div>`, iconSize: [130, 36], iconAnchor: [65, 18] }),
    interactive: false
  }).addTo(map);

  const markers = {};
  EVENTS.forEach(e => {
    const icon = L.divIcon({ className: "", html: `<div class="map-pin" data-pin="${e.id}">${e.id}</div>`, iconSize: [26, 26], iconAnchor: [13, 32], popupAnchor: [0, -30] });
    markers[e.id] = L.marker([e.lat, e.lng], { icon }).addTo(map)
      .bindPopup(`<b>${e.titre}</b>${e.dateCourte}<br>${e.lieu} · ${e.commune}<br><a href="publication.html?id=${e.id}">Voir la publication &rarr;</a>`)
      .on("click", () => select(e.id, false));
  });

  function select(id, fly) {
    list.querySelectorAll(".map-item").forEach(x => x.classList.toggle("active", Number(x.dataset.id) === id));
    document.querySelectorAll(".map-pin").forEach(p => p.classList.toggle("active", Number(p.dataset.pin) === id));
    if (fly) { const e = EVENTS.find(x => x.id === id); map.panTo([e.lat, e.lng]); markers[id].openPopup(); }
  }
  list.addEventListener("click", ev => {
    if (ev.target.closest("a")) return;
    const item = ev.target.closest(".map-item");
    if (item) select(Number(item.dataset.id), true);
  });
  // Événement demandé dans l'URL (ex. carte.html?id=3) : centré et ouvert
  const wanted = Number(new URLSearchParams(location.search).get("id"));
  if (EVENTS.some(e => e.id === wanted)) {
    map.setView([EVENTS.find(e => e.id === wanted).lat, EVENTS.find(e => e.id === wanted).lng], 13);
    select(wanted, true);
    list.querySelector(`.map-item[data-id="${wanted}"]`).scrollIntoView({ block: "nearest" });
  } else {
    select(1, false);
  }
}

// ---------- Page publication ----------
function initPublication() {
  const root = document.getElementById("publication");
  if (!root) return;
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const e = EVENTS.find(x => x.id === id) || EVENTS[0];
  document.title = `${e.titre} - Côte à Côte`;

  const set = (k, v) => document.querySelectorAll(`[data-f="${k}"]`).forEach(n => n.textContent = v);
  set("categorie", e.categorie);
  set("categorieUp", e.categorie.toUpperCase());
  set("titre", e.titre);
  set("intro", e.intro);
  set("dateLongue", e.dateLongue);
  set("heure", e.heure);
  set("lieu", `${e.lieu} · ${e.commune}`);
  set("precision", e.precision);
  set("avant", e.avant);
  document.getElementById("programme").innerHTML = e.programme.map(p => `<p>${p}</p>`).join("");
}

// ---------- Nouvelle publication ----------
function initNouvelle() {
  const form = document.getElementById("form-new");
  if (!form) return;
  if (!store.get("cac-user")) { location.replace("connexion.html?next=nouvelle.html"); return; }
  form.addEventListener("submit", ev => {
    ev.preventDefault();
    document.getElementById("new-ok").style.display = "block";
    form.reset();
  });
}

// ---------- Connexion / inscription ----------
function initAuth() {
  const form = document.getElementById("form-auth");
  if (!form) return;
  const next = new URLSearchParams(location.search).get("next") || "index.html";
  form.addEventListener("submit", ev => {
    ev.preventDefault();
    const d = new FormData(form);
    const err = form.querySelector(".err");
    if (d.has("confirm") && d.get("password") !== d.get("confirm")) {
      err.textContent = "Les mots de passe ne correspondent pas.";
      return;
    }
    store.set("cac-user", { nom: d.get("nom") || "Doe John", role: d.get("association") ? "Association" : "Bénévole" });
    location.href = next;
  });
}

// ================================
// EL VIOLÍN DE CECI — TEST (FINAL)
// ✅ Venue + Invitados dentro del formulario final
// ✅ Resultados solo después del submit del formulario
// ✅ WhatsApp + Apps Script intactos
// ================================

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyq6c75P3nxAqX1WEj47zR468SyBmyrdKdQJiStmcVvS8SZYpkMkpqmHnd7lCyIYLO2kg/exec";
const WHATSAPP_BASE = "https://wa.me/595985689454";
const INSTAGRAM_URL = "https://www.instagram.com/elviolindececi/";

const $ = (sel) => document.querySelector(sel);

function show(id){
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.add("hidden");
    s.setAttribute("hidden", "hidden");
  });
  const el = document.querySelector(id);
  if (!el){
    console.error("No existe screen:", id);
    return;
  }
  el.classList.remove("hidden");
  el.removeAttribute("hidden");
  window.scrollTo({ top:0, behavior:"smooth" });
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

// ================================
// QUESTIONS (10)
// ================================
const questions = [
  {
    title: "🖼 Si su boda fuera una escena de película, sería…",
    options: [
      { key:"A", text:"Una entrada majestuosa en un salón elegante. Todo se siente impecable.", music:"M2" },
      { key:"B", text:"Ceremonia al aire libre con luz dorada y emoción genuina.", music:"M1" },
      { key:"C", text:"Un concepto inesperado, editorial, con diseño y detalles únicos.", music:"M3" },
      { key:"D", text:"Celebración vibrante: aplausos, risas y energía desde el inicio.", music:"M3" },
      { key:"E", text:"Momento íntimo: silencio, respiración contenida, lágrimas sinceras.", music:"M1" }
    ]
  },
  {
    title: "📍 Elijan el espacio que más los representa:",
    options: [
      { key:"A", text:"Hotel clásico o salón con arquitectura imponente.", music:"M2" },
      { key:"B", text:"Jardín / quinta / entorno natural.", music:"M1" },
      { key:"C", text:"Galería / industrial / lugar poco convencional.", music:"M3" },
      { key:"D", text:"Salón amplio pensado para una fiesta inolvidable.", music:"M3" },
      { key:"E", text:"Espacio pequeño con significado emocional.", music:"M1" }
    ]
  },
  {
    title: "🎶 Su entrada debería sentirse como…",
    options: [
      { key:"A", text:"Solemne y elegante, perfectamente sincronizada.", music:"M2" },
      { key:"B", text:"Dulce y romántica, sin forzar nada.", music:"M1" },
      { key:"C", text:"Sorprendente: un giro inesperado que define el tono.", music:"M3" },
      { key:"D", text:"Energética: aplausos, emoción y celebración.", music:"M3" },
      { key:"E", text:"Personal e íntima, como si el mundo se apagara.", music:"M1" }
    ]
  },
  {
    title: "💬 ¿Qué quieren que sus invitados digan al irse?",
    options: [
      { key:"A", text:"“Qué boda tan elegante y bien pensada.”", music:"M2" },
      { key:"B", text:"“Se sentía tanto amor en el aire.”", music:"M1" },
      { key:"C", text:"“Nunca vi algo así.”", music:"M3" },
      { key:"D", text:"“Fue la mejor fiesta del año.”", music:"M3" },
      { key:"E", text:"“Fue pequeña, pero la más significativa.”", music:"M1" }
    ]
  },
  {
    title: "🎻 ¿Qué rol debería tener la música en su boda?",
    options: [
      { key:"A", text:"Acompañar con sofisticación y marcar momentos importantes.", music:"M2" },
      { key:"B", text:"Crear atmósfera romántica sin invadir.", music:"M1" },
      { key:"C", text:"Ser parte del concepto y sorprender.", music:"M3" },
      { key:"D", text:"Encender la energía y marcar ritmo de celebración.", music:"M3" },
      { key:"E", text:"Intensificar los momentos más emocionales.", music:"M1" }
    ]
  },
  {
    title: "✨ Elijan la estética que más los identifica:",
    options: [
      { key:"A", text:"Clásico refinado, tonos neutros, lujo sutil.", music:"M2" },
      { key:"B", text:"Natural, orgánico, suave.", music:"M1" },
      { key:"C", text:"Editorial, audaz, con detalles inesperados.", music:"M3" },
      { key:"D", text:"Glamour festivo, con toques llamativos.", music:"M3" },
      { key:"E", text:"Minimalismo emocional, elegante y profundo.", music:"M1" }
    ]
  },
  {
    title: "🥂 ¿Cómo imaginan el cóctel?",
    options: [
      { key:"A", text:"Instrumental elegante para conversación y ambiente.", music:"M2" },
      { key:"B", text:"Melodías suaves que fluyan naturalmente.", music:"M1" },
      { key:"C", text:"Intervenciones inesperadas (momentos ‘wow’ sutiles).", music:"M3" },
      { key:"D", text:"Algo animado que empiece a subir la energía.", music:"M3" },
      { key:"E", text:"Íntimo y cálido, música que invita a abrazos.", music:"M1" }
    ]
  },
  {
    title: "🌙 ¿Qué iluminación los representa?",
    options: [
      { key:"A", text:"Candelabros y luz cálida sofisticada.", music:"M2" },
      { key:"B", text:"Luces cálidas entre árboles / velas delicadas.", music:"M1" },
      { key:"C", text:"Luz dramática, contrastes, atmósfera editorial.", music:"M3" },
      { key:"D", text:"Luces vibrantes y dinámicas.", music:"M3" },
      { key:"E", text:"Iluminación tenue, íntima.", music:"M1" }
    ]
  },
  {
    title: "🕊 Una palabra que describe su relación:",
    options: [
      { key:"A", text:"Complicidad.", music:null },
      { key:"B", text:"Ternura.", music:null },
      { key:"C", text:"Intensidad.", music:null },
      { key:"D", text:"Diversión.", music:null },
      { key:"E", text:"Profundidad.", music:null }
    ]
  },
  {
    title: "🎼 Si pudieran elegir una sola sensación para su ceremonia:",
    options: [
      { key:"A", text:"Admiración.", music:"M2" },
      { key:"B", text:"Emoción pura.", music:"M1" },
      { key:"C", text:"Impacto.", music:"M3" },
      { key:"D", text:"Euforia.", music:"M3" },
      { key:"E", text:"Conexión.", music:"M1" }
    ]
  }
];

// ================================
// ARCHETYPES
// ================================
const archetypes = {
  A: {
    name: "💎 Clásicos Elegantes",
    tagline: "La excelencia es el lenguaje del amor.",
    brief: "Orden, armonía y estética impecable. La emoción es contenida, refinada y profundamente intencional.",
    full: "Ustedes valoran coherencia y dirección. No improvisan momentos: los diseñan. La música ideal marca entradas y transiciones con elegancia, sin exageración.",
    set: [
      "Violín + piano (ideal con baby grand piano shell)",
      "Ceremonia: clásico/romántico refinado",
      "Cóctel: instrumental elegante con pop reinterpretado"
    ]
  },
  B: {
    name: "🌿 Románticos Naturales",
    tagline: "Si no se siente auténtico, no es para nosotros.",
    brief: "Calidez, luz suave y emoción genuina. Menos show, más verdad.",
    full: "Priorizan conexión por encima del impacto. La música acompaña y sostiene la atmósfera sin invadir: romántica, orgánica, íntima.",
    set: [
      "Violín + piano íntimo",
      "Ceremonia: romántico suave",
      "Cóctel: indie/pop delicado instrumental"
    ]
  },
  C: {
    name: "🎨 Creativos Vanguardistas",
    tagline: "No queremos una boda. Queremos una experiencia.",
    brief: "Editorial, audaz y con identidad propia. Un concepto, no un formato.",
    full: "Piensan en narrativa y diseño. La música puede sorprender con arreglos únicos y giros inesperados, siempre con estética cuidada.",
    set: [
      "Violín protagonista + piano",
      "Arreglos exclusivos",
      "Momento ‘wow’ elegante (performance breve)"
    ]
  },
  D: {
    name: "🎉 Sociales Festivos",
    tagline: "Queremos que todos recuerden esta noche.",
    brief: "Celebración, energía y momentos compartidos. La emoción es expansiva.",
    full: "Diseñan pensando en la vibra del invitado. La música marca el ritmo y puede subir energía con inteligencia: transiciones hacia una fiesta inolvidable.",
    set: [
      "Violín con presencia escénica",
      "Hits instrumental en cóctel",
      "Performance sorpresa para activar"
    ]
  },
  E: {
    name: "🤍 Íntimos Emocionales",
    tagline: "No buscamos espectáculo. Buscamos significado.",
    brief: "Profundidad, historia y emoción silenciosa. Momentos que se quedan en la piel.",
    full: "Priorizan lo verdadero. La música ideal es puente emocional: acompaña votos, lecturas y momentos simbólicos con sensibilidad.",
    set: [
      "Violín + piano minimalista",
      "Canciones personalizadas",
      "Momentos íntimos dirigidos con sensibilidad"
    ]
  }
};

const musicModules = {
  M1: { name:"Acompañamiento Sutil", brief:"Presente, pero nunca compite.", full:"Ideal para atmósfera romántica e íntima. Violín + piano con arreglos suaves y transiciones fluidas." },
  M2: { name:"Protagonismo Sofisticado", brief:"Marca momentos clave con intención.", full:"La música guía entradas y clímax emocionales con coherencia estética. Violín + piano con arreglos personalizados." },
  M3: { name:"Momento WOW", brief:"Sorpresa elegante y memorable.", full:"Intervenciones breves y estratégicas para generar reacción. Performance sorpresa con estética cuidada." }
};

// ================================
// SETLISTS + ADDONS
// ================================
const setlists = {
  A: {
    title: "Setlist recomendado — Clásicos Elegantes",
    moments: [
      { name: "Ceremonia (clásico refinado + emoción contenida)", songs: [
        "Canon in D — Pachelbel",
        "Clair de Lune — Debussy",
        "A Thousand Years — Christina Perri (instrumental)",
        "Perfect — Ed Sheeran (instrumental)",
        "All of Me — John Legend (instrumental)"
      ]},
      { name: "Cóctel / Recepción (luxury lounge, conversación)", songs: [
        "La Vie En Rose — Édith Piaf (instrumental)",
        "Fly Me to the Moon — Sinatra (instrumental)",
        "At Last — Etta James (instrumental)",
        "Can’t Help Falling in Love — Elvis (instrumental)"
      ]},
      { name: "Momento especial (firma Ceci)", songs: [
        "Viva la Vida — Coldplay (instrumental elegante)",
        "Yellow — Coldplay (instrumental)"
      ]}
    ]
  },
  B: {
    title: "Setlist recomendado — Románticos Naturales",
    moments: [
      { name: "Ceremonia (orgánico, cálido, auténtico)", songs: [
        "Turning Page — Sleeping At Last (instrumental)",
        "I Get to Love You — Ruelle (instrumental)",
        "You Are the Reason — Calum Scott (instrumental)",
        "Bloom — The Paper Kites (instrumental)"
      ]},
      { name: "Cóctel / Recepción (indie-pop delicado)", songs: [
        "Ho Hey — The Lumineers (instrumental)",
        "Riptide — Vance Joy (instrumental)",
        "Somewhere Only We Know — Keane (instrumental)",
        "Photograph — Ed Sheeran (instrumental)"
      ]},
      { name: "Cierre emotivo", songs: [
        "A Sky Full of Stars — Coldplay (instrumental suave)"
      ]}
    ]
  },
  C: {
    title: "Setlist recomendado — Creativos Vanguardistas",
    moments: [
      { name: "Ceremonia (editorial, conceptual)", songs: [
        "Experience — Ludovico Einaudi",
        "Nuvole Bianche — Ludovico Einaudi",
        "Time — Hans Zimmer",
        "Young and Beautiful — Lana del Rey (instrumental)"
      ]},
      { name: "Cóctel / Recepción (curado, cool)", songs: [
        "Midnight City — M83 (instrumental)",
        "Blinding Lights — The Weeknd (instrumental, classy)",
        "Levitating — Dua Lipa (instrumental)",
        "Take Five — Dave Brubeck (vibe)"
      ]},
      { name: "Momento WOW (intervención)", songs: [
        "Titanium — David Guetta (instrumental épico)",
        "Viva la Vida — Coldplay (arreglo sorpresa)"
      ]}
    ]
  },
  D: {
    title: "Setlist recomendado — Sociales Festivos",
    moments: [
      { name: "Ceremonia (emocionante con ritmo)", songs: [
        "Marry You — Bruno Mars (instrumental)",
        "I’m Yours — Jason Mraz (instrumental)",
        "Love on Top — Beyoncé (instrumental)"
      ]},
      { name: "Cóctel / Recepción (subiendo energía)", songs: [
        "Uptown Funk — Bruno Mars (instrumental)",
        "September — Earth, Wind & Fire (instrumental)",
        "Happy — Pharrell Williams (instrumental)"
      ]},
      { name: "Activación / transición a fiesta", songs: [
        "Don’t Stop Me Now — Queen (instrumental)",
        "Titanium — instrumental épico"
      ]}
    ]
  },
  E: {
    title: "Setlist recomendado — Íntimos Emocionales",
    moments: [
      { name: "Ceremonia (minimalismo emocional)", songs: [
        "River Flows in You — Yiruma",
        "Kiss the Rain — Yiruma",
        "Comptine d’un autre été — Yann Tiersen",
        "Clair de Lune — Debussy"
      ]},
      { name: "Cóctel / Recepción (cálido y cercano)", songs: [
        "Make You Feel My Love — Adele (instrumental)",
        "Hallelujah — instrumental",
        "Stand By Me — instrumental suave"
      ]},
      { name: "Momento simbólico", songs: [
        "A Thousand Years — instrumental (íntimo)"
      ]}
    ]
  }
};

const intensityAddOns = {
  M1: {
    title: "Ajuste por intensidad (M1 — Acompañamiento sutil)",
    note: "Arreglos suaves, tempos moderados y prioridad a atmósfera. Menos cambios bruscos.",
    add: ["Clair de Lune — Debussy", "Kiss the Rain — Yiruma", "Turning Page — Sleeping At Last (instrumental)"]
  },
  M2: {
    title: "Ajuste por intensidad (M2 — Protagonismo sofisticado)",
    note: "Sumar piezas “ancla” para entradas y transiciones. Arreglos marcados y coordinación con timing.",
    add: ["Canon in D — Pachelbel", "La Vie En Rose — instrumental", "Viva la Vida — Coldplay (instrumental elegante)"]
  },
  M3: {
    title: "Ajuste por intensidad (M3 — Momento WOW)",
    note: "Agregar 1–2 intervenciones sorpresa cortas (60–90s) que generen reacción sin perder estética.",
    add: ["Titanium — instrumental épico", "Blinding Lights — instrumental classy", "Uptown Funk — instrumental (mini show)"]
  }
};

// ================================
// PRIORIDAD + ÍNDICE
// ================================
function daysUntil(dateStr){
  if(!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000*60*60*24));
}

function computePriority(lead, intensity){
  let points = 0;

  if (intensity === "M1") points += 1;
  if (intensity === "M2") points += 2;
  if (intensity === "M3") points += 3;

  // invitados
  if (lead.invitados === "80 – 150") points += 1;
  if (lead.invitados === "150 – 250") points += 2;
  if (lead.invitados === "Más de 250") points += 3;

 // ✅ Venue por lista (exacto) — tu tabla
const VENUE_POINTS = {
  // +2
  "la riviere": 2,
  "es vedra": 2,
  "las takuaras": 2,
  "castillo remanso": 2,
  "casa puente": 2,
  "castillo": 2,
  "puerto liebig": 2,
  "talleryrand": 2,
  "talleryrand costanera": 2,
  "villa maria": 2,
  "casa corbellani": 2,
  "Casita Quinta": 2,

  // +1
  "villa jardin": 1,
  "royal": 1,
  "royal eventos": 1,
  "soir": 1,
  "soir eventos": 1,
  "vista verde": 1,
  "la isabella": 1,
  "casa 1927": 1,
  "la glorieta": 1,
  "mantra salon boutique": 1,

  // +0 explícitos
  "rusticana": 0,
  "rusticana eventos": 0,
  "isabella": 0,
  "tiam eventos": 0,
  "mantra": 0
};

function normalizeVenue(s){
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // saca tildes
    .replace(/\s+/g, " ")
    .trim();
}

// Venue (viene del <select>)
const v = normalizeVenue(lead.venue);

// Si es “Otro / No está en la lista” => 0
if (!v || v.includes("otro")) {
  points += 0;
} else {
  points += (VENUE_POINTS[v] ?? 0);
}

  // fecha
  const days = daysUntil(lead.fecha_boda);
  if (days !== null){
    if (days <= 90) points += 3;
    else if (days <= 180) points += 2;
    else if (days <= 365) points += 1;
  }

  let prioridad = "C";
  if (points >= 8) prioridad = "A";
  else if (points >= 5) prioridad = "B";

  return { prioridad, points };
}

function getDesignIndex(prioridad){
  if (prioridad === "A") return 92;
  if (prioridad === "B") return 86;
  return 78;
}

function investmentBlock(intensity){
  if (intensity === "M1") return "Las parejas con su perfil priorizan sensibilidad, coherencia y una personalización moderada.";
  if (intensity === "M2") return "Las parejas con su perfil invierten estratégicamente en arreglos personalizados y coordinación musical.";
  return "Las parejas con su perfil suelen priorizar momentos sorpresa, arreglos exclusivos y elementos diferenciales.";
}

// ================================
// STATE
// ================================
let lead = {};
let currentQ = 0;
let answers = Array(questions.length).fill(null);
let intensityAnswers = Array(questions.length).fill(null);
let sending = false;
let locked = false;

// ================================
// ELEMENTS
// ================================
const btnStart = $("#btn-start");

const quizBar = $("#quiz-bar");
const qTitle = $("#q-title");
const qCount = $("#q-count");
const qHint = $("#q-hint");
const qOptions = $("#q-options");
const btnPrev = $("#btn-prev");
const btnNext = $("#btn-next");

const leadForm = $("#lead-form");
const btnBackToQuiz = $("#btn-back-to-quiz");

const resultTitle = $("#result-title");
const resultSubtitle = $("#result-subtitle");
const resultBrief = $("#result-brief");
const resultDetails = $("#result-details");
const btnToggleDetails = $("#btn-toggle-details");
const btnRetry = $("#btn-retry");
const btnWA = $("#btn-wa");
const btnIG = $("#btn-ig");

// ================================
// EVENTS
// ================================
btnStart?.addEventListener("click", () => {
  lead = {};
  currentQ = 0;
  answers = Array(questions.length).fill(null);
  intensityAnswers = Array(questions.length).fill(null);
  renderQuestion();
  show("#screen-quiz");
});

btnPrev?.addEventListener("click", () => {
  if (locked) return;
  if (currentQ <= 0) return;
  currentQ--;
  renderQuestion();
});

btnNext?.addEventListener("click", () => {
  if (locked) return;
  if (!answers[currentQ]) return;

  const isLast = currentQ === questions.length - 1;
  if (!isLast){
    currentQ++;
    renderQuestion();
    return;
  }

  // ✅ Al final del test: recién muestra formulario
  show("#screen-lead");
});

btnBackToQuiz?.addEventListener("click", () => show("#screen-quiz"));

leadForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = $("#nombre")?.value?.trim() || "";
  const telefono = $("#telefono")?.value?.trim() || "";
  const fecha_boda = $("#fecha_boda")?.value || "";
  const venue = $("#venue")?.value?.trim() || "";
  const invitados = $("#invitados")?.value || "";

  if(!nombre || !telefono || !fecha_boda || !venue || !invitados){
    alert("Por favor completá todos los campos obligatorios.");
    return;
  }

  lead = { nombre, telefono, fecha_boda, venue, invitados };
  locked = true;

  const computed = computeArchetype(answers);
  const intensity = computeIntensity(intensityAnswers, lead);
  const pr = computePriority(lead, intensity);
  const indice = getDesignIndex(pr.prioridad);

  renderResult(computed, intensity, pr.prioridad, indice);
  show("#screen-result");

  const payload = buildPayload(lead, answers, intensityAnswers, computed, intensity, pr.prioridad, pr.points, indice);

  if (!sending){
    sending = true;
    try{ await enviarLeadASheets(payload); }
    catch(err){ console.error("Error guardando lead:", err); }
    finally{ sending = false; }
  }

  locked = false;
});

btnToggleDetails?.addEventListener("click", () => {
  const willShow = resultDetails.classList.contains("hidden") || resultDetails.hidden === true;
  resultDetails.hidden = !willShow;
  resultDetails.classList.toggle("hidden", !willShow);
  btnToggleDetails.textContent = willShow ? "Ocultar análisis completo" : "Ver análisis completo";
});

btnRetry?.addEventListener("click", () => {
  lead = {};
  currentQ = 0;
  answers = Array(questions.length).fill(null);
  intensityAnswers = Array(questions.length).fill(null);
  sending = false;
  locked = false;

  leadForm.reset();
  resultDetails.hidden = true;
  resultDetails.classList.add("hidden");
  btnToggleDetails.textContent = "Ver análisis completo";

  show("#screen-intro");
});

if (btnIG) btnIG.setAttribute("href", INSTAGRAM_URL);

// ================================
// RENDER QUESTION
// ================================
function setNextLabelAndHint(){
  const isLast = currentQ === questions.length - 1;
  btnNext.textContent = isLast ? "Quiero ver mis resultados" : "Siguiente";
  qHint.textContent = isLast
    ? "Elegí una opción y tocá “Quiero ver mis resultados”."
    : "Elegí una opción para habilitar “Siguiente”.";
}

function renderQuestion(){
  const q = questions[currentQ];

  qTitle.textContent = q.title;
  qCount.textContent = `${currentQ + 1} de ${questions.length}`;

  const quizProgress = Math.round(((currentQ + 1) / questions.length) * 90);
  quizBar.style.width = `${quizProgress}%`;

  qOptions.innerHTML = "";
  btnPrev.disabled = currentQ === 0;

  setNextLabelAndHint();
  btnNext.disabled = !answers[currentQ];

  q.options.forEach((opt) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt" + (answers[currentQ] === opt.key ? " selected" : "");
    b.innerHTML = `<span class="k">${opt.key}</span>${escapeHtml(opt.text)}`;

    b.addEventListener("click", () => {
      answers[currentQ] = opt.key;
      intensityAnswers[currentQ] = opt.music || null;

      [...qOptions.children].forEach(ch => ch.classList.remove("selected"));
      b.classList.add("selected");

      btnNext.disabled = false;
    });

    qOptions.appendChild(b);
  });
}

// ================================
// COMPUTE ARCHETYPE & INTENSITY
// ================================
function computeArchetype(ans){
  const scores = {A:0, B:0, C:0, D:0, E:0};
  ans.forEach(a => { if(a && scores[a] !== undefined) scores[a]++; });

  const entries = Object.entries(scores);
  const max = Math.max(...entries.map(([,v]) => v));
  let tied = entries.filter(([,v]) => v === max).map(([k]) => k);

  if (tied.length > 1){
    for (let i = ans.length - 1; i >= 0; i--){
      if (tied.includes(ans[i])) { tied = [ans[i]]; break; }
    }
  }
  const primary = tied[0];

  const remaining = entries.filter(([k]) => k !== primary).sort((a,b)=>b[1]-a[1]);
  const secMax = remaining[0][1];
  let secTied = remaining.filter(([,v]) => v === secMax).map(([k]) => k);

  if (secTied.length > 1){
    for (let i = ans.length - 1; i >= 0; i--){
      if (secTied.includes(ans[i])) { secTied = [ans[i]]; break; }
    }
  }

  return { scores, primary, secondary: secTied[0] };
}

function computeIntensity(intensityArr, lead){
  const m = {M1:0, M2:0, M3:0};
  intensityArr.forEach(x => { if(x && m[x] !== undefined) m[x]++; });

  // invitados influyen
  if (lead.invitados === "150 – 250") m.M2 += 1;
  if (lead.invitados === "Más de 250") m.M3 += 2;
  if (lead.invitados === "Menos de 80") m.M1 += 1;

  // venue texto influye
  const v = (lead.venue || "").toLowerCase();
  if (v.includes("hotel")) m.M2 += 1;
  if (v.includes("salon") || v.includes("salón")) m.M2 += 1;
  if (v.includes("quinta") || v.includes("estancia")) m.M2 += 1;
  if (v.includes("playa") || v.includes("destino")) m.M3 += 1;
  if (v.includes("iglesia") || v.includes("capilla")) m.M1 += 1;

  const entries = Object.entries(m);
  const max = Math.max(...entries.map(([,v]) => v));
  let tied = entries.filter(([,v]) => v === max).map(([k]) => k);

  if (tied.length > 1){
    for (let i = intensityArr.length - 1; i >= 0; i--){
      const val = intensityArr[i];
      if (val && tied.includes(val)) { tied = [val]; break; }
    }
  }
  return tied[0];
}

// ================================
// PAYLOAD + SEND
// ================================
function buildPayload(lead, answers, intensityAnswers, computed, intensity, prioridad, points, indice){
  return {
    nombre: lead.nombre,
    telefono: lead.telefono,
    fecha_boda: lead.fecha_boda,

    // ✅ columnas del Sheets
    venue: lead.venue,
    invitados: lead.invitados,

    // compat (si tu sheet lo tenía)
    vision_musical: "",

    q1: answers[0], q2: answers[1], q3: answers[2], q4: answers[3], q5: answers[4],
    q6: answers[5], q7: answers[6], q8: answers[7], q9: answers[8], q10: answers[9],

    m1: intensityAnswers[0] || "", m2: intensityAnswers[1] || "", m3: intensityAnswers[2] || "",
    m4: intensityAnswers[3] || "", m5: intensityAnswers[4] || "", m6: intensityAnswers[5] || "",
    m7: intensityAnswers[6] || "", m8: intensityAnswers[7] || "", m9: intensityAnswers[8] || "",
    m10: intensityAnswers[9] || "",

    arquetipo: archetypes[computed.primary].name,
    arquetipo_secundario: archetypes[computed.secondary].name,
    intensidad_musical: intensity,

    scoreA: computed.scores.A,
    scoreB: computed.scores.B,
    scoreC: computed.scores.C,
    scoreD: computed.scores.D,
    scoreE: computed.scores.E,

    prioridad,
    prioridad_points: points,
    indice_diseno: indice
  };
}

async function enviarLeadASheets(payload){
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return await res.text();
}

// ================================
// SETLIST HELPERS
// ================================
function getSetlistTeasers_(primaryKey, intensity, max = 2){
  const sl = setlists[primaryKey];
  const addOn = intensityAddOns[intensity];
  const picks = [];
  if (sl?.moments?.[0]?.songs?.[0]) picks.push(sl.moments[0].songs[0]);
  if (picks.length < max && addOn?.add?.[0]) picks.push(addOn.add[0]);
  else if (picks.length < max && sl?.moments?.[1]?.songs?.[0]) picks.push(sl.moments[1].songs[0]);
  return picks.slice(0, max);
}

function renderSetlistHTML_(primaryKey, intensity){
  const sl = setlists[primaryKey];
  const addOn = intensityAddOns[intensity];
  if (!sl) return `<p class="muted">No encontramos setlist para este perfil.</p>`;

  const momentsHtml = sl.moments.map(m => {
    const items = m.songs.map(s => `<li>${escapeHtml(s)}</li>`).join("");
    return `
      <div class="result-box" style="margin-top:12px;">
        <h4>${escapeHtml(m.name)}</h4>
        <ul>${items}</ul>
      </div>
    `;
  }).join("");

  const addOnHtml = addOn ? `
    <div class="gold-card" style="margin-top:14px;">
      <div class="gold-title">${escapeHtml(addOn.title)}</div>
      <div class="gold-text">${escapeHtml(addOn.note)}</div>
      <hr/>
      <h4 style="margin:0 0 8px;">+3 temas sugeridos para tu intensidad</h4>
      <ul>${addOn.add.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
    </div>
  ` : "";

  return `
    <p class="muted">${escapeHtml(sl.title)}</p>
    ${momentsHtml}
    ${addOnHtml}
    <p class="fineprint">*El setlist es una guía. Se ajusta a timing real y canciones significativas de la pareja.</p>
  `;
}

// ================================
// RESULT RENDER
// ================================
function renderResult(computed, intensity, prioridad, indice){
  const a1 = archetypes[computed.primary];
  const a2 = archetypes[computed.secondary];
  const m = musicModules[intensity];
  const teasers = getSetlistTeasers_(computed.primary, intensity, 2);

  resultTitle.textContent = `Resultado: ${a1.name}`;
  resultSubtitle.textContent = `Intensidad musical: ${m.name} · Prioridad interna: ${prioridad}`;

  resultBrief.innerHTML = `
    <h3>${escapeHtml(a1.tagline)}</h3>
    <p>${escapeHtml(a1.brief)}</p>

    <p class="muted" style="margin-top:8px;">
      📍 Lugar: ${escapeHtml(lead.venue || "—")} · 👥 Invitados: ${escapeHtml(lead.invitados || "—")}
    </p>

    <hr/>
    <h3>🎻 Estilo musical: ${escapeHtml(m.name)}</h3>
    <p>${escapeHtml(m.brief)}</p>
    <hr/>
    <h3>🎵 Teaser de setlist (ideal para ustedes)</h3>
    <ul>${teasers.map(t => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
    <p class="muted" style="margin-top:10px;">En el análisis completo está el setlist por momentos (ceremonia, cóctel y wow).</p>
  `;

  const gold = `
    <div class="gold-card">
      <div class="gold-title">Índice de Diseño Emocional</div>
      <div class="gold-percentage">${indice}%</div>
      <div class="gold-text">
        Su perfil muestra una fuerte orientación hacia experiencias musicales diseñadas con intención.
        <br><br>
        Las parejas con este nivel de afinidad suelen planificar con anticipación para garantizar coherencia estética y disponibilidad.
        <br><br>
        <strong>Recomendamos agendar con tiempo.</strong>
      </div>
    </div>
  `;

  resultDetails.innerHTML = `
    <h3>🔎 Lo que esto dice sobre ustedes</h3>
    <p>${escapeHtml(a1.full)}</p>

    <hr/>

    <h3>✨ Matiz secundario</h3>
    <p><strong>${escapeHtml(a2.name)}</strong> — ${escapeHtml(a2.tagline)}</p>

    <hr/>

    <h3>🎶 Cómo debería vivirse su música</h3>
    <p>${escapeHtml(m.full)}</p>

    ${gold}

    <hr/>

    <h3>💎 Perfil de inversión</h3>
    <p>${escapeHtml(investmentBlock(intensity))}</p>

    <hr/>

    <h3>🎼 Set recomendado (formato)</h3>
    <ul>${a1.set.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

    <hr/>

    <h3>🎵 Setlist sugerido (canciones ideales)</h3>
    ${renderSetlistHTML_(computed.primary, intensity)}
  `;

  resultDetails.hidden = true;
  resultDetails.classList.add("hidden");
  btnToggleDetails.textContent = "Ver análisis completo";

  const text = `Hola Ceci! Hicimos el test y nos salió: ${a1.name} (secundario: ${a2.name}). Intensidad: ${m.name}. Invitados: ${lead.invitados || "-"} · Lugar: ${lead.venue || "-"}. Prioridad interna: ${prioridad}. Queremos una propuesta personalizada 🙌`;
  btnWA.setAttribute("href", `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`);
}

// ================================
// INIT
// ================================
show("#screen-intro");
console.log("✅ app.js FINAL (venue+invitados en formulario) cargado OK");

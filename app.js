const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyq6c75P3nxAqX1WEj47zR468SyBmyrdKdQJiStmcVvS8SZYpkMkpqmHnd7lCyIYLO2kg/exec";
const WHATSAPP_URL = "https://wa.me/595985689454";

const $ = (sel) => document.querySelector(sel);
function show(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  $(id).classList.remove("hidden");
  window.scrollTo({top:0, behavior:"smooth"});
}

const questions = [
  {
    title: "Cuando imaginan su entrada a la ceremonia, la escena es…",
    options: {
      A: "Majestuosa, tradicional, perfectamente coreografiada.",
      B: "Natural, con luz cálida y emoción genuina.",
      C: "Sorprendente, diferente a todo lo visto antes.",
      D: "Energética, con reacción fuerte de los invitados.",
      E: "Íntima, casi privada, profundamente emotiva."
    }
  },
  {
    title: "Si su boda fuera una película sería…",
    options: {
      A: "Un clásico atemporal.",
      B: "Una historia romántica llena de sensibilidad.",
      C: "Una obra de arte visual.",
      D: "Una celebración vibrante y divertida.",
      E: "Un relato íntimo contado en primera persona."
    }
  },
  {
    title: "¿Qué priorizan al planificar?",
    options: {
      A: "Que todo sea impecable y elegante.",
      B: "Que refleje su esencia auténtica.",
      C: "Que sea única y diferente.",
      D: "Que todos la pasen increíble.",
      E: "Que cada momento tenga significado."
    }
  },
  {
    title: "En cuanto a música en vivo, prefieren…",
    options: {
      A: "Repertorio clásico adaptado con sofisticación.",
      B: "Canciones románticas que los representen.",
      C: "Versiones inesperadas y arreglos originales.",
      D: "Momentos musicales que sorprendan y activen.",
      E: "Piezas elegidas por su historia personal."
    }
  },
  {
    title: "¿Cómo imaginan la decoración?",
    options: {
      A: "Paleta neutra, estructura formal, lujo sutil.",
      B: "Flores naturales, tonos suaves, armonía.",
      C: "Elementos no convencionales y diseño conceptual.",
      D: "Impacto visual fuerte y ambiente dinámico.",
      E: "Detalles pequeños con significado profundo."
    }
  },
  {
    title: "Su frase al organizar sería…",
    options: {
      A: "“Queremos algo elegante y bien hecho.”",
      B: "“Queremos que se sienta nosotros.”",
      C: "“Queremos algo que nadie haya visto.”",
      D: "“Queremos que sea inolvidable.”",
      E: "“Queremos que se sienta verdadero.”"
    }
  },
  {
    title: "¿Qué los estresa más?",
    options: {
      A: "Que algo se vea desprolijo.",
      B: "Que pierda autenticidad.",
      C: "Que sea igual a todas las bodas.",
      D: "Que la energía baje.",
      E: "Que no conecte emocionalmente."
    }
  },
  {
    title: "Idealmente, sus invitados dirían:",
    options: {
      A: "“Qué boda tan elegante.”",
      B: "“Se notaba que eran ustedes.”",
      C: "“Nunca vi algo así.”",
      D: "“La pasamos increíble.”",
      E: "“Fue profundamente emotiva.”"
    }
  }
];

const archetypes = {
  A: {
    name: "💎 Clásicos Elegantes",
    tagline: "La excelencia es el lenguaje del amor.",
    description: `Ustedes entienden la boda como un acontecimiento significativo que merece altura, estructura y belleza atemporal.
Valoran la planificación precisa, el orden y la estética limpia. Para ustedes, la elegancia no es ostentación: es armonía.
Buscan proveedores que transmitan profesionalismo, seguridad y coherencia visual.`,
    planning: [
      "Analizan antes de decidir",
      "Valoran trayectoria y reputación",
      "Buscan asesoramiento experto",
      "Prefieren calidad antes que improvisación"
    ],
    music: {
      title: "🎻 Set musical ideal para ustedes",
      blocks: [
        { name: "Ceremonia", items: ["Canon en Re (Pachelbel)", "Ave María", "A Thousand Years (instrumental elegante)", "Entrada/Salida: clásico reinterpretado con violín + piano"] },
        { name: "Cóctel", items: ["Clásicos románticos refinados", "Jazz suave / Bossa", "Sinatra instrumental", "Pop elegante (Ed Sheeran suave, etc.)"] },
        { name: "Formato ideal", items: ["Violín + piano (ideal con baby grand piano shell)", "Curaduría fina de repertorio", "Presencia escénica sobria y elegante"] }
      ],
      close: "Con ustedes, la música debe sentirse impecable, refinada y estratégica."
    }
  },
  B: {
    name: "🌿 Románticos Naturales",
    tagline: "Si no se siente auténtico, no es para nosotros.",
    description: `Su prioridad es la verdad emocional. Quieren una boda cálida, sensible y genuina.
Cada decisión pasa por: “¿Esto nos representa?”. Valoran proveedores con escucha real y cuidado por detalles con significado.`,
    planning: [
      "Deciden por conexión e intuición",
      "Buscan coherencia emocional",
      "Valoran cercanía humana",
      "Prefieren significado sobre tendencia"
    ],
    music: {
      title: "🎻 Set musical ideal para ustedes",
      blocks: [
        { name: "Ceremonia", items: ["Turning Page (instrumental)", "Perfect (romántica)", "All of Me (suave)", "Somewhere Over the Rainbow"] },
        { name: "Cóctel", items: ["Coldplay instrumental", "Baladas acústicas", "Indie romántico instrumental", "Pop suave elegante"] },
        { name: "Formato ideal", items: ["Violín + piano íntimo (o backing suave)", "Interpretación cálida y cercana", "Momentos que acompañen sin invadir"] }
      ],
      close: "Con ustedes, la música debe abrazar el momento."
    }
  },
  C: {
    name: "🎨 Creativos Vanguardistas",
    tagline: "No queremos una boda. Queremos una experiencia.",
    description: `Ustedes no replican: crean. Buscan concepto, narrativa y estética con intención.
Les atrae lo diferente y lo bien pensado. Valoran propuestas originales y arreglos personalizados.`,
    planning: [
      "Piensan por concepto y narrativa",
      "Valoran innovación",
      "Buscan proveedores creativos",
      "Priorizan impacto estético con coherencia"
    ],
    music: {
      title: "🎻 Set musical ideal para ustedes",
      blocks: [
        { name: "Ceremonia", items: ["Soundtracks cinematográficos", "Lana del Rey instrumental", "Adaptaciones modernas inesperadas", "Arreglos exclusivos"] },
        { name: "Momentos especiales", items: ["Entrada disruptiva", "Performance sorpresa", "Transiciones con intención escénica"] },
        { name: "Formato ideal", items: ["Violín protagonista + piano (+ pistas selectivas)", "Uso escenográfico del baby grand piano shell", "Diseño de experiencia"] }
      ],
      close: "Con ustedes, la música es un elemento artístico central."
    }
  },
  D: {
    name: "🎉 Sociales Festivos",
    tagline: "Queremos que todos recuerden esta noche.",
    description: `La energía colectiva es prioridad. Su boda es comunidad y celebración.
Planifican pensando en el invitado. Les entusiasman los momentos sorpresa y la vibra alta.`,
    planning: [
      "Diseñan pensando en la experiencia del invitado",
      "Buscan dinamismo",
      "Valoran impacto emocional colectivo",
      "Aman la sorpresa bien ejecutada"
    ],
    music: {
      title: "🎻 Set musical ideal para ustedes",
      blocks: [
        { name: "Ceremonia", items: ["Entrada emocionante (tema reconocible)", "Momentos intensos (impacto)", "Cierre icónico"] },
        { name: "Cóctel / Pre-fiesta", items: ["Hits actuales instrumental", "Mashups", "Temas que suben energía sin romper estética"] },
        { name: "Formato ideal", items: ["Violín con presencia escénica", "Momento performance sorpresa", "Set para levantar ambiente"] }
      ],
      close: "Con ustedes, la música debe activar emociones colectivas."
    }
  },
  E: {
    name: "🤍 Íntimos Emocionales",
    tagline: "No buscamos espectáculo. Buscamos significado.",
    description: `Para ustedes, la boda es simbólica. Cada canción tiene historia.
No buscan impresionar: buscan sentir. La emoción es el hilo invisible de toda la experiencia.`,
    planning: [
      "Eligen con el corazón",
      "Priorizan significado",
      "Valoran lo íntimo y profundo",
      "Buscan proveedores sensibles"
    ],
    music: {
      title: "🎻 Set musical ideal para ustedes",
      blocks: [
        { name: "Ceremonia", items: ["Canciones de su historia (personalizadas)", "Piezas minimalistas", "Arreglos exclusivos para votos/lecturas"] },
        { name: "Momentos especiales", items: ["Canción dedicada", "Música en momentos simbólicos", "Cierre íntimo"] },
        { name: "Formato ideal", items: ["Violín + piano minimalista", "Interpretación cercana", "Diseño de emociones"] }
      ],
      close: "Con ustedes, la música debe contar su historia."
    }
  }
};

let lead = {};
let currentQ = 0;
let answers = Array(questions.length).fill(null);
let sending = false;

const btnStart = $("#btn-start");
const leadForm = $("#lead-form");
const venueSel = $("#venue");
const venueOtroField = $("#venue-otro-field");
const quizBar = $("#quiz-bar");
const qTitle = $("#q-title");
const qCount = $("#q-count");
const qOptions = $("#q-options");
const btnPrev = $("#btn-prev");
const btnNext = $("#btn-next");
const resultTitle = $("#result-title");
const resultSubtitle = $("#result-subtitle");
const resultContent = $("#result-content");
const btnRetry = $("#btn-retry");
const btnWA = $("#btn-wa");

btnStart.addEventListener("click", () => show("#screen-lead"));

venueSel.addEventListener("change", () => {
  if (venueSel.value === "Otro") venueOtroField.classList.remove("hidden");
  else venueOtroField.classList.add("hidden");
});

leadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = $("#nombre").value.trim();
  const telefono = $("#telefono").value.trim();
  const fecha_boda = $("#fecha_boda").value;
  const venue = $("#venue").value;
  const venue_otro = $("#venue_otro").value.trim();
  const invitados = $("#invitados").value;
  const vision_musical = $("#vision_musical").value;

  if(!nombre || !telefono || !fecha_boda || !venue || !invitados || !vision_musical){
    alert("Por favor completá todos los campos obligatorios.");
    return;
  }

  lead = {
    nombre,
    telefono,
    fecha_boda,
    venue: venue === "Otro" ? (venue_otro || "Otro") : venue,
    invitados,
    vision_musical
  };

  currentQ = 0;
  answers = Array(questions.length).fill(null);
  renderQuestion();
  show("#screen-quiz");
});

btnPrev.addEventListener("click", () => {
  if (currentQ <= 0) return;
  currentQ--;
  renderQuestion();
});

btnNext.addEventListener("click", async () => {
  if (!answers[currentQ]) return;

  if (currentQ < questions.length - 1){
    currentQ++;
    renderQuestion();
    return;
  }

  const computed = computeResult(answers);
  const prioridad = computePriority(lead);

  renderResult(computed, prioridad);
  show("#screen-result");

  const payload = buildPayload(lead, answers, computed, prioridad);

  if (!sending){
    sending = true;
    try{ await enviarLeadASheets(payload); }
    catch(err){ console.error("Error guardando lead:", err); }
    finally{ sending = false; }
  }
});

btnRetry.addEventListener("click", () => {
  lead = {};
  currentQ = 0;
  answers = Array(questions.length).fill(null);
  leadForm.reset();
  venueOtroField.classList.add("hidden");
  show("#screen-intro");
});

btnWA.setAttribute("href", WHATSAPP_URL);

function renderQuestion(){
  const q = questions[currentQ];
  qTitle.textContent = q.title;
  qCount.textContent = `${currentQ + 1} de ${questions.length}`;

  const quizProgress = 20 + ((currentQ + 1) / questions.length) * 80;
  quizBar.style.width = `${Math.round(quizProgress)}%`;

  qOptions.innerHTML = "";
  btnPrev.disabled = currentQ === 0;
  btnNext.disabled = !answers[currentQ];
  btnNext.textContent = currentQ === questions.length - 1 ? "Ver mi resultado" : "Siguiente";

  Object.entries(q.options).forEach(([key, text]) => {
    const div = document.createElement("div");
    div.className = "opt" + (answers[currentQ] === key ? " selected" : "");
    div.innerHTML = `<span class="k">${key}</span>${escapeHtml(text)}`;
    div.addEventListener("click", () => {
      answers[currentQ] = key;
      [...qOptions.children].forEach(ch => ch.classList.remove("selected"));
      div.classList.add("selected");
      btnNext.disabled = false;
    });
    qOptions.appendChild(div);
  });
}

function escapeHtml(str){
  return str.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

function computeResult(ans){
  const scores = {A:0, B:0, C:0, D:0, E:0};
  ans.forEach(a => { if(a && scores[a] !== undefined) scores[a]++; });
  const sorted = Object.entries(scores).sort((x,y) => y[1]-x[1]);
  return { scores, primary: sorted[0][0], secondary: sorted[1][0], arquetipo: archetypes[sorted[0][0]].name };
}

function computePriority(lead){
  let points = 0;
  if (lead.invitados === "150 – 250") points += 2;
  if (lead.invitados === "Más de 250") points += 3;
  if (lead.invitados === "80 – 150") points += 1;

  const v = (lead.venue || "").toLowerCase();
  if (v.includes("hotel")) points += 2;
  if (v.includes("quinta") || v.includes("estancia")) points += 2;
  if (v.includes("salón") || v.includes("salon")) points += 1;

  if (lead.vision_musical.includes("impactante")) points += 2;
  if (lead.vision_musical.includes("elegante")) points += 2;
  if (lead.vision_musical.includes("asesoramiento")) points += 1;

  const days = daysUntil(lead.fecha_boda);
  if (days !== null){
    if (days <= 120) points += 3;
    else if (days <= 240) points += 2;
    else if (days <= 365) points += 1;
  }

  if (points >= 8) return "A";
  if (points >= 5) return "B";
  return "C";
}

function daysUntil(dateStr){
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000*60*60*24));
}

function buildPayload(lead, answers, computed, prioridad){
  return {
    nombre: lead.nombre,
    telefono: lead.telefono,
    fecha_boda: lead.fecha_boda,
    venue: lead.venue,
    invitados: lead.invitados,
    vision_musical: lead.vision_musical,
    q1: answers[0], q2: answers[1], q3: answers[2], q4: answers[3],
    q5: answers[4], q6: answers[5], q7: answers[6], q8: answers[7],
    arquetipo: computed.arquetipo,
    scoreA: computed.scores.A, scoreB: computed.scores.B, scoreC: computed.scores.C,
    scoreD: computed.scores.D, scoreE: computed.scores.E,
    prioridad
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

function renderResult(computed, prioridad){
  const a1 = archetypes[computed.primary];
  const a2 = archetypes[computed.secondary];

  resultTitle.textContent = `Resultado: ${a1.name}`;
  resultSubtitle.textContent = `Secundario: ${a2.name} · Prioridad interna: ${prioridad}`;

  resultContent.innerHTML = `
    <h3>${a1.tagline}</h3>
    <p>${escapeHtml(a1.description).replace(/\n/g,"<br/>")}</p>
    <hr/>
    <h3>🧠 Cómo suelen planificar</h3>
    <ul>${a1.planning.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
    <hr/>
    <h3>${a1.music.title}</h3>
    ${a1.music.blocks.map(b => `
      <h4>${escapeHtml(b.name)}</h4>
      <ul>${b.items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
    `).join("")}
    <p><strong>${escapeHtml(a1.music.close)}</strong></p>
    <hr/>
    <h3>✨ Matiz secundario: ${a2.name}</h3>
    <p class="muted"><strong>${escapeHtml(a2.tagline)}</strong></p>
  `;
}

show("#screen-intro");

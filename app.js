// ================================
// CONFIG
// ================================
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyq6c75P3nxAqX1WEj47zR468SyBmyrdKdQJiStmcVvS8SZYpkMkpqmHnd7lCyIYLO2kg/exec";
const WHATSAPP_BASE = "https://wa.me/595985689454";

const $ = (sel) => document.querySelector(sel);

function show(id){
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.add("hidden");
    s.setAttribute("hidden", "hidden");
  });

  const el = document.querySelector(id);
  el.classList.remove("hidden");
  el.removeAttribute("hidden");

  window.scrollTo({top:0, behavior:"smooth"});
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
// QUESTIONS (10 nuevas)
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
    set: ["Violín + piano (ideal con baby grand piano shell)", "Ceremonia: clásico/romántico refinado", "Cóctel: instrumental elegante con pop reinterpretado"]
  },
  B: {
    name: "🌿 Románticos Naturales",
    tagline: "Si no se siente auténtico, no es para nosotros.",
    brief: "Calidez, luz suave y emoción genuina. Menos show, más verdad.",
    full: "Priorizan conexión por encima del impacto. La música acompaña y sostiene la atmósfera sin invadir: romántica, orgánica, íntima.",
    set: ["Violín + piano íntimo", "Ceremonia: romántico suave", "Cóctel: indie/pop delicado instrumental"]
  },
  C: {
    name: "🎨 Creativos Vanguardistas",
    tagline: "No queremos una boda. Queremos una experiencia.",
    brief: "Editorial, audaz y con identidad propia. Un concepto, no un formato.",
    full: "Piensan en narrativa y diseño. La música puede sorprender con arreglos únicos y giros inesperados, siempre con estética cuidada.",
    set: ["Violín protagonista + piano", "Arreglos exclusivos", "Momento ‘wow’ elegante (performance breve)"]
  },
  D: {
    name: "🎉 Sociales Festivos",
    tagline: "Queremos que todos recuerden esta noche.",
    brief: "Celebración, energía y momentos compartidos. La emoción es expansiva.",
    full: "Diseñan pensando en la vibra del invitado. La música marca el ritmo y puede subir energía con inteligencia: transiciones hacia una fiesta inolvidable.",
    set: ["Violín con presencia escénica", "Hits instrumental en cóctel", "Performance sorpresa para activar"]
  },
  E: {
    name: "🤍 Íntimos Emocionales",
    tagline: "No buscamos espectáculo. Buscamos significado.",
    brief: "Profundidad, historia y emoción silenciosa. Momentos que se quedan en la piel.",
    full: "Priorizan lo verdadero. La música ideal es puente emocional: acompaña votos, lecturas y momentos simbólicos con sensibilidad.",
    set: ["Violín + piano minimalista", "Canciones personalizadas", "Momentos íntimos dirigidos con sensibilidad"]
  }
};

const musicModules = {
  M1: { name:"Acompañamiento Sutil", brief:"Presente, pero nunca compite.", full:"Ideal para atmósfera romántica e íntima. Violín + piano con arreglos suaves y transiciones fluidas." },
  M2: { name:"Protagonismo Sofisticado", brief:"Marca momentos clave con intención.", full:"La música guía entradas y clímax emocionales con coherencia estética. Violín + piano con arreglos personalizados." },
  M3: { name:"Momento WOW", brief:"Sorpresa elegante y memorable.", full:"Intervenciones breves y estratégicas para generar reacción. Performance sorpresa con estética cuidada." }
};

// ================================
// PRIORITY + INDEX
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

  if (lead.invitados === "80 – 150") points += 1;
  if (lead.invitados === "150 – 250") points += 2;
  if (lead.invitados === "Más de 250") points += 3;

  const v = (lead.venue || "").toLowerCase();
  if (v.indexOf("salón") >= 0 || v.indexOf("salon") >= 0) points += 1;
  if (v.indexOf("quinta") >= 0 || v.indexOf("estancia") >= 0) points += 2;
  if (v.indexOf("hotel") >= 0) points += 2;
  if (v.indexOf("playa") >= 0 || v.indexOf("destino") >= 0) points += 2;

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

// ================================
// ELEMENTS
// ================================
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
const resultBrief = $("#result-brief");
const resultDetails = $("#result-details");
const btnToggleDetails = $("#btn-toggle-details");
const btnRetry = $("#btn-retry");
const btnWA = $("#btn-wa");

// ================================
// EVENTS
// ================================
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
  const venue_otro = ($("#venue_otro")?.value || "").trim();
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
  intensityAnswers = Array(questions.length).fill(null);

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

  // FIN
  const computed = computeArchetype(answers);
  const intensity = computeIntensity(intensityAnswers, lead.vision_musical);
  const pr = computePriority(lead, intensity);
  const indice = getDesignIndex(pr.prioridad);

  renderResult(computed, intensity, pr.prioridad, indice);
  show("#screen-result");

  const payload = buildPayload(lead, answers, intensityAnswers, computed, intensity, pr.prioridad, pr.points, indice);

  if (!sending){
    sending = true;
    try{
      await enviarLeadASheets(payload);
    }catch(err){
      console.error("Error guardando lead:", err);
    }finally{
      sending = false;
    }
  }
});

btnToggleDetails.addEventListener("click", () => {
  const isHidden = resultDetails.classList.contains("hidden");
  if (isHidden){
    resultDetails.classList.remove("hidden");
    btnToggleDetails.textContent = "Ocultar análisis completo";
  }else{
    resultDetails.classList.add("hidden");
    btnToggleDetails.textContent = "Ver análisis completo";
  }
});

btnRetry.addEventListener("click", () => {
  lead = {};
  currentQ = 0;
  answers = Array(questions.length).fill(null);
  intensityAnswers = Array(questions.length).fill(null);
  leadForm.reset();
  venueOtroField.classList.add("hidden");
  resultDetails.classList.add("hidden");
  btnToggleDetails.textContent = "Ver análisis completo";
  show("#screen-intro");
});

// ================================
// RENDER QUESTION
// ================================
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

  q.options.forEach((opt) => {
    const div = document.createElement("div");
    div.className = "opt" + (answers[currentQ] === opt.key ? " selected" : "");
    div.innerHTML = `<span class="k">${opt.key}</span>${escapeHtml(opt.text)}`;

    div.addEventListener("click", () => {
      answers[currentQ] = opt.key;
      intensityAnswers[currentQ] = opt.music || null;

      [...qOptions.children].forEach(ch => ch.classList.remove("selected"));
      div.classList.add("selected");
      btnNext.disabled = false;
    });

    qOptions.appendChild(div);
  });
}

// ================================
// COMPUTE ARCHETYPE & INTENSITY
// ================================
function computeArchetype(ans){
  const scores = {A:0, B:0, C:0, D:0, E:0};
  ans.forEach(a => { if(a && scores[a] !== undefined) scores[a]++; });

  const sorted = Object.entries(scores).sort((x,y) => y[1]-x[1]);
  return { scores, primary: sorted[0][0], secondary: sorted[1][0] };
}

function computeIntensity(intensityArr, visionMusical){
  const m = {M1:0, M2:0, M3:0};
  intensityArr.forEach(x => { if(x && m[x] !== undefined) m[x]++; });

  if (visionMusical.indexOf("sencillo") >= 0) m.M1 += 1;
  if (visionMusical.indexOf("elegante") >= 0) m.M2 += 1;
  if (visionMusical.indexOf("impactante") >= 0) m.M3 += 1;
  if (visionMusical.indexOf("asesoramiento") >= 0) m.M2 += 1;

  const sorted = Object.entries(m).sort((a,b) => b[1]-a[1]);
  return sorted[0][0];
}

// ================================
// PAYLOAD + SEND
// ================================
function buildPayload(lead, answers, intensityAnswers, computed, intensity, prioridad, points, indice){
  return {
    nombre: lead.nombre,
    telefono: lead.telefono,
    fecha_boda: lead.fecha_boda,
    venue: lead.venue,
    invitados: lead.invitados,
    vision_musical: lead.vision_musical,

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
// RESULT RENDER
// ================================
function renderResult(computed, intensity, prioridad, indice){
  const a1 = archetypes[computed.primary];
  const a2 = archetypes[computed.secondary];
  const m = musicModules[intensity];

  resultTitle.textContent = `Resultado: ${a1.name}`;
  resultSubtitle.textContent = `Intensidad musical: ${m.name} · Prioridad interna: ${prioridad}`;

  resultBrief.innerHTML = `
    <h3>${escapeHtml(a1.tagline)}</h3>
    <p>${escapeHtml(a1.brief)}</p>
    <hr/>
    <h3>🎻 Estilo musical: ${escapeHtml(m.name)}</h3>
    <p>${escapeHtml(m.brief)}</p>
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

    <h3>🎼 Set recomendado</h3>
    <ul>${a1.set.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
  `;

  const text = `Hola Ceci! Hicimos el test y nos salió: ${a1.name} (secundario: ${a2.name}). Intensidad: ${m.name}. Prioridad interna: ${prioridad}. Queremos una propuesta personalizada 🙌`;
  btnWA.setAttribute("href", `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`);
}

// ================================
// INIT
// ================================
show("#screen-intro");
console.log("✅ app.js final cargado");

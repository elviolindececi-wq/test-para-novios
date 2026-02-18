// ================================
// CONFIG
// ================================
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyq6c75P3nxAqX1WEj47zR468SyBmyrdKdQJiStmcVvS8SZYpkMkpqmHnd7lCyIYLO2kg/exec";
const WHATSAPP_BASE = "https://wa.me/595985689454";

const $ = (sel) => document.querySelector(sel);

// ✅ show() robusto: soporta .hidden y atributo hidden
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

// ✅ escapeHtml sin replaceAll (evita crash en algunos móviles)
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
// STATE
// ================================
let lead = {};
let currentQ = 0;
let answers = Array(questions.length).fill(null);
let intensityAnswers = Array(questions.length).fill(null);

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

// (Resultado) si todavía no lo usás, no rompe
const btnRetry = $("#btn-retry");

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

btnNext.addEventListener("click", () => {
  if (!answers[currentQ]) return;

  if (currentQ < questions.length - 1){
    currentQ++;
    renderQuestion();
    return;
  }

  alert("✅ Fin del test (todavía falta conectar la pantalla de resultado en esta versión de diagnóstico).");
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
// INIT
// ================================
show("#screen-intro");
console.log("✅ app.js cargó correctamente");

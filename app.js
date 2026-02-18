/* =========================
   EL VIOLÍN DE CECI — PREMIUM UI (IMPROVED)
   ========================= */

:root{
  --bg:#0e0f14;
  --txt:#f2f2f6;
  --muted:#b7b8c6;
  --line:rgba(255,255,255,.10);
  --shadow: 0 16px 50px rgba(0,0,0,.45);
  --radius:18px;

  /* Gold (premium) */
  --gold:#d4af37;
  --gold2:#f3d27a;
  --gold3:#b8922c;
  --goldLine: rgba(212,175,55,.45);

  /* Surfaces */
  --surface: rgba(255,255,255,.035);

  /* Focus */
  --focus: rgba(255,255,255,.32);
}

*{box-sizing:border-box}
html, body{ height: 100%; }

body{
  margin:0;
  background:
    radial-gradient(1100px 720px at 18% 10%, rgba(27,30,50,.95) 0%, rgba(14,15,20,1) 58%),
    radial-gradient(900px 600px at 80% 0%, rgba(212,175,55,.10) 0%, rgba(14,15,20,0) 55%),
    radial-gradient(900px 600px at 80% 100%, rgba(120,180,255,.08) 0%, rgba(14,15,20,0) 55%),
    var(--bg);
  color:var(--txt);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.wrap{
  max-width: 900px;
  margin: 0 auto;
  padding: 26px 16px 44px;
}

/* hide utility: screens usan hidden (atributo) */
[hidden]{ display:none !important; }

/* =========================
   BRAND
   ========================= */
.brand{
  display:flex;
  gap:14px;
  align-items:center;
  margin-bottom: 18px;
}
.logo{
  width:46px;height:46px;
  display:grid;place-items:center;
  border:1px solid var(--line);
  border-radius:14px;
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}
.brand h1{
  margin:0;
  font-size: 18px;
  letter-spacing:.2px;
}
.subtitle{
  margin:2px 0 0;
  color:var(--muted);
  font-size: 13px;
}

/* =========================
   CARDS + SCREENS
   ========================= */
.card{
  background: linear-gradient(180deg, rgba(255,255,255,.055) 0%, rgba(255,255,255,.03) 100%);
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  padding: 22px;
  position: relative;
  overflow: hidden;
}
.card:before{
  content:"";
  position:absolute;
  inset:-2px;
  background:
    radial-gradient(600px 220px at 18% 0%, rgba(255,255,255,.06), transparent 60%),
    radial-gradient(520px 220px at 82% 0%, rgba(212,175,55,.05), transparent 60%);
  pointer-events:none;
}
.card > *{ position: relative; }

.screen{ margin-top: 14px; }

h2{
  margin: 6px 0 10px;
  font-size: 26px;
  line-height: 1.15;
  letter-spacing: -0.2px;
}

/* TITULOS EN DORADO */
h2,
#q-title,
#result-title{
  background: linear-gradient(
    135deg,
    #f5e6b8 0%,
    var(--gold2) 20%,
    var(--gold) 48%,
    var(--gold3) 70%,
    var(--gold2) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

p{ color: var(--txt); line-height: 1.62; margin: 0 0 10px; }
.muted{ color: var(--muted); }

.fineprint{
  margin-top: 12px;
  font-size: 12.5px;
  color: var(--muted);
}

.hint{
  margin-top: 6px;
  font-size: 12.5px;
  opacity: .9;
}

/* =========================
   PROGRESS (GOLD)
   ========================= */
.progress{
  width:100%;
  height:10px;
  border-radius: 999px;
  background: rgba(255,255,255,.055);
  overflow:hidden;
  margin-bottom: 14px;
  border: 1px solid rgba(255,255,255,.10);
}

.bar{
  height:100%;
  width: 0%;
  background: linear-gradient(90deg, var(--gold), var(--gold2), var(--gold3));
  box-shadow:
    0 0 12px rgba(212,175,55,.35),
    inset 0 0 8px rgba(255,255,255,.22);
  transition: width .4s ease;
  position: relative;
  overflow: hidden;
}

.bar::after{
  content:"";
  position:absolute;
  top:0;
  left:-50%;
  width:50%;
  height:100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.30), transparent);
  animation: shine 2.8s infinite;
}
@keyframes shine{
  0%{ left:-50%; }
  100%{ left:120%; }
}

/* =========================
   FORM
   ========================= */
.form{
  display:grid;
  gap: 14px;
  margin-top: 14px;
}
.field label{
  display:block;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 6px;
}
.field input, .field select{
  width:100%;
  padding: 12px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.22);
  color: var(--txt);
  outline:none;
  transition: border-color .15s ease, box-shadow .15s ease, transform .06s ease;
}
.field input:focus, .field select:focus{
  border-color: var(--focus);
  box-shadow: 0 0 0 4px rgba(255,255,255,.06);
}
.field input:active, .field select:active{
  transform: scale(.998);
}
.field small{
  display:block;
  color: var(--muted);
  margin-top: 6px;
  font-size: 12px;
}

.req{ color: rgba(255,255,255,.85); }

/* =========================
   BUTTONS
   ========================= */
.cta-row{
  display:flex;
  gap: 10px;
  margin-top: 14px;
}
.split{ justify-content: space-between; }
.stack{ flex-direction: column; }

.btn{
  appearance:none;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);
  color: var(--txt);
  padding: 12px 14px;
  border-radius: 12px;
  font-weight: 650;
  cursor: pointer;
  text-decoration:none;
  text-align:center;
  transition: transform .08s ease, background .15s ease, border-color .15s ease, box-shadow .15s ease;
}
.btn:hover{
  background: rgba(255,255,255,.10);
  border-color: rgba(255,255,255,.18);
  transform: translateY(-1px);
}
.btn:active{
  transform: translateY(0px) scale(.995);
}
.btn:disabled{
  opacity:.45;
  cursor:not-allowed;
  transform:none;
}

.primary{
  background: rgba(255,255,255,.92);
  color: #0e0f14;
  border-color: rgba(255,255,255,.92);
  box-shadow: 0 10px 26px rgba(0,0,0,.25);
}
.primary:hover{
  background: #ffffff;
  box-shadow: 0 14px 30px rgba(0,0,0,.30);
}
.ghost{ background: transparent; }

.btn:focus-visible{
  outline: none;
  box-shadow: 0 0 0 4px rgba(255,255,255,.10);
  border-color: rgba(255,255,255,.25);
}

/* =========================
   RESULT BOX
   ========================= */
.result-box{
  margin-top: 14px;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(0,0,0,.22);
  border-radius: 16px;
  padding: 16px;
}
.result-box h3{
  margin: 0 0 8px;
  font-size: 18px;
  letter-spacing: -0.15px;
}
.result-box h4{
  margin: 12px 0 6px;
  font-size: 15px;
  color: rgba(255,255,255,.92);
}
.result-box ul{ margin: 8px 0 0 18px; }
.result-box li{ margin: 6px 0; color: var(--txt); }

hr{
  border:0;
  border-top:1px solid rgba(255,255,255,.10);
  margin: 14px 0;
}

.foot{
  margin-top: 18px;
  color: var(--muted);
  font-size: 12px;
  text-align:center;
}

/* =========================
   QUIZ: FULL-SCREEN EDITORIAL
   ========================= */
#screen-quiz.card{
  padding: 28px 22px;
  min-height: calc(100dvh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.quiz-head{
  display:flex;
  justify-content: space-between;
  align-items:flex-start;
  gap: 10px;
}

#q-title{
  font-size: 34px;
  line-height: 1.12;
  letter-spacing: -0.25px;
  margin: 6px 0 10px;
}

#q-count{
  font-size: 12px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  opacity: .85;
}

/* Options */
.options{
  margin-top: 18px;
  display:grid;
  gap: 12px;
}

/* Opción como botón */
.opt{
  width: 100%;
  text-align: left;
  padding: 16px 16px;
  border-radius: 16px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.10);
  cursor: pointer;
  transition: transform .12s ease, background .12s ease, border-color .12s ease, box-shadow .12s ease;
  position: relative;
  color: var(--txt);
}
.opt:hover{
  background: rgba(255,255,255,.06);
  border-color: rgba(255,255,255,.18);
  transform: translateY(-1px);
}
.opt:active{
  transform: translateY(0px) scale(.995);
}
.opt:focus-visible{
  outline: none;
  box-shadow: 0 0 0 4px rgba(255,255,255,.10);
  border-color: rgba(255,255,255,.25);
}

/* Letra */
.opt .k{
  display:inline-block;
  min-width: 30px;
  text-align:center;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.05);
  margin-right: 10px;
  font-weight: 750;
  font-size: 13px;
  opacity: .95;
}

/* SELECTED GOLD */
.opt.selected{
  background: linear-gradient(135deg, rgba(212,175,55,.14), rgba(243,210,122,.06));
  border-color: rgba(212,175,55,.75);
  box-shadow:
    0 0 0 1px rgba(212,175,55,.20) inset,
    0 10px 26px rgba(0,0,0,.32),
    0 0 28px rgba(212,175,55,.16);
  animation: goldPop .16s ease;
}
.opt.selected .k{
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  border: none;
  color: #111;
  box-shadow: 0 8px 18px rgba(212,175,55,.28);
}

@keyframes goldPop{
  from{ transform: scale(.992); }
  to{ transform: scale(1); }
}

/* Animación suave */
.fade-in{
  animation: fadeIn .22s ease forwards;
}
@keyframes fadeIn{
  from{ opacity: 0; transform: translateY(8px); }
  to{ opacity: 1; transform: translateY(0); }
}

/* Acciones pegadas abajo (mejor UX mobile) */
.quiz-actions{
  margin-top: 16px;
  position: sticky;
  bottom: 0;
  padding-top: 10px;
  background: linear-gradient(180deg, rgba(14,15,20,0) 0%, rgba(14,15,20,.92) 55%, rgba(14,15,20,.98) 100%);
  backdrop-filter: blur(6px);
}

/* =========================
   GOLD CARD
   ========================= */
.gold-card{
  margin-top: 18px;
  padding: 22px 18px;
  border-radius: 18px;
  border: 1px solid var(--goldLine);
  background: linear-gradient(145deg, rgba(212,175,55,0.07), rgba(255,255,255,0.02));
  box-shadow: 0 16px 46px rgba(0,0,0,.40);
  animation: fadeInUp 0.55s ease forwards;
  opacity: 0;
}
@keyframes fadeInUp{
  from{ transform: translateY(14px); opacity: 0; }
  to{ transform: translateY(0); opacity: 1; }
}
.gold-title{
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(212,175,55,0.95);
  margin-bottom: 6px;
}
.gold-percentage{
  font-size: 46px;
  font-weight: 750;
  color: var(--gold);
  margin: 6px 0 10px;
}
.gold-text{
  color: rgba(255,255,255,0.88);
  font-size: 15px;
  line-height: 1.7;
}

/* =========================
   MOBILE POLISH
   ========================= */
@media (max-width: 520px){
  .wrap{ padding: 18px 12px 38px; }
  #q-title{ font-size: 28px; }
  #screen-quiz.card{ min-height: calc(100dvh - 120px); padding: 22px 16px; }
  .card{ padding: 18px; }
  .cta-row.split{ gap: 8px; }
  .btn{ padding: 12px 12px; }
}


import './Home.css';

const CalendarIllustration = () => (
  <div className="cal-wrapper">
    <div className="cal-bubble cal-bubble-clock">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" fill="white" stroke="#c7d2fe" strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="12" fill="#e0e7ff"/>
        <line x1="18" y1="10" x2="18" y2="18" stroke="rgb(5,3,139)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="18" x2="24" y2="21" stroke="rgb(5,3,139)" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="18" cy="18" r="2" fill="rgb(5,3,139)"/>
      </svg>
    </div>
    <div className="cal-bubble cal-bubble-chat-green">
      <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
        <rect width="40" height="30" rx="8" fill="#6ee7b7"/>
        <polygon points="8,30 16,30 8,38" fill="#6ee7b7"/>
        <circle cx="14" cy="15" r="3" fill="white"/>
        <circle cx="20" cy="15" r="3" fill="white"/>
        <circle cx="26" cy="15" r="3" fill="white"/>
      </svg>
    </div>
    <div className="cal-bubble cal-bubble-chat-teal">
      <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
        <rect width="40" height="30" rx="8" fill="#5eead4"/>
        <polygon points="8,30 16,30 8,38" fill="#5eead4"/>
        <rect x="10" y="10" width="20" height="3" rx="1.5" fill="white" opacity="0.8"/>
        <rect x="10" y="16" width="14" height="3" rx="1.5" fill="white" opacity="0.6"/>
      </svg>
    </div>
    <div className="cal-bubble cal-bubble-user">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1.5"/>
        <circle cx="18" cy="14" r="5" fill="#93c5fd"/>
        <path d="M8 28c0-5.5 4.5-9 10-9s10 3.5 10 9" fill="#93c5fd"/>
      </svg>
    </div>

    <div className="cal-main">
      <div className="cal-top-bar">
        <div className="cal-pin"></div>
        <div className="cal-pin"></div>
      </div>
      <div className="cal-header-bar"></div>
      <div className="cal-body">
        {[
          ['#1e40af','#c7d2fe','#c7d2fe','#c7d2fe','#a5f3fc'],
          ['#c7d2fe','#fde68a','#b45309','#1e40af','#c7d2fe'],
          ['#1e40af','#fde68a','#b45309','#1e40af','#a5f3fc'],
          ['#1e40af','#a5f3fc','#c7d2fe','#c7d2fe','#c7d2fe'],
        ].map((row, ri) => (
          <div key={ri} className="cal-row">
            {row.map((color, ci) => (
              <div key={ci} className="cal-cell" style={{ background: color }}></div>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div className="cal-check">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" fill="white" stroke="#bfdbfe" strokeWidth="2" opacity="0.9"/>
        <circle cx="30" cy="30" r="22" fill="#dbeafe" opacity="0.7"/>
        <polyline points="18,30 26,38 42,22" stroke="rgb(5,3,139)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

const features = [
  {
    title: 'Planner Inteligente',
    desc: 'Organize seus compromissos em um calendário visual e intuitivo. Visualize seus eventos e nunca mais perca um compromisso importante.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="4" y="10" width="44" height="38" rx="5" fill="rgb(5,3,139)" opacity="0.12"/>
        <rect x="4" y="10" width="44" height="13" rx="5" fill="rgb(5,3,139)"/>
        <rect x="4" y="18" width="44" height="5" fill="rgb(5,3,139)"/>
        <rect x="15" y="5" width="5" height="11" rx="2.5" fill="rgb(5,3,139)"/>
        <rect x="32" y="5" width="5" height="11" rx="2.5" fill="rgb(5,3,139)"/>
        <rect x="9"  y="28" width="7" height="6" rx="1.5" fill="#fde68a"/>
        <rect x="19" y="28" width="7" height="6" rx="1.5" fill="#fde68a"/>
        <rect x="29" y="28" width="7" height="6" rx="1.5" fill="#fde68a"/>
        <rect x="39" y="28" width="7" height="6" rx="1.5" fill="#fde68a"/>
        <rect x="9"  y="37" width="7" height="6" rx="1.5" fill="rgb(5,3,139)" opacity="0.3"/>
        <rect x="19" y="37" width="7" height="6" rx="1.5" fill="rgb(5,3,139)" opacity="0.3"/>
        <rect x="29" y="37" width="7" height="6" rx="1.5" fill="rgb(5,3,139)" opacity="0.3"/>
        <rect x="39" y="37" width="7" height="6" rx="1.5" fill="rgb(5,3,139)" opacity="0.3"/>
      </svg>
    ),
  },
  {
    title: 'Checklist Dinâmico',
    desc: 'Crie listas de tarefas personalizadas para cada evento. Marque itens como concluídos e acompanhe seu progresso em tempo real.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="6" width="28" height="36" rx="4" fill="rgb(5,3,139)"/>
        <rect x="14" y="14" width="20" height="3" rx="1.5" fill="white"/>
        <rect x="14" y="20" width="20" height="3" rx="1.5" fill="white"/>
        <rect x="14" y="26" width="14" height="3" rx="1.5" fill="white" opacity="0.7"/>
        <circle cx="6" cy="24" r="4" fill="rgb(5,3,139)" opacity="0.3"/>
        <circle cx="42" cy="24" r="4" fill="rgb(5,3,139)" opacity="0.3"/>
      </svg>
    ),
  },
  {
    title: 'Anexos multimídia',
    desc: 'Adicione contexto visual aos seus eventos com imagens e documentos. Mantenha tudo organizado em um só lugar.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 6C16 6 12 12 12 20v8l-4 4h32l-4-4v-8c0-8-4-14-12-14z" fill="rgb(5,3,139)"/>
        <rect x="20" y="38" width="8" height="4" rx="2" fill="rgb(5,3,139)"/>
        <circle cx="38" cy="12" r="5" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5"/>
        <circle cx="6" cy="20" r="4" fill="rgb(5,3,139)" opacity="0.3"/>
        <circle cx="42" cy="28" r="3" fill="rgb(5,3,139)" opacity="0.3"/>
      </svg>
    ),
  },
];

function Home({ setCurrentPage }) {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <svg viewBox="0 0 1440 560" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L1440,0 L1440,460 Q1100,560 720,520 Q360,480 0,540 Z" fill="#1f53ff2c" opacity="0.6"/> 
            <path d="M0,0 L1440,0 L1440,420 Q1000,540 600,500 Q200,460 0,510 Z" fill="#0065c488" opacity="0.4"/>
          </svg>
        </div>
        <div className="hero-content">
          <h1>Organize sua vida com o TaskHub</h1>
          <p>Sua agenda digital completa para planejar, organizar e conquistar seus objetivos.</p>
          <button className="cta-button" onClick={() => setCurrentPage('cadastro')}>Começar agora</button>
        </div>
        <div className="hero-image">
          <CalendarIllustration />
        </div>
      </section>

      {/* Key Features */}
      <section className="features">
        <h2>Recursos</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

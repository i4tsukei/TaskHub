import './Home.css';

function Home({ setCurrentPage, darkTheme }) {
  return (
    <div className={`home ${darkTheme ? 'dark-theme' : ''}`}>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Organize sua vida com o <span className="brand">TaskHub</span>
          </h1>
          <p className="hero-subtitle">
            Sua agenda digital completa para planejar, organizar e conquistar seus objetivos
          </p>
          <button className="cta-button" onClick={() => setCurrentPage('cadastro')}>Começar Agora</button>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <div className="card-header">📅 Hoje</div>
            <div className="task-item">✓ Reunião às 10h</div>
            <div className="task-item">📝 Revisar projeto</div>
            <div className="task-item">🎯 Academia</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
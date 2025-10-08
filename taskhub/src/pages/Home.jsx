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

      <section className="recursos-section">
        <div className="container">
          <h2 className="section-title">Recursos</h2>
          <div className="recursos-grid">
            <div className="recurso-card">
              <div className="recurso-icon">📅</div>
              <h3>Planner Inteligente</h3>
              <p>Organize seus compromissos em um calendário visual e intuitivo. Visualize seus eventos e nunca mais perca um compromisso importante.</p>
            </div>
            <div className="recurso-card">
              <div className="recurso-icon">✓</div>
              <h3>Checklist Dinâmico</h3>
              <p>Crie listas de tarefas personalizadas para cada evento. Marque itens como concluídos e acompanhe seu progresso em tempo real.</p>
            </div>
            <div className="recurso-card">
              <div className="recurso-icon">📎</div>
              <h3>Anexos Multimídia</h3>
              <p>Adicione contexto visual aos seus eventos com imagens e documentos. Mantenha tudo organizado em um só lugar.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="diferenciais-section">
        <div className="container">
          <h2 className="section-title">Por que escolher o TaskHub?</h2>
          <div className="diferenciais-list">
            <div className="diferencial-item">
              <div className="diferencial-number">1</div>
              <div className="diferencial-content">
                <h3>Interface Moderna</h3>
                <p>Design clean e intuitivo que facilita o uso diário</p>
              </div>
            </div>
            <div className="diferencial-item">
              <div className="diferencial-number">2</div>
              <div className="diferencial-content">
                <h3>Tudo Integrado</h3>
                <p>Planner, checklist e anexos em uma única plataforma</p>
              </div>
            </div>
            <div className="diferencial-item">
              <div className="diferencial-number">3</div>
              <div className="diferencial-content">
                <h3>Fácil de Usar</h3>
                <p>Criado para ser simples e eficiente no dia a dia</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
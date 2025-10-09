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

      {/* Sobre Section */}
      <section className="sobre" id="sobre">
        <div className="sobre-container">
          <div className="sobre-header">
            <h2>Sobre o TaskHub</h2>
            <p>Uma plataforma completa para organizar sua vida digital</p>
          </div>

          <div className="recursos-section">
            <h3>Recursos</h3>
            <div className="recursos-grid">
              <div className="recurso-item">
                <h4>Planner Inteligente</h4>
                <p>Organize seus compromissos em um calendário visual e intuitivo. Visualize seus eventos e nunca mais perca um compromisso importante.</p>
              </div>
              <div className="recurso-item">
                <h4>Checklist Dinâmico</h4>
                <p>Crie listas de tarefas personalizadas para cada evento. Marque itens como concluídos e acompanhe seu progresso em tempo real.</p>
              </div>
            </div>
            <div className="recurso-item recurso-centered">
              <h4>Anexos Multimídia</h4>
              <p>Adicione contexto visual aos seus eventos com imagens e documentos. Mantenha tudo organizado em um só lugar.</p>
            </div>
          </div>

          <div className="diferenciais-section">
            <h3>Por que escolher o TaskHub?</h3>
            <div className="diferenciais-list">
              <div className="diferencial-item">
                <div className="diferencial-number">1</div>
                <div className="diferencial-content">
                  <h4>Interface Moderna</h4>
                  <p>Design clean e intuitivo que facilita o uso diário</p>
                </div>
              </div>
              <div className="diferencial-item">
                <div className="diferencial-number">2</div>
                <div className="diferencial-content">
                  <h4>Tudo Integrado</h4>
                  <p>Planner, checklist e anexos em uma única plataforma</p>
                </div>
              </div>
              <div className="diferencial-item">
                <div className="diferencial-number">3</div>
                <div className="diferencial-content">
                  <h4>Fácil de Usar</h4>
                  <p>Criado para ser simples e eficiente no dia a dia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
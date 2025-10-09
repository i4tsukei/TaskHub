import './Home.css';

function Home({ setCurrentPage, darkTheme }) {
  const currentDate = new Date();
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
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
          <div className="cards-container">
            <div className="top-cards">
              <div className="agenda-preview">
                <div className="agenda-header">
                  <span className="month">{currentMonth} {currentYear}</span>
                  <div className="nav-arrows">
                    <span>‹</span>
                    <span>›</span>
                  </div>
                </div>
                <div className="calendar-grid">
                  <div className="day-header">D</div>
                  <div className="day-header">S</div>
                  <div className="day-header">T</div>
                  <div className="day-header">Q</div>
                  <div className="day-header">Q</div>
                  <div className="day-header">S</div>
                  <div className="day-header">S</div>
                  <div className="day">31</div>
                  <div className="day">1</div>
                  <div className="day">2</div>
                  <div className="day">3</div>
                  <div className="day">4</div>
                  <div className="day">5</div>
                  <div className="day">6</div>
                  <div className="day">7</div>
                  <div className="day">8</div>
                  <div className="day">9</div>
                  <div className="day">10</div>
                  <div className="day">11</div>
                  <div className="day">12</div>
                  <div className="day">13</div>
                  <div className="day today">14</div>
                  <div className="day event">15</div>
                  <div className="day">16</div>
                  <div className="day">17</div>
                  <div className="day event">18</div>
                  <div className="day">19</div>
                  <div className="day">20</div>
                </div>
                <div className="event-list">
                  <div className="event-item">
                    <span className="event-dot"></span>
                    <span>Reunião - 10h</span>
                  </div>
                  <div className="event-item">
                    <span className="event-dot"></span>
                    <span>Projeto - 14h</span>
                  </div>
                </div>
              </div>
              
              <div className="create-event-preview">
                <div className="agenda-header">
                  <span className="month">Novo Evento</span>
                </div>
                <div className="event-list">
                  <div className="event-item">
                    <span>📅 Selecionar data</span>
                  </div>
                  <div className="event-item">
                    <span>🕐 Definir horário</span>
                  </div>
                  <div className="event-item">
                    <span>📝 Adicionar título</span>
                  </div>
                  <div className="event-item">
                    <span>📎 Anexar arquivos</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="events-preview">
              <div className="agenda-header">
                <span className="month">Próximos Eventos</span>
              </div>
              <div className="event-list">
                <div className="event-item">
                  <span>Natação - 18h</span>
                </div>
                <div className="event-item">
                  <span>Aniversário - 19h</span>
                </div>
                <div className="event-item">
                  <span>Academia - 7h</span>
                </div>
                <div className="event-item">
                  <span>Dentista - 14h</span>
                </div>
              </div>
            </div>
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
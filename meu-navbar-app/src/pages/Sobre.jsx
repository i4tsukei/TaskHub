import './Sobre.css';

function Sobre() {
  return (
    <div className="sobre">
      <section className="recursos">
        <h2>Nossos Recursos</h2>
        <div className="recursos-grid">
          <div className="recurso-card">
            <div className="recurso-icon">📋</div>
            <h3>Planner Inteligente</h3>
            <p>Organize seus compromissos em um calendário visual e intuitivo. Visualize seus eventos, defina lembretes e nunca mais perca um compromisso importante.</p>
            <ul>
              <li>Calendário mensal interativo</li>
              <li>Visualização de eventos por dia</li>
              <li>Interface similar ao Google Calendar</li>
            </ul>
          </div>

          <div className="recurso-card">
            <div className="recurso-icon">✅</div>
            <h3>Checklist Dinâmico</h3>
            <p>Crie listas de tarefas personalizadas para cada evento. Marque itens como concluídos e acompanhe seu progresso em tempo real.</p>
            <ul>
              <li>Adicionar itens ilimitados</li>
              <li>Marcar como concluído</li>
              <li>Organização por prioridade</li>
            </ul>
          </div>

          <div className="recurso-card">
            <div className="recurso-icon">📎</div>
            <h3>Anexos Multimídia</h3>
            <p>Adicione contexto visual aos seus eventos com imagens, documentos e links. Mantenha tudo organizado em um só lugar.</p>
            <ul>
              <li>Upload de imagens</li>
              <li>Preview instantâneo</li>
              <li>Organização visual</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="diferenciais">
        <h2>Por que escolher o TaskHub?</h2>
        <div className="diferenciais-content">
          <div className="diferencial-item">
            <div className="diferencial-number">01</div>
            <div className="diferencial-text">
              <h3>Interface Moderna</h3>
              <p>Design clean e intuitivo que facilita o uso diário</p>
            </div>
          </div>
          <div className="diferencial-item">
            <div className="diferencial-number">02</div>
            <div className="diferencial-text">
              <h3>Tudo Integrado</h3>
              <p>Planner, checklist e anexos em uma única plataforma</p>
            </div>
          </div>
          <div className="diferencial-item">
            <div className="diferencial-number">03</div>
            <div className="diferencial-text">
              <h3>Fácil de Usar</h3>
              <p>Criado para ser simples e eficiente no dia a dia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sobre;
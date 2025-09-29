import { useState } from 'react';
import './Dashboard.css';

function Dashboard({ darkTheme }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [events] = useState([
    { id: 1, title: 'Reunião de equipe', date: '2025-01-15', time: '09:00', color: '#1a73e8', icon: '👥' },
    { id: 2, title: 'Apresentação projeto', date: '2025-01-16', time: '14:30', color: '#34a853', icon: '💼' },
    { id: 3, title: 'Consulta médica', date: '2025-01-17', time: '10:00', color: '#ea4335', icon: '🏥' }
  ]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const getTodayEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date === today);
  };

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date > today).slice(0, 5);
  };

  return (
    <div className={`dashboard-container ${darkTheme ? 'dark-theme' : ''}`}>
      <button className={`menu-toggle ${showSidebar ? 'open' : ''}`} onClick={toggleSidebar}>
        ☰
      </button>
      
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-item" onClick={() => window.location.href = '/?page=agenda'}>
            <div className="sidebar-label">Agenda</div>
          </div>
          <div className="sidebar-item" onClick={() => window.location.href = '/?page=perfil'}>
            <div className="sidebar-label">Perfil</div>
          </div>
          <div className="sidebar-item">
            <div className="sidebar-label">Configurações</div>
          </div>
        </div>
      </div>

      <div className={`dashboard-content ${showSidebar ? 'sidebar-open' : ''}`}>
        <div className="dashboard-header">
          <h1>Bem-vindo ao TaskHub</h1>
          <p>Gerencie suas atividades e mantenha-se organizado</p>
        </div>

        <div className="activities-section">
          <div className="today-section">
            <h2>Hoje</h2>
            <div className="events-list">
              {getTodayEvents().length > 0 ? (
                getTodayEvents().map(event => (
                  <div key={event.id} className="event-card" style={{ borderLeftColor: event.color }}>
                    <div className="event-info">
                      <div className="event-title">
                        {event.icon && <span className="event-icon">{event.icon}</span>}
                        {event.title}
                      </div>
                      <div className="event-time">{event.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">Nenhuma atividade para hoje</div>
              )}
            </div>
          </div>

          <div className="upcoming-section">
            <h2>Próximas Atividades</h2>
            <div className="events-list">
              {getUpcomingEvents().length > 0 ? (
                getUpcomingEvents().map(event => (
                  <div key={event.id} className="event-card" style={{ borderLeftColor: event.color }}>
                    <div className="event-info">
                      <div className="event-title">
                        {event.icon && <span className="event-icon">{event.icon}</span>}
                        {event.title}
                      </div>
                      <div className="event-details">
                        <span className="event-date">{formatDate(event.date)}</span>
                        <span className="event-time">{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">Nenhuma atividade programada</div>
              )}
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <button className="quick-action-btn" onClick={() => window.location.href = '/?page=agenda'}>
            + Nova Atividade
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
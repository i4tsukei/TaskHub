import { useState } from 'react';
import './Dashboard.css';

function Dashboard({ darkTheme, setDarkTheme = () => {} }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [localDarkTheme, setLocalDarkTheme] = useState(darkTheme);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [events] = useState([
    { id: 1, title: 'Reunião de equipe', date: '2025-01-15', time: '09:00', color: '#1a73e8', icon: '👥' },
    { id: 2, title: 'Apresentação projeto', date: '2025-01-16', time: '14:30', color: '#34a853', icon: '💼' },
    { id: 3, title: 'Consulta médica', date: '2025-01-17', time: '10:00', color: '#ea4335', icon: '🏥' }
  ]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleThemeChange = (isDark) => {
    setLocalDarkTheme(isDark);
    if (setDarkTheme) setDarkTheme(isDark);
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
          <div className="sidebar-item" onClick={() => setShowNotifications(true)}>
            <div className="sidebar-label">Notificações</div>
          </div>
          <div className="sidebar-item" onClick={() => setShowSettings(true)}>
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

      {showSettings && (
        <div className="event-overlay">
          <div className="settings-modal">
            <div className="settings-header">
              <h2>Configurações</h2>
              <button className="close-btn" onClick={() => setShowSettings(false)}>×</button>
            </div>
            
            <div className="settings-body">
              <div className="settings-section">
                <h3>Preferências</h3>
                <div className="setting-item">
                  <label>Primeiro dia da semana:</label>
                  <select className="setting-select">
                    <option value="0">Domingo</option>
                    <option value="1">Segunda-feira</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Formato de hora:</label>
                  <select className="setting-select">
                    <option value="24">24 horas</option>
                    <option value="12">12 horas (AM/PM)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Tema:</label>
                  <select className="setting-select" value={localDarkTheme ? 'dark' : 'light'} onChange={(e) => handleThemeChange(e.target.value === 'dark')}>
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNotifications && (
        <div className="event-overlay">
          <div className="notifications-modal">
            <div className="notifications-header">
              <h2>Notificações</h2>
              <div className="notifications-controls">
                <button 
                  className={`toggle-notifications-btn ${notificationsEnabled ? 'enabled' : 'disabled'}`}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                >
                  {notificationsEnabled ? 'Desativar' : 'Ativar'}
                </button>
                <button className="close-btn" onClick={() => setShowNotifications(false)}>×</button>
              </div>
            </div>
            
            <div className="notifications-body">
              <div className="notification-item">
                <div className="notification-content">
                  <div className="notification-title">Evento próximo</div>
                  <div className="notification-text">Reunião de equipe em 15 minutos</div>
                  <div className="notification-time">Há 2 minutos</div>
                </div>
              </div>
              
              <div className="notification-item">
                <div className="notification-content">
                  <div className="notification-title">Tarefa concluída</div>
                  <div className="notification-text">Apresentação finalizada com sucesso</div>
                  <div className="notification-time">Há 1 hora</div>
                </div>
              </div>
              
              <div className="notification-item">
                <div className="notification-content">
                  <div className="notification-title">Lembrete</div>
                  <div className="notification-text">Revisar documentos para reunião de amanhã</div>
                  <div className="notification-time">Há 3 horas</div>
                </div>
              </div>
              
              <div className="notification-empty">
                <div className="empty-text">Você está em dia!</div>
                <div className="empty-subtext">Nenhuma notificação pendente</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
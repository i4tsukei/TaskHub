import { useState, useEffect } from 'react';
import './Dashboard.css';
import AgendaService from '../services/AgendaService';
import NotificacaoService from '../services/NotificacaoService';
import ConfiguracaoService from '../services/ConfiguracaoService';
import UsuarioService from '../services/UsuarioService';

function Dashboard({ darkTheme, setDarkTheme = () => {} }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [events, setEvents] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);
  const [configuracao, setConfiguracao] = useState(null);

  useEffect(() => {
    const user = UsuarioService.getCurrentUser();
    if (user) {
      AgendaService.findByUsuarioId(user.id)
        .then((response) => setEvents(response.data))
        .catch(error => console.error('Erro ao carregar agendas:', error));

      NotificacaoService.findByUsuarioId(user.id)
        .then((response) => setNotificacoes(response.data))
        .catch(error => console.error('Erro ao carregar notificações:', error));

      ConfiguracaoService.findByUsuarioId(user.id)
        .then((response) => setConfiguracao(response.data))
        .catch(error => console.error('Erro ao carregar configurações:', error));
    }
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleThemeChange = (isDark) => {
    setDarkTheme(isDark);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const getTodayEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.dataAgenda === today);
  };

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.dataAgenda > today).slice(0, 5);
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
          <div className="sidebar-item" onClick={() => window.location.href = '/?page=home'}>
            <div className="sidebar-label">Sair</div>
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
                  <div key={event.id} className="event-card" style={{ borderLeftColor: event.cor || '#1a73e8' }}>
                    <div className="event-info">
                      <div className="event-title">
                        {event.titulo}
                      </div>
                      <div className="event-time">{event.hora}</div>
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
                  <div key={event.id} className="event-card" style={{ borderLeftColor: event.cor || '#1a73e8' }}>
                    <div className="event-info">
                      <div className="event-title">
                        {event.titulo}
                      </div>
                      <div className="event-details">
                        <span className="event-date">{formatDate(event.dataAgenda)}</span>
                        <span className="event-time">{event.hora}</span>
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
                  <select
                    className="setting-select"
                    value={configuracao?.primeiroDiaSemana || 'Domingo'}
                    onChange={(e) => {
                      const updated = { ...configuracao, primeiroDiaSemana: e.target.value };
                      setConfiguracao(updated);
                      const user = UsuarioService.getCurrentUser();
                      if (configuracao?.id) {
                        ConfiguracaoService.update(configuracao.id, updated);
                      } else {
                        ConfiguracaoService.create({ ...updated, usuarioId: user.id, formatoHora: updated.formatoHora || '24' })
                          .then(r => setConfiguracao(r.data));
                      }
                    }}
                  >
                    <option value="Domingo">Domingo</option>
                    <option value="Segunda-feira">Segunda-feira</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Formato de hora:</label>
                  <select
                    className="setting-select"
                    value={configuracao?.formatoHora || '24'}
                    onChange={(e) => {
                      const updated = { ...configuracao, formatoHora: e.target.value };
                      setConfiguracao(updated);
                      const user = UsuarioService.getCurrentUser();
                      if (configuracao?.id) {
                        ConfiguracaoService.update(configuracao.id, updated);
                      } else {
                        ConfiguracaoService.create({ ...updated, usuarioId: user.id })
                          .then(r => setConfiguracao(r.data));
                      }
                    }}
                  >
                    <option value="24">24 horas</option>
                    <option value="12">12 horas (AM/PM)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Tema:</label>
                  <select
                    className="setting-select"
                    value={darkTheme ? 'dark' : 'light'}
                    onChange={(e) => {
                      const isDark = e.target.value === 'dark';
                      handleThemeChange(isDark);
                      const updated = { ...configuracao, tema: e.target.value };
                      setConfiguracao(updated);
                      const user = UsuarioService.getCurrentUser();
                      if (configuracao?.id) {
                        ConfiguracaoService.update(configuracao.id, updated);
                      } else {
                        ConfiguracaoService.create({ ...updated, usuarioId: user.id, formatoHora: updated.formatoHora || '24' })
                          .then(r => setConfiguracao(r.data));
                      }
                    }}
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                  </select>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Privacidade</h3>
                <div className="privacy-item">
                  <label>Mostrar email</label>
                  <input
                    type="checkbox"
                    checked={configuracao?.mostrarEmail || false}
                    onChange={(e) => {
                      const updated = { ...configuracao, mostrarEmail: e.target.checked };
                      setConfiguracao(updated);
                      const user = UsuarioService.getCurrentUser();
                      if (configuracao?.id) {
                        ConfiguracaoService.update(configuracao.id, updated);
                      } else {
                        ConfiguracaoService.create({ ...updated, usuarioId: user.id, formatoHora: updated.formatoHora || '24' })
                          .then(r => setConfiguracao(r.data));
                      }
                    }}
                  />
                </div>
                <div className="privacy-item">
                  <label>Receber notificações</label>
                  <input
                    type="checkbox"
                    checked={configuracao?.receberEmail !== false}
                    onChange={(e) => {
                      const updated = { ...configuracao, receberEmail: e.target.checked };
                      setConfiguracao(updated);
                      const user = UsuarioService.getCurrentUser();
                      if (configuracao?.id) {
                        ConfiguracaoService.update(configuracao.id, updated);
                      } else {
                        ConfiguracaoService.create({ ...updated, usuarioId: user.id, formatoHora: updated.formatoHora || '24' })
                          .then(r => setConfiguracao(r.data));
                      }
                    }}
                  />
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
              {notificacoes.length > 0 ? (
                notificacoes.map(n => (
                  <div key={n.id} className="notification-item">
                    <div className="notification-content">
                      <div className="notification-title">{n.statusNotificacao}</div>
                      <div className="notification-text">{n.mensagem}</div>
                      <div className="notification-time">{new Date(n.dataEnvio).toLocaleString('pt-BR')}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="notification-empty">
                  <div className="empty-text">Você está em dia!</div>
                  <div className="empty-subtext">Nenhuma notificação pendente</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
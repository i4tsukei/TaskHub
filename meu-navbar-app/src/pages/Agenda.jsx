import { useState } from 'react';
import './Agenda.css';

function Agenda() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    checklist: [],
    image: null,
    color: '#1a73e8'
  });
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, eventId: null });
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('geral');

  const eventColors = {
    purple: '#c684d1ff',
    pink: '#e961ddff',
    blue: '#7badeeff',
    yellow: '#ffc15eff',
    red: '#f35b5bff',
    orange: '#f0a739ff',
    green: '#87ec8cff'
  };

  const handleAddEvent = () => {
    if (eventForm.title && eventForm.date) {
      if (eventForm.id) {
        // Editando evento existente
        setEvents(events.map(event => 
          event.id === eventForm.id ? eventForm : event
        ));
      } else {
        // Criando novo evento
        setEvents([...events, { ...eventForm, id: Date.now() }]);
      }
      setEventForm({ title: '', date: '', time: '', description: '', checklist: [], image: null, color: '#1a73e8' });
      setShowModal(false);
    }
  };

  const handleEventRightClick = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      eventId
    });
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setContextMenu({ show: false, x: 0, y: 0, eventId: null });
  };

  const changeEventColor = (eventId, color) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, color } : event
    ));
    setContextMenu({ show: false, x: 0, y: 0, eventId: null });
  };

  const closeContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, eventId: null });
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleNewEvent = () => {
    setEventForm({ title: '', date: '', time: '', description: '', checklist: [], image: null, color: '#1a73e8' });
    setShowModal(true);
    setShowSidebar(false);
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const updateEventChecklistItem = (eventId, itemIndex, completed) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const updatedChecklist = event.checklist.map((item, index) => 
          index === itemIndex ? { ...item, completed } : item
        );
        return { ...event, checklist: updatedChecklist };
      }
      return event;
    }));
    
    // Atualizar também o selectedEvent para refletir a mudança imediatamente
    if (selectedEvent && selectedEvent.id === eventId) {
      const updatedChecklist = selectedEvent.checklist.map((item, index) => 
        index === itemIndex ? { ...item, completed } : item
      );
      setSelectedEvent({ ...selectedEvent, checklist: updatedChecklist });
    }
  };

  const editEvent = () => {
    setEventForm(selectedEvent);
    setShowEventDetails(false);
    setShowModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setEventForm({ ...eventForm, image: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  const addChecklistItem = () => {
    setEventForm({
      ...eventForm,
      checklist: [...eventForm.checklist, { text: '', completed: false }]
    });
  };

  const updateChecklistItem = (index, field, value) => {
    const newChecklist = [...eventForm.checklist];
    newChecklist[index][field] = value;
    setEventForm({ ...eventForm, checklist: newChecklist });
  };

  const getDaysInMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const formatDate = (day) => {
    const month = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${currentYear}-${month}-${dayStr}`;
  };

  const getEventsForDay = (day) => {
    const dateStr = formatDate(day);
    return events.filter(event => event.date === dateStr);
  };

  const handleDayClick = (day) => {
    if (day) {
      const dateStr = formatDate(day);
      setEventForm({ ...eventForm, date: dateStr });
      setShowModal(true);
    }
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="agenda-container" onClick={closeContextMenu}>
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      {showSidebar && (
        <div className="sidebar">
          <div className="sidebar-content">
          <div className="sidebar-item" onClick={handleNewEvent}>
            <div className="sidebar-icon">+</div>
            <div className="sidebar-label">Novo Evento</div>
          </div>
          <div className="sidebar-item" onClick={() => window.location.reload()}>
            <div className="sidebar-icon">⌂</div>
            <div className="sidebar-label">Página Inicial</div>
          </div>
          <div className="sidebar-item" onClick={() => setShowNotifications(true)}>
            <div className="sidebar-icon">◉</div>
            <div className="sidebar-label">Notificações</div>
          </div>
          <div className="sidebar-item" onClick={handleSettings}>
            <div className="sidebar-icon">⚙</div>
            <div className="sidebar-label">Configurações</div>
          </div>
          <div className="sidebar-item">
            <div className="sidebar-icon">↓</div>
            <div className="sidebar-label">Exportar</div>
          </div>
          </div>
        </div>
      )}
      
      <div className="calendar">
        <div className="calendar-navigation">
          <div className="month-year">
            <select 
              value={currentMonth} 
              onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
              className="month-selector"
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select 
              value={currentYear} 
              onChange={(e) => setCurrentYear(parseInt(e.target.value))}
              className="year-selector"
            >
              {Array.from({length: currentYear - 2019 + 11}, (_, i) => 2019 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="nav-buttons">
            <button onClick={prevMonth} className="nav-btn">‹</button>
            <button onClick={nextMonth} className="nav-btn">›</button>
          </div>
        </div>
        <div className="calendar-header">
          <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
        </div>
        <div className="calendar-grid">
          {getDaysInMonth().map((day, index) => (
            <div 
              key={index} 
              className={`calendar-day ${day ? 'active' : 'inactive'}`}
              onClick={() => handleDayClick(day)}
            >
              {day && (
                <>
                  <span className="day-number">{day}</span>
                  <div className="day-events">
                    {getEventsForDay(day).map(event => (
                      <div 
                        key={event.id} 
                        className="event-preview"
                        style={{ backgroundColor: event.color || '#1a73e8' }}
                        onClick={(e) => handleEventClick(e, event)}
                        onContextMenu={(e) => handleEventRightClick(e, event.id)}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="event-overlay">
          <div className="event-form">
            <div className="form-header">
              <div className="event-color" style={{ backgroundColor: eventForm.color }}></div>
              <input
                type="text"
                placeholder="Adicionar título"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="title-input"
              />
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="form-body">
              <div className="form-field">
                <div className="field-icon"></div>
                <div className="field-content">
                  <div className="datetime-row">
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="date-input"
                    />
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="time-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-field">
                <div className="field-icon"></div>
                <div className="field-content">
                  <textarea
                    placeholder="Adicionar descrição"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="description-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <div className="field-icon"></div>
                <div className="field-content">
                  <div className="checklist-header">
                    <span>Checklist</span>
                    <button type="button" onClick={addChecklistItem} className="add-item-btn">+</button>
                  </div>
                  {eventForm.checklist.map((item, index) => (
                    <div key={index} className="checklist-item">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => updateChecklistItem(index, 'completed', e.target.checked)}
                      />
                      <input
                        type="text"
                        placeholder="Adicionar item"
                        value={item.text}
                        onChange={(e) => updateChecklistItem(index, 'text', e.target.value)}
                        className="checklist-text"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <div className="field-icon"></div>
                <div className="field-content">
                  <div className="attachment-header">
                    <span>Anexos</span>
                    <label className="file-upload-btn">
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} />
                      Adicionar arquivo
                    </label>
                  </div>
                  {eventForm.image && (
                    <div className="attachment-preview">
                      <div className="image-container">
                        <img src={eventForm.image} alt="Preview" className="image-preview" />
                        <button 
                          type="button" 
                          onClick={() => setEventForm({ ...eventForm, image: null })}
                          className="delete-image-btn"
                          title="Remover imagem"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-footer">
              <button className="save-btn" onClick={handleAddEvent}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {showEventDetails && selectedEvent && (
        <div className="event-overlay">
          <div className="event-details">
            <div className="details-header">
              <div className="event-color" style={{ backgroundColor: selectedEvent.color || '#1a73e8' }}></div>
              <h2 className="event-title">{selectedEvent.title}</h2>
              <div className="header-actions">
                <button className="edit-btn" onClick={editEvent}>Editar</button>
                <button className="close-btn" onClick={() => setShowEventDetails(false)}>×</button>
              </div>
            </div>
            
            <div className="details-body">
              {selectedEvent.date && (
                <div className="detail-item">
                  <span className="detail-label">Data:</span>
                  <span className="detail-value">{selectedEvent.date.split('-').reverse().join('/')}</span>
                </div>
              )}
              
              {selectedEvent.time && (
                <div className="detail-item">
                  <span className="detail-label">Horário:</span>
                  <span className="detail-value">{selectedEvent.time}</span>
                </div>
              )}
              
              {selectedEvent.description && (
                <div className="detail-item">
                  <span className="detail-label">Descrição:</span>
                  <p className="detail-description">{selectedEvent.description}</p>
                </div>
              )}
              
              {selectedEvent.checklist && selectedEvent.checklist.length > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Checklist:</span>
                  <div className="detail-checklist">
                    {selectedEvent.checklist.map((item, index) => (
                      <div key={index} className="checklist-detail-item">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={(e) => updateEventChecklistItem(selectedEvent.id, index, e.target.checked)}
                          className="detail-checkbox"
                        />
                        <span className={item.completed ? 'completed-text' : ''}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedEvent.image && (
                <div className="detail-item">
                  <span className="detail-label">Anexo:</span>
                  <img src={selectedEvent.image} alt="Anexo" className="detail-image" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {contextMenu.show && (
        <div 
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="context-menu-item delete" onClick={() => deleteEvent(contextMenu.eventId)}>
            Excluir evento
          </div>
          <div className="context-menu-divider"></div>
          <div className="context-menu-section">
            <div className="context-menu-title">Alterar cor</div>
            <div className="color-options">
              {Object.entries(eventColors).map(([name, color]) => (
                <div
                  key={name}
                  className="color-option"
                  style={{ backgroundColor: color }}
                  onClick={() => changeEventColor(contextMenu.eventId, color)}
                  title={name}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

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
                  <select className="setting-select">
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="auto">Automático</option>
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
              <button className="close-btn" onClick={() => setShowNotifications(false)}>×</button>
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
            
            <div className="notifications-footer">
              <button className="clear-all-btn">Limpar todas</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Agenda;
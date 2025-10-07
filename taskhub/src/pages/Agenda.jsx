import { useState } from 'react';
import './Agenda.css';

function Agenda({ darkTheme = false, setDarkTheme = () => {} }) {
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
    color: '#1a73e8',
    icon: ''
  });
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, eventId: null });
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [localDarkTheme, setLocalDarkTheme] = useState(darkTheme);

  const handleThemeChange = (isDark) => {
    setLocalDarkTheme(isDark);
    if (setDarkTheme) setDarkTheme(isDark);
  };


  const eventIcons = {
    default: '',
    meeting: '👥',
    work: '💼',
    personal: '👤',
    birthday: '🎂',
    reminder: '⏰',
    travel: '✈️',
    health: '🏥',
    sport: '⚽',
    food: '🍽️',
    shopping: '🛍️',
    car: '🚗',
    home: '🏠',
    school: '🏫',
    money: '💰',
    heart: '❤️',
    star: '⭐',
    fire: '🔥',
    music: '🎵',
    movie: '🎥',
    book: '📚',
    phone: '📱',
    email: '📧',
    calendar: '📅',
    gift: '🎁',
    party: '🎉',
    coffee: '☕',
    pizza: '🍕',
    beach: '🏖️',
    mountain: '⛰️',
    sun: '☀️',
    rain: '🌧️',
    snow: '❄️',
    tree: '🌳',
    flower: '🌸',
    dog: '🐶',
    cat: '🐱',
    smile: '😄',
    laugh: '😂',
    love: '😍',
    cool: '😎',
    think: '🤔',
    sleep: '😴',
    rocket: '🚀',
    trophy: '🏆',
    medal: '🏅',
    crown: '👑',
    diamond: '💎',
    key: '🔑',
    lock: '🔒',
    bulb: '💡',
    battery: '🔋',
    wifi: '📶',
    camera: '📷',
    video: '📹',
    game: '🎮',
    dice: '🎲',
    art: '🎨',
    brush: '🖌️',
    scissors: '✂️',
    hammer: '🔨',
    wrench: '🔧',
    pill: '💊',
    bandage: '🩹',
    glasses: '👓',
    hat: '🎩',
    shirt: '👕',
    shoe: '👟',
    bag: '👜',
    umbrella: '☂️',
    watch: '⌚',
    ring: '💍',
    lipstick: '💄',
    perfume: '👜',
    soap: '🧼',
    toothbrush: '🦷',
    shower: '🚿',
    toilet: '🚽',
    door: '🚪',
    window: '🪟',
    bed: '🛏️',
    chair: '🪑',
    table: '🍽️',
    lamp: '💡',
    tv: '📺',
    computer: '💻',
    keyboard: '⌨️',
    mouse: '🖱️',
    printer: '🖨️',
    fax: '📠',
    dvd: '📀',
    cd: '💿',
    tape: '📼',
    radio: '📻',
    microphone: '🎤',
    headphones: '🎧',
    speaker: '🔊',
    bell: '🔔',
    mute: '🔇',
    volume: '🔊',
    signal: '📶',
    antenna: '📡',
    satellite: '🛰️'
  };

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
      setEventForm({ title: '', date: '', time: '', description: '', checklist: [], image: null, color: '#1a73e8', icon: '' });
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

  const changeEventIcon = (eventId, icon) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, icon } : event
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
    setEventForm({ title: '', date: '', time: '', description: '', checklist: [], image: null, color: '#1a73e8', icon: '' });
    setShowModal(true);
    setShowSidebar(false);
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
    
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

    const days = [];
    
    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, type: 'prev' });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, type: 'current' });
    }
    
    // Next month days
    const totalCells = 42; // 6 rows × 7 days
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({ day, type: 'next' });
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
    <div className={`agenda-container ${localDarkTheme ? 'dark-theme' : ''}`} onClick={closeContextMenu}>
      <button className={`menu-toggle ${showSidebar ? 'open' : ''}`} onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-item" onClick={handleNewEvent}>
            <div className="sidebar-label">Novo Evento</div>
          </div>
          <div className="sidebar-item" onClick={() => window.location.href = '/?page=dashboard'}>
            <div className="sidebar-label">Página Inicial</div>
          </div>
        </div>
      </div>
      
      <div className={`calendar ${showSidebar ? 'sidebar-open' : ''}`}>
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
          {getDaysInMonth().map((dayObj, index) => (
            <div 
              key={index} 
              className={`calendar-day ${dayObj.type === 'current' ? 'active' : dayObj.type === 'prev' ? 'prev-month' : 'next-month'}`}
              onClick={() => dayObj.type === 'current' && handleDayClick(dayObj.day)}
            >
              <span className="day-number">{dayObj.day}</span>
              {dayObj.type === 'current' && (
                <div className="day-events">
                  {getEventsForDay(dayObj.day).map(event => (
                    <div 
                      key={event.id} 
                      className="event-preview"
                      style={{ backgroundColor: event.color || '#1a73e8' }}
                      onClick={(e) => handleEventClick(e, event)}
                      onContextMenu={(e) => handleEventRightClick(e, event.id)}
                    >
                      {event.icon && <span className="event-icon">{event.icon}</span>}
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="event-overlay">
          <div className="event-form">
            <div className="form-header">
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
                <div className="detail-item left-aligned">
                  <span className="detail-label">Data:</span>
                  <span className="detail-value">{selectedEvent.date.split('-').reverse().join('/')}</span>
                </div>
              )}
              
              {selectedEvent.time && (
                <div className="detail-item left-aligned">
                  <span className="detail-label">Horário:</span>
                  <span className="detail-value">{selectedEvent.time}</span>
                </div>
              )}
              
              {selectedEvent.description && (
                <div className="detail-item left-aligned">
                  <span className="detail-label">Descrição:</span>
                  <p className="detail-description">{selectedEvent.description}</p>
                </div>
              )}
              
              {selectedEvent.checklist && selectedEvent.checklist.length > 0 && (
                <div className="detail-item left-aligned">
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
                <div className="detail-item left-aligned">
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




    </div>
  );
}

export default Agenda;
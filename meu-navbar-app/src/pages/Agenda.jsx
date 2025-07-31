import { useState } from 'react';
import './Agenda.css';

function Agenda() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    checklist: [],
    image: null
  });

  const handleAddEvent = () => {
    if (eventForm.title && eventForm.date) {
      setEvents([...events, { ...eventForm, id: Date.now() }]);
      setEventForm({ title: '', date: '', time: '', description: '', checklist: [], image: null });
      setShowModal(false);
    }
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
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
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
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const getEventsForDay = (day) => {
    const dateStr = formatDate(day);
    return events.filter(event => event.date === dateStr);
  };

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <h1>Agenda</h1>
        <button className="add-event-btn" onClick={() => setShowModal(!showModal)}>
          {showModal ? 'Cancelar' : '+ Novo Evento'}
        </button>
      </div>

      <div className="agenda-content">
        <div className="calendar">
          <div className="calendar-header">
            <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
          </div>
          <div className="calendar-grid">
            {getDaysInMonth().map((day, index) => (
              <div key={index} className={`calendar-day ${day ? 'active' : 'inactive'}`}>
                {day && (
                  <>
                    <span className="day-number">{day}</span>
                    <div className="day-events">
                      {getEventsForDay(day).map(event => (
                        <div key={event.id} className="event-preview">
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
          <div className="event-form">
            <h2>Novo Evento</h2>
            <input
              type="text"
              placeholder="Título do evento"
              value={eventForm.title}
              onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
            />
            <input
              type="date"
              value={eventForm.date}
              onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
            />
            <input
              type="time"
              value={eventForm.time}
              onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
            />
            <textarea
              placeholder="Descrição"
              value={eventForm.description}
              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
            />
            
            <div className="checklist-section">
              <h3>Checklist</h3>
              {eventForm.checklist.map((item, index) => (
                <div key={index} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => updateChecklistItem(index, 'completed', e.target.checked)}
                  />
                  <input
                    type="text"
                    placeholder="Item da lista"
                    value={item.text}
                    onChange={(e) => updateChecklistItem(index, 'text', e.target.value)}
                  />
                </div>
              ))}
              <button type="button" onClick={addChecklistItem}>+ Adicionar item</button>
            </div>

            <div className="image-section">
              <h3>Anexar Imagem</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {eventForm.image && (
                <img src={eventForm.image} alt="Preview" className="image-preview" />
              )}
            </div>
            
            <button className="save-btn" onClick={handleAddEvent}>Salvar Evento</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Agenda;
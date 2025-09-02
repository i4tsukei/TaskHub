import { useState } from 'react';
import './Contato.css';

function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contato enviado:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
  };

  return (
    <div className="contato">
      <div className="contato-container">
        <div className="contato-header">
          <h1>Entre em contato</h1>
          <p>Estamos aqui para ajudar você</p>
        </div>

        <div className="contato-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <p>contato@taskhub.com</p>
            </div>
            <div className="info-item">
              <h3>Suporte</h3>
              <p>Resposta em até 24h</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                placeholder="Nome"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <select
                value={formData.assunto}
                onChange={(e) => setFormData({...formData, assunto: e.target.value})}
                required
                className="form-input"
              >
                <option value="">Selecione um assunto</option>
                <option value="suporte">Suporte Técnico</option>
                <option value="feedback">Feedback</option>
                <option value="sugestao">Sugestão</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            <div className="form-group">
              <textarea
                value={formData.mensagem}
                onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                placeholder="Sua mensagem"
                rows="6"
                required
                className="form-textarea"
              />
            </div>
            
            <button type="submit" className="submit-btn">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contato;
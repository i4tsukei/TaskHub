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
      <div className="contato-header">
        <h1>Entre em Contato</h1>
        <p>Estamos aqui para ajudar você. Envie sua mensagem ou feedback!</p>
      </div>

      <div className="contato-content">
        <div className="contato-info">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>contato@taskhub.com</p>
          </div>
          <div className="info-card">
            <div className="info-icon">💬</div>
            <h3>Suporte</h3>
            <p>Resposta em até 24h</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⭐</div>
            <h3>Feedback</h3>
            <p>Sua opinião é importante</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contato-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Assunto</label>
            <select
              value={formData.assunto}
              onChange={(e) => setFormData({...formData, assunto: e.target.value})}
              required
            >
              <option value="">Selecione um assunto</option>
              <option value="suporte">Suporte Técnico</option>
              <option value="feedback">Feedback</option>
              <option value="sugestao">Sugestão</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Mensagem</label>
            <textarea
              value={formData.mensagem}
              onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
              placeholder="Escreva sua mensagem aqui..."
              rows="5"
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">Enviar Mensagem</button>
        </form>
      </div>
    </div>
  );
}

export default Contato;
import { useState } from 'react';
import './Contato.css';

function Contato({ darkTheme }) {
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
    <div className={`contato ${darkTheme ? 'dark-theme' : ''}`}>
      <div className="contato-container">
        <div className="contato-header">
          <h1>Fale Conosco</h1>
          <p>Estamos aqui para ajudar você</p>
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
  
  );
}

export default Contato;
import { useState } from 'react';
import './Cadastro.css';

function Cadastro({ setCurrentPage, darkTheme }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Cadastro:', formData);
    setCurrentPage('dashboard');
  };

  return (
    <div className={`cadastro-container ${darkTheme ? 'dark-theme' : ''}`}>
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h1>Criar Conta no TaskHub</h1>
          <p>Comece a organizar sua vida hoje mesmo</p>
        </div>
        
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label>Nome Completo</label>
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
            <label>Senha</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Sua senha"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirme sua senha"
              required
            />
          </div>
          
          <button type="submit" className="cadastro-btn">Começar Agora</button>
        </form>
        
        <div className="cadastro-footer">
          <p>Já tem uma conta? <span className="link" onClick={() => setCurrentPage('login')}>Faça login</span></p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
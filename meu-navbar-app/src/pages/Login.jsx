import { useState } from 'react';
import './Login.css';

function Login({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica de autenticação
    console.log('Login:', formData);
    setCurrentPage('home');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Entrar no TaskHub</h1>
          <p>Acesse sua conta para organizar suas tarefas</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
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
          
          <button type="submit" className="login-btn">Entrar</button>
        </form>
        
        <div className="login-footer">
          <p>Não tem uma conta? <span className="link">Cadastre-se</span></p>
          <span className="link">Esqueceu a senha?</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
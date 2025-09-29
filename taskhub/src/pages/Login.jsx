import { useState } from 'react';
import './Login.css';

function Login({ setCurrentPage, darkTheme }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    setCurrentPage('dashboard');
  };

  const handleGoogleLogin = () => {
    console.log('Login com Google');
    setCurrentPage('dashboard');
  };

  const handleAppleLogin = () => {
    console.log('Login com Apple');
    setCurrentPage('dashboard');
  };

  if (showEmailForm) {
    return (
      <div className={`login-container ${darkTheme ? 'dark-theme' : ''}`}>
        <div className="login-card">
          <div className="login-header">
            <h1>Entrar com Email</h1>
            <p>Digite suas credenciais para acessar</p>
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
            <button className="back-btn" onClick={() => setShowEmailForm(false)}>Voltar</button>
            <span className="link">Esqueceu a senha?</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`login-container ${darkTheme ? 'dark-theme' : ''}`}>
      <div className="login-card">
        <div className="login-header">
          <h1>Entrar no TaskHub</h1>
          <p>Escolha como você deseja acessar sua conta</p>
        </div>
        
        <div className="login-options">
          <button className="social-btn google-btn" onClick={handleGoogleLogin}>
            <span className="social-icon">G</span>
            Continuar com Google
          </button>
          
          <button className="social-btn apple-btn" onClick={handleAppleLogin}>
            <span className="social-icon"><apple className="png"></apple> </span>
            Continuar com Apple
          </button>
          
          <div className="divider">
            <span>ou</span>
          </div>
          
          <button className="email-btn" onClick={() => setShowEmailForm(true)}>
            Entrar com Email
          </button>
        </div>
        
        <div className="login-footer">
          <p>Não tem uma conta? <span className="link" onClick={() => setCurrentPage('cadastro')}>Cadastre-se</span></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
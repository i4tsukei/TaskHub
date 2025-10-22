import { useState } from 'react';
import './Login.css';
import UsuarioService from '../services/UsuarioService';

function Login({ setCurrentPage, darkTheme }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '' 
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    UsuarioService.login(formData.email, formData.password).then(
      () => {
        const userJson = localStorage.getItem("user");
        const user = JSON.parse(userJson || '{}');
        if (user.statusUsuario == 'ativo') {
          setCurrentPage('dashboard');
        }

      },
      (error) => {
        const respMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

      }

    );
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="login-btn">Entrar</button>
          </form>


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
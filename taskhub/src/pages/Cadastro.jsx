import { useState } from 'react';
import './Cadastro.css';
import UsuarioService from '../services/UsuarioService';

function Cadastro({ setCurrentPage, darkTheme }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
 
 const handleSubmit = (e) => {
  e.preventDefault(); // impede o form de recarregar a página

  if (formData.password !== formData.confirmPassword) {
    alert('Senha não reconhecida');
    return; // para o código aqui se forem diferentes
  }

  console.log('Tentando cadastrar:', { nome: formData.nome, email: formData.email });
  
  UsuarioService.register(formData.nome, formData.email, formData.password)
    .then(
      (response) => {
        console.log('Cadastro realizado com sucesso:', response.data);
        setCurrentPage('dashboard');
      },
      (error) => {
        console.error('Erro no cadastro:', error);
        const respMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
 
        alert('Erro no cadastro: ' + respMessage);
      }
    );
};

  return (
    <div className={`cadastro-container ${darkTheme ? 'dark-theme' : ''}`}>
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h1>Cadastrar com E-mail</h1>
          <p>Preencha os dados para criar sua conta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              
              required
            />
          </div>
          
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="cadastro-btn">Cadastrar</button>
        </form>
        
        <div className="cadastro-footer">
          <p>Já tem uma conta? <span className="link" onClick={() => setCurrentPage('login')}>Faça login</span></p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
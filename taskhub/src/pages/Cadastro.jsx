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
  e.preventDefault(); // impede o form de recarregar a página

  if (formData.password !== formData.confirmPassword) {
    alert('As senhas não coincidem!');
    return; // para o código aqui se forem diferentes
  }

  UsuarioService.register(formData.nome, formData.email, formData.password)
    .then(
      () => {
        const userJson = localStorage.getItem("user");
        const user = JSON.parse(userJson || '{}');
 
   
        if (user.statusUsuario === 'ativo') {
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
 
        console.error('Erro no cadastro:', respMessage);

        console.log('Cadastro:', formData);
        setCurrentPage('dashboard');
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
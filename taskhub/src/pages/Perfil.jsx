import React, { useState, useEffect } from 'react';
import './Perfil.css';
import UsuarioService from '../services/UsuarioService';

function Perfil({ darkTheme }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeSection, setActiveSection] = useState('dados');
  const [userData, setUserData] = useState({ nome: '', email: '', telefone: '' });
  const [passwordData, setPasswordData] = useState({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });

  useEffect(() => {
    const user = UsuarioService.getCurrentUser();
    if (user) {
      setUserData({
        nome: user.nome || '',
        email: user.email || '',
        telefone: user.telefone || ''
      });
    }
  }, []);

  const handlePhotoClick = () => {
    setShowPhotoOptions(true);
  };

  const handleChangePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setProfilePhoto(e.target.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
    setShowPhotoOptions(false);
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setShowPhotoOptions(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSavePersonalData = () => {
    const user = UsuarioService.getCurrentUser();
    if (user) {
      const dataToUpdate = {
        nome: userData.nome,
        email: userData.email,
        senha: user.senha // Mantém a senha atual
      };
      
      UsuarioService.update(user.id, dataToUpdate)
        .then((response) => {
          alert('Dados atualizados com sucesso!');
          const updatedUser = { ...user, ...userData };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        })
        .catch(error => {
          console.error('Erro ao atualizar dados:', error);
          alert('Erro ao atualizar dados: ' + (error.response?.data?.message || error.message));
        });
    }
  };

  const handleChangePassword = () => {
    if (passwordData.novaSenha !== passwordData.confirmarSenha) {
      alert('Nova senha e confirmação não coincidem');
      return;
    }
    
    if (passwordData.novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    const user = UsuarioService.getCurrentUser();
    if (user) {
      UsuarioService.alterarSenha(user.id, { senha: passwordData.novaSenha })
        .then(() => {
          alert('Senha alterada com sucesso!');
          setPasswordData({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
          // Atualiza o usuário no localStorage
          const updatedUser = { ...user, senha: passwordData.novaSenha };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        })
        .catch(error => {
          console.error('Erro ao alterar senha:', error);
          alert('Erro ao alterar senha: ' + (error.response?.data?.message || error.message));
        });
    }
  };

  const renderContent = () => {
    console.log('Renderizando seção:', activeSection);
    switch(activeSection) {
      case 'dados':
        return (
          <div className="perfil-fields">
            <div className="field-group">
              <label>Nome</label>
              <input 
                type="text" 
                value={userData.nome}
                onChange={(e) => setUserData({...userData, nome: e.target.value})}
              />
            </div>
            <div className="field-group">
              <label>Email</label>
              <input 
                type="email" 
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
            <div className="field-group">
              <label>Telefone</label>
              <input 
                type="tel" 
                placeholder="(00) 00000-0000"
                value={userData.telefone}
                onChange={(e) => setUserData({...userData, telefone: e.target.value})}
              />
            </div>
          </div>
        );

      case 'seguranca':
        return (
          <div className="security-section">
            <div className="field-group">
              <label>Senha Atual</label>
              <input 
                type="password"
                value={passwordData.senhaAtual}
                onChange={(e) => setPasswordData({...passwordData, senhaAtual: e.target.value})}
              />
            </div>
            <div className="field-group">
              <label>Nova Senha</label>
              <input 
                type="password"
                value={passwordData.novaSenha}
                onChange={(e) => setPasswordData({...passwordData, novaSenha: e.target.value})}
              />
            </div>
            <div className="field-group">
              <label>Confirmar Nova Senha</label>
              <input 
                type="password"
                value={passwordData.confirmarSenha}
                onChange={(e) => setPasswordData({...passwordData, confirmarSenha: e.target.value})}
              />
            </div>
            <button className="change-password-btn" onClick={handleChangePassword}>Alterar Senha</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`perfil-container ${darkTheme ? 'dark-theme' : ''}`}>
      <button className={`menu-toggle ${showSidebar ? 'open' : ''}`} onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-item" onClick={() => window.location.href = '/?page=dashboard'}>
            <div className="sidebar-label">Eventos</div>
          </div>
          <div className="sidebar-item" onClick={() => window.location.href = '/?page=agenda'}>
            <div className="sidebar-label">Agenda</div>
          </div>
          <div className={`sidebar-item ${activeSection === 'dados' ? 'active' : ''}`} onClick={() => setActiveSection('dados')}>
            <div className="sidebar-label">Dados Pessoais</div>
          </div>
          <div className={`sidebar-item ${activeSection === 'seguranca' ? 'active' : ''}`} onClick={() => setActiveSection('seguranca')}>
            <div className="sidebar-label">Segurança</div>
          </div>
        </div>
      </div>
      
      <div className={`perfil-content ${showSidebar ? 'sidebar-open' : ''}`}>
        <div className="perfil-card">
          <div className="perfil-avatar">
            <div className="avatar-circle" onClick={handlePhotoClick}>
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="profile-image" />
              ) : (
                <span>U</span>
              )}
            </div>
          </div>
          
          {showPhotoOptions && (
            <div className="photo-options-overlay" onClick={() => setShowPhotoOptions(false)}>
              <div className="photo-options-menu" onClick={(e) => e.stopPropagation()}>
                <div className="photo-option" onClick={handleChangePhoto}>
                  Alterar foto
                </div>
                <div className="photo-option" onClick={handleRemovePhoto}>
                  Remover foto
                </div>
              </div>
            </div>
          )}
          
          <div className="perfil-info">
            <h2>{userData.nome || 'Usuário'}</h2>
            <p>{userData.email || 'usuario@email.com'}</p>
          </div>
          
          {renderContent()}
          
          {activeSection !== 'seguranca' && (
            <div className="perfil-actions">
              <button className="save-btn" onClick={handleSavePersonalData}>Salvar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
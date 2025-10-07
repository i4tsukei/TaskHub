import React, { useState } from 'react';
import './Perfil.css';

function Perfil({ darkTheme }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState('dados');

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

  const renderContent = () => {
    switch(activeSection) {
      case 'dados':
        return (
          <div className="perfil-fields">
            <div className="field-group">
              <label>Nome</label>
              <input type="text" defaultValue="Usuário" />
            </div>
            <div className="field-group">
              <label>Email</label>
              <input type="email" defaultValue="usuario@email.com" />
            </div>
            <div className="field-group">
              <label>Telefone</label>
              <input type="tel" placeholder="(00) 00000-0000" />
            </div>
          </div>
        );
      case 'privacidade':
        return (
          <div className="privacy-section">
            <div className="privacy-item">
              <label>Mostrar email</label>
              <input type="checkbox" />
            </div>
            <div className="privacy-item">
              <label>Receber notificações</label>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        );
      case 'seguranca':
        return (
          <div className="security-section">
            <div className="field-group">
              <label>Senha Atual</label>
              <input type="password" placeholder="Digite sua senha atual" />
            </div>
            <div className="field-group">
              <label>Nova Senha</label>
              <input type="password" placeholder="Digite a nova senha" />
            </div>
            <button className="change-password-btn">Alterar Senha</button>
          </div>
        );
      case 'conta':
        return (
          <div className="account-section">
            <div className="account-info">
              <p>Membro desde: Janeiro 2025</p>
              <p>Último acesso: Hoje às 14:30</p>
            </div>
            <div className="account-actions">
              <button className="export-btn">Exportar Dados</button>
              <button className="delete-btn">Excluir Conta</button>
            </div>
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
          <div className={`sidebar-item ${activeSection === 'privacidade' ? 'active' : ''}`} onClick={() => setActiveSection('privacidade')}>
            <div className="sidebar-label">Privacidade</div>
          </div>
          <div className={`sidebar-item ${activeSection === 'seguranca' ? 'active' : ''}`} onClick={() => setActiveSection('seguranca')}>
            <div className="sidebar-label">Segurança</div>
          </div>
          <div className={`sidebar-item ${activeSection === 'conta' ? 'active' : ''}`} onClick={() => setActiveSection('conta')}>
            <div className="sidebar-label">Conta</div>
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
            <h2>Usuário</h2>
            <p>usuario@email.com</p>
          </div>
          
          {renderContent()}
          
          {activeSection !== 'seguranca' && activeSection !== 'conta' && (
            <div className="perfil-actions">
              <button className="save-btn">Salvar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
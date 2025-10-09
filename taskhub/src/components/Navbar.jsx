import './Navbar.css';

function Navbar({ currentPage, setCurrentPage, darkTheme }) {
  return (
    <nav className={`navbar ${darkTheme ? 'dark-theme' : ''}`}>
      <div className="logo">TaskHub</div>
      <ul className="nav-links">
        <li><a href="#home" onClick={() => setCurrentPage('home')}>Home</a></li>
        <li><a href="#contato" onClick={() => setCurrentPage('contato')}>Contato</a></li>
      </ul>
      <button className="sign-in" onClick={() => setCurrentPage('login')}>
        <span>Entrar ➝</span>
      </button>
    </nav>
  );
}

export default Navbar;
import './Navbar.css';

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar">
      <div className="logo">TaskHub</div>
      <ul className="nav-links">
        <li><a href="#home" onClick={() => setCurrentPage('home')}>Home</a></li>
        <li><a href="#agenda" onClick={() => setCurrentPage('agenda')}>Agenda</a></li>
        <li><a href="#contato" onClick={() => setCurrentPage('contato')}>Contato</a></li>
        <li><a href="#sobre" onClick={() => setCurrentPage('sobre')}>Sobre</a></li>
        <li><a href="#avaliacao" onClick={() => setCurrentPage('avaliacao')}>Avaliação</a></li>
      </ul>
      <button className="sign-in" onClick={() => setCurrentPage('login')}>Entrar ➝</button>
    </nav>
  );
}

export default Navbar;
import './Navbar.css';

function Navbar({ setCurrentPage }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setCurrentPage('home')}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          {/* Calendar body */}
          <rect x="2" y="6" width="24" height="22" rx="4" fill="rgb(5,3,139)" stroke="rgb(3,2,100)" strokeWidth="1.2"/>
          <rect x="2" y="6" width="24" height="9" rx="4" fill="rgb(5,3,139)"/>
          <rect x="2" y="11" width="24" height="4" fill="rgb(5,3,139)"/>
          {/* White inner area */}
          <rect x="4" y="14" width="20" height="13" rx="2" fill="white"/>
          {/* Rings */}
          <rect x="9" y="3" width="4" height="7" rx="2" fill="white" stroke="rgb(3,2,100)" strokeWidth="1"/>
          <rect x="15" y="3" width="4" height="7" rx="2" fill="white" stroke="rgb(3,2,100)" strokeWidth="1"/>
          {/* Grid cells */}
          <rect x="6" y="16" width="4" height="3.5" rx="0.8" fill="#22d3ee"/>
          <rect x="11" y="16" width="4" height="3.5" rx="0.8" fill="rgb(5,3,139)" opacity="0.6"/>
          <rect x="6" y="20.5" width="4" height="3.5" rx="0.8" fill="rgb(5,3,139)" opacity="0.6"/>
          <rect x="11" y="20.5" width="4" height="3.5" rx="0.8" fill="#22d3ee"/>
          {/* Magnifier circle */}
          <circle cx="26" cy="26" r="8" fill="white" stroke="rgb(5,3,139)" strokeWidth="2.2"/>
          <circle cx="26" cy="26" r="5.5" fill="white"/>
          {/* Checkmark inside magnifier */}
          <polyline points="22.5,26 25,28.5 29.5,22.5" stroke="rgb(5,3,139)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Magnifier handle */}
          <line x1="32" y1="32" x2="34" y2="34" stroke="rgb(5,3,139)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <span>TaskHub</span>
      </div>
      <ul className="nav-links">
        <li><a href="#" onClick={() => setCurrentPage('home')}>Home</a></li>
        <li><a href="#" onClick={() => setCurrentPage('contato')}>Contato</a></li>
      </ul>
      <button className="sign-in" onClick={() => setCurrentPage('login')}>Entrar</button>
    </nav>
  );
}

export default Navbar;

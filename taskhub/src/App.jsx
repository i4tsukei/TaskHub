import { useState, useEffect } from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Agenda from "./pages/Agenda.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Contato from "./pages/Contato.jsx";
import Sobre from "./pages/Sobre.jsx";
import Perfil from "./pages/Perfil.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import Footer from "./pages/Footer.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page) {
      setCurrentPage(page);
    }
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} darkTheme={darkTheme}/>;
      case 'agenda': return <Agenda darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>;
      case 'login': return <Login setCurrentPage={setCurrentPage} darkTheme={darkTheme}/>;
      case 'cadastro': return <Cadastro setCurrentPage={setCurrentPage} darkTheme={darkTheme}/>;
      case 'contato': return <Contato darkTheme={darkTheme}/>;
      case 'sobre': return <Sobre darkTheme={darkTheme}/>;
      case 'perfil': return <Perfil darkTheme={darkTheme}/>;
      case 'dashboard': return <Dashboard darkTheme={darkTheme}/>;

      default: return <Home setCurrentPage={setCurrentPage}/>;
    }
  };

  return (
    <div className={darkTheme ? 'dark-theme' : ''}>
      {currentPage !== 'login' && currentPage !== 'cadastro' && currentPage !== 'dashboard' && currentPage !== 'agenda' && currentPage !== 'perfil' && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} darkTheme={darkTheme}/>}
      {renderPage()}
      {currentPage !== 'login' && currentPage !== 'cadastro' && currentPage !== 'agenda' && <Footer/>}
    </div>
  )
}

export default App

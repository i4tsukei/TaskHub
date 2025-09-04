import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Agenda from "./pages/Agenda.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Contato from "./pages/Contato.jsx";
import Sobre from "./pages/Sobre.jsx";
import Avaliacao from "./pages/Avaliacao.jsx";
import Footer from "./pages/Footer.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage}/>;
      case 'agenda': return <Agenda/>;
      case 'login': return <Login setCurrentPage={setCurrentPage}/>;
      case 'cadastro': return <Cadastro setCurrentPage={setCurrentPage}/>;
      case 'contato': return <Contato/>;
      case 'sobre': return <Sobre/>;
      case 'avaliacao': return <Avaliacao/>;
      default: return <Home setCurrentPage={setCurrentPage}/>;
    }
  };

  return (
    <div>
      {currentPage !== 'login' && currentPage !== 'cadastro' && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
      {renderPage()}
      {currentPage !== 'login' && currentPage !== 'cadastro' && <Footer/>}
    </div>
  )
}

export default App

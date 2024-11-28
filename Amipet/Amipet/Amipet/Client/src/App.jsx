// Importa os hooks e os arquivos de estilo
import { useState } from 'react';
import './App.css';
import './Telas/Telas-CSS/Dormir.css';
import './Telas/Telas-CSS/Home.css';
import './Telas/Telas-CSS/Comer.css';
import './Telas/Telas-CSS/Games.css';
import './Telas/Telas-CSS/Cordinha.css';
import './Telas/Telas-CSS/Login.css';
import './Telas/Telas-Chat/chat'

// Importa os componentes de cada tela
import Home from './Telas/Home';
import Comer from './Telas/Comer';
import Dormir from './Telas/Dormir';
import Games from './Telas/Games';
import Login from './Telas/Login';
import JogoDaVelha from './Telas/Telas-Games/JogoDaVelha';
import JogoDasEmocoes from './Telas/Telas-Games/JogoDasEmocoes';
import JogoDaMemoria from './Telas/Telas-Games/JogoDaMemoria';
import JogoDeSons from './Telas/Telas-Games/JogoDeSons';
import QuebraCabeca from './Telas/Telas-Games/QuebraCabeca';
import Chat from './Telas/Telas-Chat/chat';

// Função principal do aplicativo
function App() {
  // Estado que controla a página atual exibida
  const [currentPage, setCurrentPage] = useState('escolha'); // Inicialmente é a tela de login ('escolha')
  
  // Estado que armazena se o usuário está logado (puxado do localStorage)
  const [usuarioLogado, setUsuarioLogado] = useState(localStorage.getItem('usuarioLogado'));

  // Lista de páginas de jogos
  const gamePages = [
    'games', 'jogo-da-velha', 'jogo-das-emocoes', 'jogo-da-memoria', 'jogo-de-sons', 'quebra-cabeca'
  ];

  // Função de login que armazena o usuário no localStorage e atualiza o estado
  const handleLogin = () => {
    localStorage.setItem("usuarioLogado", true); // Define no localStorage que o usuário está logado
    setUsuarioLogado(true); // Atualiza o estado de login para 'true'
    setCurrentPage('home'); // Muda para a tela inicial (home)
  };

  // Função de logout que remove o usuário do localStorage e volta para a tela de escolha
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado"); // Remove o usuário do localStorage
    setUsuarioLogado(false); // Atualiza o estado de login para 'false'
    setCurrentPage('escolha'); // Volta para a tela de login
  };

  // Função que renderiza a página correspondente ao estado currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'escolha':
        return <Login onFormSwitch={handleLogin} />; // Exibe a tela de login
      case 'home':
        return <Home onBolaClick={() => setCurrentPage('games')} />; // Exibe a tela inicial, com um clique na bola levando à tela de jogos
      case 'comer':
        return <Comer onBack={() => setCurrentPage('home')} />; // Exibe a tela de comer, com um botão para voltar
      case 'dormir':
        return <Dormir onBack={() => setCurrentPage('home')} onDormirSelect={setCurrentPage} />; // Exibe a tela de dormir, com um botão para voltar
        case 'chat':
        return <Chat onBack={() => setCurrentPage('chat')}/>;
      case 'games':
        return <Games onBack={() => setCurrentPage('home')} onGameSelect={setCurrentPage} backgroundColor="#8C29C7" />; // Exibe a tela de jogos
      case 'jogo-da-velha':
        return <div className="games-container"><JogoDaVelha onBack={() => setCurrentPage('games')} /></div>; // Exibe o Jogo da Velha
      case 'jogo-das-emocoes':
        return <div className="games-container"><JogoDasEmocoes onBack={() => setCurrentPage('games')} /></div>; // Exibe o Jogo das Emoções
      case 'jogo-da-memoria':
        return <div className="games-container"><JogoDaMemoria onBack={() => setCurrentPage('games')} /></div>; // Exibe o Jogo da Memória
      case 'jogo-de-sons':
        return <div className="games-container"><JogoDeSons onBack={() => setCurrentPage('games')} /></div>; // Exibe o Jogo de Sons
      case 'quebra-cabeca':
        return <div className="games-container"><QuebraCabeca onBack={() => setCurrentPage('games')} /></div>; // Exibe o Quebra Cabeça
      default:
        return <Home onBolaClick={() => setCurrentPage('games')} />; // Exibe a tela inicial, caso nenhum valor válido de currentPage
    }
  };

  return (
    <div className={`tudo-tela ${currentPage === 'home' || currentPage === 'comer' ? 'fundo-padrao' : ''}`}>
      {/* Renderiza a página de acordo com o estado currentPage */}
      {renderPage()}

      {/* Renderiza os botões de navegação e o botão de logout somente se o usuário estiver logado */}
      {usuarioLogado && !gamePages.includes(currentPage) && (
        <div className='nav-buttons'>
          <main>
            {/* Botões de navegação para as telas de jogos, comida, chat e dormir */}
            <img
              src='./public/Tela-fundo-inicio/Btn-jogos.png'
              alt='Games'
              className='botoes-telas'
              onClick={() => setCurrentPage('games')}
            />
            <img
              src='./public/Tela-fundo-inicio/Btn-comida.png'
              alt='Comer'
              className='botoes-telas'
              onClick={() => setCurrentPage('comer')}
            />
            <img
              src='./public/Tela-fundo-inicio/Btn-chat.png'
              alt='Chat'
              className='botoes-telas'
              onClick={() => setCurrentPage('chat')}
            />
            <img
              src='./public/Tela-fundo-inicio/Btn-dormir.png'
              alt='Dormir'
              className='botoes-telas'
              onClick={() => setCurrentPage('dormir')}
            />
            {/* Botão de logout */}
            <button className="logout-button" onClick={handleLogout}>
              Sair
            </button>
          </main>
        </div>
      )}
    </div>
  );
}

// Exporta o componente App como valor padrão para ser utilizado em outros lugares
export default App;

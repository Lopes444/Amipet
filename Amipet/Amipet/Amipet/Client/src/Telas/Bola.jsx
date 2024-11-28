import React, { useState } from 'react'; // Importando React e useState para gerenciar o estado
import Home from './Home'; // Importando o componente Home
import Games from './Games'; // Importando o componente Games

function App() {
  // Definindo o estado que controla qual tela será exibida (Home ou Games)
  const [currentScreen, setCurrentScreen] = useState('Home'); 

  // Função que altera a tela para "Games" quando chamada
  const handleBolaClick = () => {
    setCurrentScreen('Games'); 
  };

  return (
    <div>
      {/* Renderiza o componente Home se a tela atual for "Home" */}
      {currentScreen === 'Home' && <Home onBolaClick={handleBolaClick} />}
      
      {/* Renderiza o componente Games se a tela atual for "Games" */}
      {currentScreen === 'Games' && <Games />}
    </div>
  );
}

export default App;

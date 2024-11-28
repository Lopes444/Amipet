import React, { useState, useEffect } from 'react';

// Componente Games que exibe uma lista de jogos disponíveis
const Games = ({ onBack, onGameSelect, backgroundColor = 'white' }) => {
  
  // useEffect verifica se o usuário está logado, se não, redireciona para a tela de login
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('usuarioLogado'); // Verifica se o usuário está logado no localStorage
    console.log(isAuthenticated); // Apenas para fins de depuração
    if (!isAuthenticated) { // Se o usuário não estiver logado
      onGameSelect('escolha'); // Redireciona para a página de login
    }
  }, [onGameSelect]); // Dependência de onGameSelect para evitar problemas com o hook

  return (
    <div className="games-container" style={{ backgroundColor }}> {/* Define o fundo da tela com a cor passada por prop */}
      <main className='botoes-jogos'>
        {/* Cada div com a classe "square" representa um jogo */}
        
        {/* Jogo da Velha */}
        <div className="square" onClick={() => onGameSelect('jogo-da-velha')}>
          <main className='square-dentro' style={{ cursor: 'pointer' }}>
            <p>Jogo da Velha</p>
            <img src="./public/Tela-jogos/Jogo-da-velha.png" alt="Jogo da Velha" />
          </main>
        </div>

        {/* Jogo das Emoções (Jokenpô) */}
        <div className="square" onClick={() => onGameSelect('jogo-das-emocoes')}>
          <main className='square-dentro' style={{ cursor: 'pointer' }}>
            <p>Jokenpô</p>
            <img src="./public/Tela-jogos/jokenpo.png" alt="Jogo das Emoções" />
          </main>
        </div>

        {/* Jogo da Memória (FlapBird) */}
        <div className="square" onClick={() => onGameSelect('jogo-da-memoria')}>
          <main className='square-dentro' style={{ cursor: 'pointer' }}>
            <p>FlapBird</p>
            <img src="./public/Tela-jogos/Bird.png" alt="Jogo da Memória" />
          </main>
        </div>

        {/* Jogo de Sons (Forca) */}
        <div className="square" onClick={() => onGameSelect('jogo-de-sons')}>
          <main className='square-dentro' style={{ cursor: 'pointer' }}>
            <p>Forca</p>
            <img src="./public/Tela-jogos/jogo-forca.png" alt="Jogo de Sons" />
          </main>
        </div>

        {/* Quebra-cabeça */}
        <div className="square" onClick={() => onGameSelect('quebra-cabeca')}>
          <main className='square-dentro' style={{ cursor: 'pointer' }}>
            <p>Quebra-cabeça</p>
            <img src="./public/Tela-jogos/Quebra-cabeca.png" alt="Quebra-cabeça" />
          </main>
        </div>
      </main>

      {/* Botão de "Voltar" que chama a função onBack */}
      <button className="back-button" onClick={onBack}>Voltar</button>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Games;

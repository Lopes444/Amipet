import React, { useState } from 'react';
import '../Telas-CSS/jokenpo.css';

// Componente do jogo Pedra, Papel, Tesoura
const JogoDasEmocoes = ({ onBack, backgroundColor = '' }) => {
  // Estados para armazenar os movimentos do jogador e do adversário
  const [movePlayer, setMovePlayer] = useState(null); // Movimento do jogador
  const [moveEnemy, setMoveEnemy] = useState(null); // Movimento do adversário
  const [resultMessage, setResultMessage] = useState('Comece a jogar'); // Mensagem do resultado

  // Opções disponíveis para o jogo
  const playerOptions = ['stone', 'paper', 'scissor'];

  // Função que trata o movimento escolhido pelo jogador
  const handlePlayerMove = (move) => {
    setMovePlayer(move); // Define o movimento do jogador
    const enemyMove = iaEnemyMove(); // Gera o movimento do adversário
    setMoveEnemy(enemyMove); // Define o movimento do adversário
    determineResult(move, enemyMove); // Determina o resultado com base nos movimentos
  };

  // Função que gera um movimento aleatório para o adversário
  const iaEnemyMove = () => {
    const randomMove = playerOptions[Math.floor(Math.random() * playerOptions.length)]; // Escolhe uma opção aleatória
    return randomMove; // Retorna o movimento
  };

  // Função que determina o resultado do jogo
  const determineResult = (playerMove, enemyMove) => {
    if (playerMove === enemyMove) {
      setResultMessage('Você empatou 😢'); // Empate
    } else if (
      (playerMove === 'stone' && enemyMove === 'paper') || // Pedra perde para Papel
      (playerMove === 'paper' && enemyMove === 'scissor') || // Papel perde para Tesoura
      (playerMove === 'scissor' && enemyMove === 'stone') // Tesoura perde para Pedra
    ) {
      setResultMessage('Você perdeu 😭'); // Derrota
    } else {
      setResultMessage('Você ganhou 🥲'); // Vitória
    }
  };

  // Renderização do componente
  return (
    <div className="jogo-das-emocoes-container" style={{ backgroundColor }}>
      {/* Botão para voltar à tela anterior */}
      <button className="back-button" onClick={onBack}>Voltar</button>
      <h1>Pedra, Papel, Tesoura</h1>

      {/* Contêiner principal do jogo */}
      <div className="game-container">
        {/* Contêiner dos jogadores */}
        <div className="players-container">
          {/* Jogador */}
          <div className="player">
            {/* Exibe as opções para o jogador escolher */}
            {playerOptions.map((option) => (
              <div 
                key={option} 
                className={`option ${movePlayer === option ? 'selected' : ''}`} // Adiciona a classe 'selected' para destacar a opção escolhida
                data-value={option} 
                onClick={() => handlePlayerMove(option)} // Chama a função ao clicar em uma opção
              >
                <img src={`assets/${option}.png`} alt={option} /> {/* Exibe a imagem da opção */}
              </div>
            ))}
          </div>

          {/* Adversário */}
          <div className="enemy">
            {/* Exibe as opções do adversário */}
            {playerOptions.map((option) => (
              <div 
                key={option} 
                className={`option ${moveEnemy === option ? 'selected' : ''}`} // Destaca a opção escolhida pelo adversário
                data-value={option}
              >
                <img src={`assets/${option}.png`} alt={option} /> {/* Exibe a imagem da opção */}
              </div>
            ))}
          </div>
        </div>

        {/* Contêiner do resultado */}
        <div className="result-container">
          <span>{resultMessage}</span> {/* Exibe a mensagem do resultado */}
        </div>
      </div>
    </div>
  );
};

export default JogoDasEmocoes; // Exporta o componente para uso em outros arquivos

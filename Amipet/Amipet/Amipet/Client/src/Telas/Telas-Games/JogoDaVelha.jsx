// JogoDaVelha.js
import React, { useState, useEffect } from 'react';
import '../Telas-CSS/Velha.css';

// Componente do Jogo da Velha
const JogoDaVelha = ({ onBack, backgroundColor = '' }) => {
  // Estados para gerenciar o jogo
  const [player, setPlayer] = useState('X'); // Jogador atual (X ou O)
  const [selected, setSelected] = useState(Array(9).fill(null)); // Estado do tabuleiro
  const [winner, setWinner] = useState(null); // Estado do vencedor (X, O ou empate)

  // Combinações vencedoras possíveis
  const positions = [
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior
    [0, 3, 6], // Coluna esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal secundária
  ];

  // Função para reiniciar o jogo
  const resetGame = () => {
    setSelected(Array(9).fill(null)); // Reseta o tabuleiro
    setPlayer('X'); // Reinicia com o jogador 'X'
    setWinner(null); // Reseta o vencedor
  };

  // Função para tratar o movimento do jogador
  const handleMove = (index) => {
    // Verifica se a célula já está preenchida ou se há um vencedor
    if (selected[index] || winner) return;

    // Atualiza o estado do tabuleiro
    const newSelected = [...selected];
    newSelected[index] = player; // Marca a célula com o símbolo do jogador atual
    setSelected(newSelected); // Atualiza o tabuleiro

    // Alterna para o próximo jogador
    const nextPlayer = player === 'X' ? 'O' : 'X';
    setPlayer(nextPlayer);
  };

  // Função para verificar se há um vencedor ou empate
  const checkWinner = () => {
    for (const pos of positions) {
      const [a, b, c] = pos; // Pega uma combinação vencedora
      // Verifica se todos os três campos na combinação têm o mesmo valor (X ou O)
      if (selected[a] && selected[a] === selected[b] && selected[a] === selected[c]) {
        setWinner(selected[a]); // Define o vencedor (X ou O)
        return;
      }
    }
    // Verifica se todas as células estão preenchidas e não há vencedor
    if (selected.every((cell) => cell)) setWinner('Empate'); // Define o resultado como empate
  };

  // Hook que verifica o vencedor sempre que o tabuleiro é atualizado
  useEffect(() => {
    checkWinner();
  }, [selected]);

  // Renderização do componente
  return (
    <div className="jogo-da-velha-container" style={{ backgroundColor }}>
      {/* Botão para voltar à tela anterior */}
      <button className="back-button" onClick={onBack}>Voltar</button>
      <h1>JOGO DA VELHA</h1>

      {/* Tabuleiro do jogo */}
      <div className="game">
        {/* Renderiza os botões representando as células */}
        {selected.map((value, index) => (
          <button key={index} onClick={() => handleMove(index)}>
            {value} {/* Exibe X, O ou nada */}
          </button>
        ))}
      </div>

      {/* Mensagem de status */}
      <h2 className="currentPlayer">
        {winner
          ? winner === 'Empate'
            ? 'DEU EMPATE!' // Mensagem para empate
            : `O JOGADOR '${winner}' GANHOU!` // Mensagem para vitória
          : `JOGADOR DA VEZ: ${player}`} {/* Mensagem para o jogador atual */}
      </h2>

      {/* Botão para reiniciar o jogo, exibido apenas quando há um vencedor */}
      {winner && <button className="reset-button" onClick={resetGame}>Reiniciar Jogo</button>}
    </div>
  );
};

export default JogoDaVelha; // Exporta o componente para uso em outros arquivos

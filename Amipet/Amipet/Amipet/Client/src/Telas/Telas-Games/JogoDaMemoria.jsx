import React, { useEffect } from 'react';
import '../Telas-CSS/flap.css';

// Componente principal do jogo "Jogo das Emoções"
const JogoDasEmocoes = ({ onBack, backgroundColor = 'black' }) => {
  
  // Hook useEffect para gerenciar a lógica do jogo
  useEffect(() => {
    // Velocidade de movimento e gravidade do jogo
    let move_speed = 3, gravity = 0.5;

    // Seletores de elementos DOM importantes
    let bird = document.querySelector('.bird'); // Pássaro
    let img = document.getElementById('bird-1'); // Imagem do pássaro
    let sound_point = new Audio('sounds effect/point.mp3'); // Som de pontuação
    let sound_die = new Audio('sounds effect/die.mp3'); // Som de derrota

    let background = document.querySelector('.background').getBoundingClientRect(); // Dimensões do fundo
    let score_val = document.querySelector('.score_val'); // Valor do placar
    let message = document.querySelector('.message'); // Mensagem exibida
    let score_title = document.querySelector('.score_title'); // Título do placar

    // Estado inicial do jogo
    let game_state = 'Start';
    img.style.display = 'none'; // Esconde a imagem do pássaro
    message.classList.add('messageStyle'); // Adiciona estilo inicial à mensagem

    // Evento de teclado para iniciar o jogo ao pressionar Enter
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && game_state !== 'Play') {
        // Reinicia o jogo
        document.querySelectorAll('.pipe_sprite').forEach((e) => e.remove());
        img.style.display = 'block';
        bird.style.top = '40vh'; // Reposiciona o pássaro
        game_state = 'Play'; // Muda o estado para "Play"
        message.innerHTML = ''; // Remove a mensagem inicial
        score_title.innerHTML = 'Score : '; // Mostra o título do placar
        score_val.innerHTML = '0'; // Reseta o placar
        message.classList.remove('messageStyle');
        play(); // Inicia a lógica do jogo
      }
    });

    // Função principal que controla o jogo
    function play() {
      // Movimento dos canos
      function move() {
        if (game_state !== 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite'); // Seleciona os canos
        pipe_sprite.forEach((element) => {
          let pipe_sprite_props = element.getBoundingClientRect(); // Posição do cano
          let bird_props = bird.getBoundingClientRect(); // Posição do pássaro

          // Remove o cano quando sai da tela
          if (pipe_sprite_props.right <= 0) {
            element.remove();
          } else {
            // Checa colisões entre o pássaro e os canos
            if (
              bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
              bird_props.left + bird_props.width > pipe_sprite_props.left &&
              bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
              bird_props.top + bird_props.height > pipe_sprite_props.top
            ) {
              // Game Over
              game_state = 'End';
              message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
              message.classList.add('messageStyle');
              img.style.display = 'none';
              sound_die.play(); // Toca som de derrota
              return;
            } else {
              // Atualiza o placar quando o pássaro passa pelo cano
              if (pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score === '1') {
                score_val.innerHTML = +score_val.innerHTML + 1; // Incrementa o placar
                sound_point.play(); // Toca som de pontuação
              }
              element.style.left = pipe_sprite_props.left - move_speed + 'px'; // Move o cano para a esquerda
            }
          }
        });
        requestAnimationFrame(move); // Chama a função novamente para criar animação
      }
      requestAnimationFrame(move);

      // Gravidade aplicada ao pássaro
      let bird_dy = 0;
      function apply_gravity() {
        if (game_state !== 'Play') return;

        bird_dy += gravity; // Incrementa a velocidade com base na gravidade
        
        // Evento de tecla para fazer o pássaro "voar"
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowUp' || e.key === ' ') {
            img.src = 'images/Bird-2.png'; // Altera a imagem para quando está "subindo"
            bird_dy = -7.6; // Faz o pássaro subir
          }
        });

        // Evento de tecla para restaurar a imagem do pássaro ao liberar a tecla
        document.addEventListener('keyup', (e) => {
          if (e.key === 'ArrowUp' || e.key === ' ') {
            img.src = 'images/Bird.png'; // Restaura a imagem do pássaro
          }
        });

        // Verifica se o pássaro toca o topo ou o fundo da tela
        if (bird.getBoundingClientRect().top <= 0 || bird.getBoundingClientRect().bottom >= background.bottom) {
          game_state = 'End'; // Termina o jogo
          message.style.left = '28vw';
          message.classList.remove('messageStyle');
          return;
        }
        bird.style.top = bird.getBoundingClientRect().top + bird_dy + 'px'; // Atualiza a posição do pássaro
        requestAnimationFrame(apply_gravity);
      }
      requestAnimationFrame(apply_gravity);

      // Criação de canos no jogo
      let pipe_separation = 0;
      let pipe_gap = 35;

      function create_pipe() {
        if (game_state !== 'Play') return;

        if (pipe_separation > 115) { // Cria novos canos após uma certa distância
          pipe_separation = 0;

          // Define a posição dos canos
          let pipe_posi = Math.floor(Math.random() * 43) + 8;
          let pipe_sprite_inv = document.createElement('div');
          pipe_sprite_inv.className = 'pipe_sprite'; // Cano de cima
          pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
          pipe_sprite_inv.style.left = '100vw';

          document.body.appendChild(pipe_sprite_inv);
          let pipe_sprite = document.createElement('div');
          pipe_sprite.className = 'pipe_sprite'; // Cano de baixo
          pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
          pipe_sprite.style.left = '100vw';
          pipe_sprite.increase_score = '1';

          document.body.appendChild(pipe_sprite);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe); // Chama novamente para manter o ciclo
      }
      requestAnimationFrame(create_pipe);
    }
  }, []); // Executa apenas uma vez ao carregar o componente

  // Interface do jogo
  return (
    <div className="jogo-das-emocoes-container" style={{ backgroundColor }}>
      {/* Botão para voltar */}
      <button className="back-button" onClick={onBack}>Voltar</button>

      {/* Fundo e elementos do jogo */}
      <div className="background"></div>
      <img src="images/Bird.png" alt="bird-img" className="bird" id="bird-1" />
      <div className="message">
        Pressione Enter para começar <p><span style={{ color: 'red' }}>&uarr;</span> Clique no espaço para controlar</p>
      </div>
      <div className="score">
        <span className="score_title"></span>
        <span className="score_val"></span>
      </div>
    </div>
  );
};

export default JogoDasEmocoes; // Exporta o componente para uso em outros arquivos

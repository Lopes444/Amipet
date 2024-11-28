// Home.js
import React from 'react';  // Importando React

// Componente funcional Home
function Home({ onBolaClick }) {
  return (
    <div className="home-container">  {/* Container principal do componente Home */}
      <main className='home-meio'>  {/* Bloco central do conteúdo */}
        <main className='div-bola'>  {/* Bloco que envolve a bola */}
          <img
            className="bola"  // Classe da imagem da bola
            src="./public/Tela-fundo-inicio/Bola-fundo-jogos.png"  // Caminho para a imagem da bola
            alt="Bola"  // Texto alternativo para a imagem
            onClick={onBolaClick}  // Chama a função onBolaClick ao clicar na bola
          />
        </main>
        <img
          className="capivara-home"  // Classe da imagem da capivara
          src="./public/Tela-fundo-inicio/Capivara-img.png"  // Caminho para a imagem da capivara
          alt="Capivara"  // Texto alternativo para a imagem
        />
      </main>
    </div>
  );
}

export default Home;  // Exporta o componente Home para ser usado em outros arquivos

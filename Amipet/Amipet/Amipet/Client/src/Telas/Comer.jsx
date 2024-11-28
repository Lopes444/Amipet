import React from 'react';

const Comer = ({ onBack }) => {
  return (
    <div className="image-container">
      
        <img src="./public/Tela-fundo-inicio/Capivara-img.png" alt="Capivara" className="capivara-cozinha" />
        <img src="./public/Cozinha/Mesa.png" alt="Mesa" className="mesa" />
      
        <button className="back-button" onClick={onBack}>Voltar</button>
    </div>
    
  );
};

export default Comer;

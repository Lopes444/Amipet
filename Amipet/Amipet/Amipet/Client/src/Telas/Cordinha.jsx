// Cordinha.js
import React from 'react'; // Importando o React

// Definição do componente funcional Cordinha
const Cordinha = ({ onClick }) => {
  return (
    // A div contém a classe "cordinha" e aplica um cursor de 'pointer' para indicar que é clicável
    <div style={{ cursor: 'pointer' }} className="cordinha" onClick={onClick}>
      {/* A imagem da cordinha que será exibida, com o caminho relativo */}
      <img src="./public/Tela-quarto/Cordinha.png" alt="Cordinha" />
    </div>
  );
};

// Exportando o componente para que possa ser usado em outros arquivos
export default Cordinha;

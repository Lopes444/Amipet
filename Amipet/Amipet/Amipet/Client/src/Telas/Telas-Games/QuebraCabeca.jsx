import React from 'react';

const QuebraCabeca = ({ onBack, backgroundColor = 'black' }) => {
  return (
    <div className="quebra-cabeca-container" style={{ backgroundColor }}>
      
      <button className="back-button" onClick={onBack}>Voltar</button>
    </div>
  );
};

export default QuebraCabeca;

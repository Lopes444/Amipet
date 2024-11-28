// Dormir.js
import React, { useState, useEffect } from 'react';  // Importando React, useState e useEffect
import Cordinha from './Cordinha';  // Importando o componente Cordinha

// Componente funcional Dormir
const Dormir = ({ onBack, onDormirSelect }) => {
  // Estado para controlar se o fundo alternativo está ativo ou não
  const [isAlternativeBackground, setIsAlternativeBackground] = useState(false);

  // Função que alterna o estado de isAlternativeBackground quando a cordinha é clicada
  const handleCordinhaClick = () => {
    setIsAlternativeBackground(prev => !prev);  // Alterna o valor do estado
  };

  // Hook useEffect para verificar se o usuário está autenticado
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('usuarioLogado');  // Verifica no localStorage se o usuário está logado
    console.log(isAuthenticated);  // Exibe o valor no console para debug
    if (!isAuthenticated) {
      onDormirSelect('escolha');  // Se não estiver logado, redireciona para a página de login
    }
  }, [onDormirSelect]);  // A dependência aqui é o onDormirSelect, que vai ser chamado quando o efeito rodar

  // Hook useEffect para alterar o fundo da página quando isAlternativeBackground mudar
  useEffect(() => {
    // Adiciona ou remove a classe 'alternative-background' no body dependendo do estado
    if (isAlternativeBackground) {
      document.body.classList.add('alternative-background');
    } else {
      document.body.classList.remove('alternative-background');
    }

    // Função de limpeza para remover a classe 'alternative-background' quando o componente for desmontado
    return () => {
      document.body.classList.remove('alternative-background');
    };
  }, [isAlternativeBackground]);  // O efeito é disparado sempre que isAlternativeBackground mudar

  return (
    <div>
      <main>
        {/* Exibe uma imagem de uma capivara */}
        <img className='capivara-dormir' src="./public/Tela-fundo-inicio/Capivara-img.png" alt="Capivara" />
        {/* Componente Cordinha, que dispara a função handleCordinhaClick ao ser clicado */}
        <Cordinha onClick={handleCordinhaClick} />
      </main>
      {/* Botão de voltar que chama a função onBack passada como prop */}
      <button className="back-button" onClick={onBack}>Voltar</button>
    </div>
  );
};

export default Dormir;

import React, { useEffect } from 'react';
import '../Telas-CSS/chat.css';

// Componente funcional React que define a interface do chat
const Chat = ({ onBack, backgroundColor = '' }) => {
  useEffect(() => {
    // Função chatbot que processa a entrada do usuário e retorna uma resposta
    function chatbot(input) {
      let output = '';
      input = input.toLowerCase(); // Converte a entrada para letras minúsculas
      // Lógica para identificar palavras-chave e gerar respostas
      if (input.includes('ola') || input.includes('oi')) {
        output = 'Oi, eu sou seu novo amiguinho';
      } else if (input.includes('como você está')) {
        output = 'Eu estou bem.';
      } else if (input.includes('qual é o seu nome')) {
        output = 'Meu nome é Capibara';
      } else if (input.includes('oque vc sabe fazer')) {
        output = 'Eu sei contar piadas e muito mais coisas.';
      } else if (input.includes('me conte uma piada')) {
        output = 'Por que o gato não gosta de computador? Porque ele prefere o "mouse".';
      } else {
        output = 'Desculpa, não entendi o que você falou.';
      }
      return output; // Retorna a resposta do bot
    }

    // Função que exibe a mensagem do bot no elemento de chat
    function displayBotMessage(message) {
      const chat = document.getElementById('chat'); // Seleciona o elemento do chat
      chat.innerHTML = ''; // Limpa o conteúdo anterior do chat

      // Cria um elemento para a mensagem do bot
      const botMessage = document.createElement('div');
      botMessage.classList.add('message', 'bot'); // Adiciona classes CSS para estilo

      // Adiciona o texto à mensagem
      const botText = document.createElement('div');
      botText.classList.add('text');
      botText.innerText = message;

      botMessage.appendChild(botText); // Insere o texto no elemento da mensagem
      chat.appendChild(botMessage); // Adiciona a mensagem ao chat
      chat.scrollTop = chat.scrollHeight; // Rola para o final do chat
    }

    // Função para enviar a mensagem do usuário
    function sendMessage() {
      const input = document.getElementById('input').value; // Obtém o valor do campo de entrada
      if (input) {
        const output = chatbot(input); // Processa a entrada do usuário com o chatbot
        document.getElementById('input').value = ''; // Limpa o campo de entrada

        // Adiciona um atraso antes de exibir a mensagem do bot
        setTimeout(() => {
          displayBotMessage(output);
        }, 800); // Atraso de 800ms
      }
    }

    // Adiciona um evento de clique ao botão de enviar
    document.getElementById('button').addEventListener('click', sendMessage);

    // Adiciona um evento para enviar a mensagem ao pressionar "Enter"
    document.getElementById('input').addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
  }, []); // O array vazio indica que o efeito será executado apenas uma vez

  // Renderiza o componente de interface do chat
  return (
    <div className="chat-container" style={{ backgroundColor, height: '100vh' }}>
      {/* Botão para voltar à tela anterior */}
      <button className="back-button" onClick={onBack}>Voltar</button>

      {/* Contêiner principal */}
      <div className="container">
        {/* Título do chat */}
        <div className="title">Chat com seu amiguinho</div>
        
        {/* Área onde as mensagens serão exibidas */}
        <div className="chat" id="chat"></div>
        
        {/* Área de entrada de mensagem */}
        <div className="input-container">
          <input
            type="text"
            className="input"
            id="input"
            placeholder="Escreva sua mensagem"
          />
          {/* Botão para enviar a mensagem */}
          <button className="button" id="button">
            <i className="fa-brands fa-telegram"></i> Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat; // Exporta o componente para ser usado em outros lugares

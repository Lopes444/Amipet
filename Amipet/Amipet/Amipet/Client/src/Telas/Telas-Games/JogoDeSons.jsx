import React, { useState, useEffect } from 'react';
import '../Telas-CSS/forca.css'

const JogoDeSons = ({ onBack, backgroundColor = '' }) => {
  const [palavraEscolhida, setPalavraEscolhida] = useState('');
  const [exibicaoPalavra, setExibicaoPalavra] = useState([]);
  const [letrasChutadas, setLetrasChutadas] = useState([]);
  const [tentativasRestantes, setTentativasRestantes] = useState(7);
  const [numeroErros, setNumeroErros] = useState(0);
  const [mensagem, setMensagem] = useState('');
  const listaPalavras = [
    'abelha', 'bola', 'casa', 'dente', 'elefante', 'fada', 'gato', 'hora', 
    'ilha', 'jacare', 'leao', 'macaco', 'nuvem', 'orelha', 'pato', 'queijo', 
    'rosa', 'sapo', 'tigre', 'urso', 'vela', 'xicara', 'zebra', 'anjo', 
    'coelho', 'dinossauro', 'estrela', 'foguete', 'girafa', 'pe'
  ];
  

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const palavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    setPalavraEscolhida(palavra);
    setExibicaoPalavra(Array(palavra.length).fill('_'));
    setLetrasChutadas([]);
    setTentativasRestantes(7);
    setNumeroErros(0);
    setMensagem('');
  };

  const atualizarExibicao = () => {
    if (tentativasRestantes === 0) {
      encerrarJogo('VOCÊ MORREU!');
    } else if (!exibicaoPalavra.includes('_')) {
      encerrarJogo('Parabéns! Você venceu!');
    }
  };

  const chutarLetra = () => {
    const letra = document.getElementById('entrada-letra').value.toLowerCase();
    if (!letra.match(/[a-zà-ùç]/i)) {
      alert('Por favor, insira uma letra válida.');
      return;
    }

    if (letrasChutadas.includes(letra)) {
      alert('Você já tentou esta letra. Tente outra.');
      return;
    }

    setLetrasChutadas([...letrasChutadas, letra]);

    if (palavraEscolhida.includes(letra)) {
      const novaExibicaoPalavra = [...exibicaoPalavra];
      for (let i = 0; i < palavraEscolhida.length; i++) {
        if (palavraEscolhida[i] === letra) {
          novaExibicaoPalavra[i] = letra;
        }
      }
      setExibicaoPalavra(novaExibicaoPalavra);
    } else {
      setTentativasRestantes(tentativasRestantes - 1);
      setNumeroErros(numeroErros + 1);
    }

    document.getElementById('entrada-letra').value = '';
    atualizarExibicao();
  };

  const encerrarJogo = (mensagem) => {
    setMensagem(mensagem);
  };

  return (
    <div className="jogo-de-sons-container" style={{ backgroundColor }}>
      <button className="back-button" onClick={onBack}>Voltar</button>
      <h1>Jogo da Forca</h1>
      <img id="imagem" src={`img/forca${numeroErros}.png`} alt="Forca" />
      <div id="exibicao-palavra">{exibicaoPalavra.join(' ')}</div>
      <input type="text" id="entrada-letra" placeholder="Chute uma letra" maxLength="1" disabled={mensagem !== ''} />
      <button id="btn-chutar" onClick={chutarLetra}>Chutar</button>
      <h2>Letras Chutadas</h2>
      <div id="letras-chutadas">{letrasChutadas.join(', ')}</div>
      <div id="mensagem">{mensagem}</div>
      <button id="botao-reiniciar" onClick={iniciarJogo} style={{ display: mensagem ? 'block' : 'none' }}>Recomeçar</button>
    </div>
  );
};

export default JogoDeSons;

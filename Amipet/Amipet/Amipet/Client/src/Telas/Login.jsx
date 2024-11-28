// Importa o React e o hook useState, que será usado para armazenar os valores dos campos.
import React, { useState } from "react";

// Importa o arquivo de estilos CSS para aplicar as classes ao componente.
import './Telas-CSS/Login.css';

// Função componente Login, que recebe uma função onFormSwitch como prop.
// onFormSwitch será executada quando o formulário for enviado.
export const Login = ({ onFormSwitch }) => {
  // useState é usado para armazenar o valor dos campos de e-mail e senha.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Retorna o JSX (código HTML) para renderizar a interface do componente Login.
  return (
    <div className="login-card"> {/* Card que envolve todo o formulário de login */}
      <h1 className="login-title">AMIPET</h1> {/* Título principal do login */}
      <h2 className="login-subtitle">Login</h2> {/* Subtítulo abaixo do título principal */}
      
      {/* Formulário para o login */}
      <form onSubmit={onFormSwitch} className="login-form">
        {/* Label para o campo de e-mail */}
        <label htmlFor="email" className="form-label">E-mail</label>
        
        {/* Campo de input para o e-mail */}
        <input
          type="email"  // Tipo de dado, que é um email
          id="email"    // Id para referenciar o campo
          value={email} // Valor do input é controlado pelo state 'email'
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado 'email' conforme o usuário digita
          placeholder="Digite seu e-mail" // Texto exibido dentro do campo quando vazio
          className="form-input" // Aplica o estilo CSS à classe 'form-input'
          required // Torna o campo obrigatório
        />

        {/* Label para o campo de senha */}
        <label htmlFor="password" className="form-label">Senha</label>

        {/* Campo de input para a senha */}
        <input
          type="password"  // Tipo de dado, que é uma senha
          id="password"    // Id para referenciar o campo
          value={password} // Valor do input é controlado pelo state 'password'
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'password' conforme o usuário digita
          placeholder="Digite sua senha" // Texto exibido dentro do campo quando vazio
          className="form-input" // Aplica o estilo CSS à classe 'form-input'
          required // Torna o campo obrigatório
        />

        {/* Botão de submit para enviar o formulário */}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

// Exporta o componente Login como o valor padrão, para que possa ser utilizado em outros lugares
export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <form>
        <input placeholder="Seu nome completo" />
        <input type="email" placeholder="Seu email" />

        <input type="password" placeholder="Senha" />

        <button type="submit">Acessar</button>
        <Link to="/">Já possuo conta</Link>
      </form>
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '~/pages/_layouts/auth/styles';
import Input from '~/components/Input'
import logo from '~/assets/logo.svg';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Seu email" />
        <Input type="password" placeholder="Senha" />

        <button type="submit">Acessar</button>
        <Link to="/signup">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

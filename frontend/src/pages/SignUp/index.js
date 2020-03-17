import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '~/pages/_layouts/auth/styles';
import Input from '~/components/Input'
import logo from '~/assets/logo.svg';

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form onSubmit={handleSubmit}>
        <Input name='name' placeholder="Seu nome completo" />
        <Input name='email' type="email" placeholder="Seu email" />

        <Input name='password' type="password" placeholder="Senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já possuo conta</Link>
      </Form>
    </>
  );
}

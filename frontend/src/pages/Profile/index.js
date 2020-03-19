import React from 'react';
import { useSelector } from 'react-redux';

import Input from '~/components/Input';
import { Container } from './styles';
import { Form } from '~/pages/_layouts/auth/styles';

// import { Container } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Form initialData={profile}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />
        <hr />
        <Input name="oldPassword" placeholder="Sua senha atual" />
        <Input name="password" placeholder="Nova senha" />
        <Input name="confirmPassword" placeholder="Confime sua senha" />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button">Log out</button>
    </Container>
  );
}

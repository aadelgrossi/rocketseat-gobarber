import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Input from '~/components/Input';
import AvatarInput from './AvatarInput';

import { Container } from './styles';
import { Form } from '~/pages/_layouts/auth/styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />
        <hr />
        <Input name="oldPassword" placeholder="Sua senha atual" />
        <Input name="password" placeholder="Nova senha" />
        <Input name="confirmPassword" placeholder="Confime sua senha" />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Encerrar sessão
      </button>
    </Container>
  );
}

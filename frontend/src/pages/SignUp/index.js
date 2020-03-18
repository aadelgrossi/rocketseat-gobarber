import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';
import { Form } from '~/pages/_layouts/auth/styles';
import Input from '~/components/Input';
import logo from '~/assets/logo.svg';

export default function SignUp() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const { name, email, password } = data;

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string()
          .email('Insira um email válido')
          .required('Campo obrigatório'),
        password: Yup.string()
          .min(6, 'Mínimo de 6 caracteres')
          .required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(signUpRequest(name, email, password));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });

          formRef.current.setErrors(validationErrors);
        }
      }
    }
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Seu nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />

        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já possuo conta</Link>
      </Form>
    </>
  );
}

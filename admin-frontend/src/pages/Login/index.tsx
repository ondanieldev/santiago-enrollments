import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import 'react-toastify/dist/ReactToastify.css';

interface IFormData {
  username: string;
  password: string;
}

toast.configure();

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});

        setLoading(true);

        const schema = Yup.object().shape({
          username: Yup.string().required('Usuário não informado'),
          password: Yup.string().required('Senha não informada'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        toast.error('Credenciais incorretas!');
      } finally {
        setLoading(false);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Form onSubmit={handleLogin} ref={formRef}>
        <Input name="username" placeholder="Usuário" icon={FiUser} />

        <Input
          name="password"
          type="password"
          placeholder="Senha"
          icon={FiLock}
        />

        <Button type="submit" loading={loading}>
          Acessar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

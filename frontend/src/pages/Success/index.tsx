import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Success: React.FC = () => (
  <Container>
    <strong>
      O formulário foi enviado com
      <b> sucesso!</b>
    </strong>
    <a href="http://colegiosantiago.com.br/">Voltar para a página principal</a>
    <Link to="/">Enviar outra resposta</Link>
  </Container>
);

export default Success;

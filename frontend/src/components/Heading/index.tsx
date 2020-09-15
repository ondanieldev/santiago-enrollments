import React from 'react';

import { Container } from './styles';

interface IProps {
  title: string;
}

const Heading: React.FC<IProps> = ({ title }) => (
  <Container>
    <h1>{title}</h1>
    <hr />
  </Container>
);

export default Heading;

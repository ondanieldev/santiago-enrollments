import React from 'react';

import { Container } from './styles';

interface IProps {
  title: string;
}

const Heading: React.FC<IProps> = ({ title }) => (
  <Container>
    <h2>{title}</h2>
    <hr />
  </Container>
);

export default Heading;

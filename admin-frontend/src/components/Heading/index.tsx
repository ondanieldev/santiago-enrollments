import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { Container } from './styles';

interface IProps {
  title: string;
  showData: boolean;
  onClick(): void;
}

const Heading: React.FC<IProps> = ({ title, showData, onClick }) => (
  <Container>
    <button type="button" onClick={onClick}>
      {showData ? <FiEye size={25} /> : <FiEyeOff size={25} />}
    </button>

    <h2>{title}</h2>
  </Container>
);

export default Heading;

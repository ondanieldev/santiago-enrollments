import React from 'react';
import { Link } from 'react-router-dom';

import { Container, GradesList } from './styles';
import IconBar from '../../components/IconBar';

const Grades: React.FC = () => (
  <Container>
    <IconBar hideGoBack hideGoHome />

    <h1>Turmas</h1>

    <strong>Selecione uma turma</strong>

    <GradesList>
      <Link to="/students/maternal">Maternal - 2021</Link>
      <Link to="/students/first_period">1º Período - 2021</Link>
      <Link to="/students/second_period">2º Período - 2021</Link>
      <Link to="/students/first_year">1º ano - 2021</Link>
      <Link to="/students/second_year">2º ano - 2021</Link>
      <Link to="/students/third_year">3º ano - 2021</Link>
      <Link to="/students/fourth_year">4º ano - 2021</Link>
      <Link to="/students/fifth_year">5º ano - 2021</Link>
      <Link to="/students/sixth_year">6º ano - 2021</Link>
      <Link to="/students/seventh_year">7º ano - 2021</Link>
      <Link to="/students/eighth_year">8º ano - 2021</Link>
      <Link to="/students/nineth_year">9º ano - 2021</Link>
    </GradesList>
  </Container>
);

export default Grades;

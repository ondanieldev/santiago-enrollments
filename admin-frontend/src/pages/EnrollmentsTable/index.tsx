import React, { useEffect, useState } from 'react';

import { Container, List } from './styles';
import IconBar from '../../components/IconBar';
import api from '../../services/api';
import IReenrollmentDTO from '../../dtos/IReenrollmentDTO';
import { formatGrade } from '../../utils/formatFunctions';

const EnrolmentsTable: React.FC = () => {
  const [reenrollments, setReenrollments] = useState([] as IReenrollmentDTO[]);

  useEffect(() => {
    api.get('/reenrollments').then(response => {
      const data = response.data as IReenrollmentDTO[];

      data.forEach(reenrollment => {
        reenrollment.formated_grade = formatGrade(reenrollment.grade_name);
      });

      data.sort((a, b) => {
        if (a.formated_grade && b.formated_grade) {
          return a.formated_grade < b.formated_grade ? -1 : 1;
        }

        return 0;
      });

      setReenrollments(data);
    });
  }, []);

  return (
    <Container>
      <IconBar />

      <List>
        <thead>
          <tr>
            <td>Turma</td>
            <td>Nome</td>
            <td>Responsável financeiro</td>
            <td>R.F. Número</td>
            <td>Responsável Solidário</td>
            <td>R.S. Número</td>
          </tr>
        </thead>

        <tbody>
          {reenrollments.map(reenrollment => (
            <tr key={reenrollment.enrollment_number}>
              <td>{reenrollment.formated_grade}</td>
              <td>{reenrollment.student_name}</td>
              <td>{reenrollment.financial_name}</td>
              <td>{reenrollment.financial_personal_phone}</td>
              <td>{reenrollment.supportive_name}</td>
              <td>{reenrollment.supportive_personal_phone}</td>
            </tr>
          ))}
        </tbody>
      </List>
    </Container>
  );
};

export default EnrolmentsTable;

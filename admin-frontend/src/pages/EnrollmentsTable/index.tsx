import React, { useEffect, useState } from 'react';
import { format as formatDate, parseISO } from 'date-fns';

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

      <div>
        <List>
          <thead>
            <tr>
              <td colSpan={1}>Turma</td>
              <td colSpan={7}>Aluno</td>
              <td colSpan={5}>Responsável financeiro</td>
              <td colSpan={5}>Responsável solidário</td>
              <td colSpan={1}>Mãe</td>
              <td colSpan={1}>Pai</td>
            </tr>
            <tr>
              <td>Nome</td>
              <td>Nome</td>
              <td>Situação</td>
              <td>Data da matrícula</td>
              <td>Data de nascimento</td>
              <td>Natrualidade</td>
              <td>CEP</td>
              <td>Endereço</td>
              <td>Nome</td>
              <td>Parentesco</td>
              <td>Telefones</td>
              <td>CPF</td>
              <td>E-mail</td>
              <td>Nome</td>
              <td>Parentesco</td>
              <td>Telefones</td>
              <td>CPF</td>
              <td>E-mail</td>
              <td>Nome</td>
              <td>Nome</td>
            </tr>
          </thead>

          <tbody>
            {reenrollments.map(reenrollment => (
              <tr key={reenrollment.enrollment_number}>
                <td>{reenrollment.formated_grade}</td>
                <td>{reenrollment.student_name}</td>
                <td>{reenrollment.type === 'reenrollment' ? 'R' : 'N'}</td>
                <td> - </td>
                <td>
                  {formatDate(
                    parseISO(reenrollment.student_birth_date.toString()),
                    'dd/MM/yyyy',
                  )}
                </td>
                <td>{`${reenrollment.student_birth_city} - ${reenrollment.student_birth_state}`}</td>
                <td>{reenrollment.financial_address_cep}</td>
                <td>{`${reenrollment.financial_address_street} - ${reenrollment.financial_address_number} ${reenrollment.financial_address_complement} - ${reenrollment.financial_address_neighborhood} - ${reenrollment.financial_address_city}`}</td>
                <td>{reenrollment.financial_name}</td>
                <td>{reenrollment.financial_kinship}</td>
                <td>
                  {reenrollment.financial_personal_phone}
                  <br />
                  {reenrollment.financial_commercial_phone}
                  <br />
                  {reenrollment.financial_residencial_phone}
                </td>
                <td>{reenrollment.financial_cpf}</td>
                <td>{reenrollment.financial_email}</td>
                <td>{reenrollment.supportive_name}</td>
                <td>{reenrollment.supportive_kinship}</td>
                <td>
                  {reenrollment.supportive_personal_phone}
                  <br />
                  {reenrollment.supportive_commercial_phone}
                  <br />
                  {reenrollment.supportive_residencial_phone}
                </td>
                <td>{reenrollment.supportive_cpf}</td>
                <td>{reenrollment.supportive_email}</td>
                <td>{reenrollment.student_mother_name}</td>
                <td>{reenrollment.student_father_name}</td>
              </tr>
            ))}
          </tbody>
        </List>
      </div>
    </Container>
  );
};

export default EnrolmentsTable;

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container, DataGroup, Table, DocumentGroup } from './styles';
import IReenrollmentDTO from '../../dtos/IReenrollmentDTO';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Document from '../../components/Document';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import 'react-toastify/dist/ReactToastify.css';

interface IParams {
  reenrollment_id: string;
}

interface IFormData {
  monthly_value: number;
  discount_percent: number;
}

interface IDocument {
  name: string;
  link: string;
}

toast.configure();

const Reenrollment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const params = useParams() as IParams;

  const [reenrollment, setReenrollment] = useState({} as IReenrollmentDTO);
  const [showFinancialData, setshowFinancialData] = useState(true);
  const [showSupportiveData, setshowSupportiveData] = useState(true);
  const [showStudentData, setshowStudentData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([] as IDocument[]);

  useEffect(() => {
    const { reenrollment_id } = params;

    api.get(`/reenrollments/${reenrollment_id}`).then(response => {
      const { data } = response;
      if (data) {
        setReenrollment(data);
      }
    });
  }, [params]);

  const formatEducationLevel = useCallback(educationLevel => {
    switch (educationLevel) {
      case 'elementary_incompleted':
        return 'Fundamental incompleto';

      case 'elementary_completed':
        return 'Fundamental completo';

      case 'highschool_incompleted':
        return 'Segundo grau incompleto';

      case 'highschool_completed':
        return 'Segundo grau completo';

      case 'university_incompleted':
        return 'Superior incompleto';

      case 'university_completed':
        return 'Superior completo';
      default:
        return '';
    }
  }, []);

  const formatGender = useCallback(gender => {
    switch (gender) {
      case 'male':
        return 'Masculino';

      case 'female':
        return 'Feminino';

      default:
        return '';
    }
  }, []);

  const formatRace = useCallback(race => {
    switch (race) {
      case 'white':
        return 'Branco';

      case 'brown':
        return 'Pardo';

      case 'black':
        return 'Negro';

      case 'indigenous':
        return 'Indígena';

      case 'yellow':
        return 'Amarelo';

      default:
        return '';
    }
  }, []);

  const handleSubmitForm = useCallback(
    async (data: IFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          monthly_value: Yup.number()
            .typeError('Mensalidade inválida!')
            .required('Mensalidade obrigatória!'),
          discount_percent: Yup.number()
            .typeError('Desconto inválida!')
            .required('Desconto obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put(
          `/reenrollments/${reenrollment.student_name}`,
          data,
        );

        setDocuments(response.data);

        toast.success('Documentos gerados com sucesso!');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          toast.error('Preencha os campos corretamente!');

          return;
        }

        toast.error('Erro interno do servidor!');
      } finally {
        setLoading(false);
      }
    },
    [reenrollment],
  );

  return (
    <Container>
      <h1>Solicitação de Rematrícula</h1>

      <strong>Analise os dados e preencha os campos de valor e desconto</strong>

      <DataGroup>
        <Heading
          title="Responsável financeiro"
          showData={showFinancialData}
          onClick={() => setshowFinancialData(!showFinancialData)}
        />

        {showFinancialData && (
          <Table>
            <tbody>
              <tr>
                <td>Nome</td>
                <td>{reenrollment.financial_name}</td>
              </tr>
              <tr>
                <td>Data de nascimento</td>
                <td>{reenrollment.financial_birth_date}</td>
              </tr>
              <tr>
                <td>Nacionalidade</td>
                <td>{reenrollment.financial_nacionality}</td>
              </tr>
              <tr>
                <td>Estado civil</td>
                <td>{reenrollment.financial_civil_state}</td>
              </tr>
              <tr>
                <td>Profissão</td>
                <td>{reenrollment.financial_profission}</td>
              </tr>
              <tr>
                <td>CPF</td>
                <td>{reenrollment.financial_cpf}</td>
              </tr>
              <tr>
                <td>RG</td>
                <td>{reenrollment.financial_rg}</td>
              </tr>
              <tr>
                <td>Endereço</td>
                <td>{`${reenrollment.financial_address_street} - ${reenrollment.financial_address_number} ${reenrollment.financial_address_complement} - ${reenrollment.financial_address_neighborhood} - ${reenrollment.financial_address_city}`}</td>
              </tr>
              <tr>
                <td>CEP</td>
                <td>{reenrollment.financial_address_cep}</td>
              </tr>
              <tr>
                <td>Telefone residencial</td>
                <td>{reenrollment.financial_residencial_phone}</td>
              </tr>
              <tr>
                <td>Telefone comercial</td>
                <td>{reenrollment.financial_commercial_phone}</td>
              </tr>
              <tr>
                <td>Telefone pesssoal</td>
                <td>{reenrollment.financial_personal_phone}</td>
              </tr>
              <tr>
                <td>Grau de escolaridade</td>
                <td>
                  {formatEducationLevel(reenrollment.financial_education_level)}
                </td>
              </tr>
              <tr>
                <td>Local de trabalho</td>
                <td>{reenrollment.financial_workplace}</td>
              </tr>
              <tr>
                <td>Renda mensal</td>
                <td>{reenrollment.financial_monthly_income}</td>
              </tr>
              <tr>
                <td>Declara imposto de renda?</td>
                <td>{reenrollment.financial_income_tax ? 'Sim' : 'Não'}</td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>{reenrollment.financial_email}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </DataGroup>

      <DataGroup>
        <Heading
          title="Responsável solidário"
          showData={showSupportiveData}
          onClick={() => setshowSupportiveData(!showSupportiveData)}
        />

        {showSupportiveData && (
          <Table>
            <tbody>
              <tr>
                <td>Nome</td>
                <td>{reenrollment.supportive_name}</td>
              </tr>
              <tr>
                <td>Data de nascimento</td>
                <td>{reenrollment.supportive_birth_date}</td>
              </tr>
              <tr>
                <td>Nacionalidade</td>
                <td>{reenrollment.supportive_nacionality}</td>
              </tr>
              <tr>
                <td>Estado civil</td>
                <td>{reenrollment.supportive_civil_state}</td>
              </tr>
              <tr>
                <td>Profissão</td>
                <td>{reenrollment.supportive_profission}</td>
              </tr>
              <tr>
                <td>CPF</td>
                <td>{reenrollment.supportive_cpf}</td>
              </tr>
              <tr>
                <td>RG</td>
                <td>{reenrollment.supportive_rg}</td>
              </tr>
              <tr>
                <td>Endereço</td>
                <td>{`${reenrollment.supportive_address_street} - ${reenrollment.supportive_address_number} ${reenrollment.supportive_address_complement} - ${reenrollment.supportive_address_neighborhood} - ${reenrollment.supportive_address_city}`}</td>
              </tr>
              <tr>
                <td>CEP</td>
                <td>{reenrollment.supportive_address_cep}</td>
              </tr>
              <tr>
                <td>Telefone residencial</td>
                <td>{reenrollment.supportive_residencial_phone}</td>
              </tr>
              <tr>
                <td>Telefone comercial</td>
                <td>{reenrollment.supportive_commercial_phone}</td>
              </tr>
              <tr>
                <td>Telefone pesssoal</td>
                <td>{reenrollment.supportive_personal_phone}</td>
              </tr>
              <tr>
                <td>Grau de escolaridade</td>
                <td>
                  {formatEducationLevel(
                    reenrollment.supportive_education_level,
                  )}
                </td>
              </tr>
              <tr>
                <td>Local de trabalho</td>
                <td>{reenrollment.supportive_workplace}</td>
              </tr>
              <tr>
                <td>Renda mensal</td>
                <td>{reenrollment.supportive_monthly_income}</td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>{reenrollment.supportive_email}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </DataGroup>

      <DataGroup>
        <Heading
          title="Aluno"
          showData={showStudentData}
          onClick={() => setshowStudentData(!showStudentData)}
        />

        {showStudentData && (
          <Table>
            <tbody>
              <tr>
                <td>Nome</td>
                <td>{reenrollment.student_name}</td>
              </tr>
              <tr>
                <td>Nome do pai</td>
                <td>{reenrollment.student_father_name}</td>
              </tr>
              <tr>
                <td>Nome da mãe</td>
                <td>{reenrollment.student_mother_name}</td>
              </tr>
              <tr>
                <td>Data de nascimento</td>
                <td>{reenrollment.student_birth_date}</td>
              </tr>
              <tr>
                <td>Nacionalidade</td>
                <td>{reenrollment.student_nacionality}</td>
              </tr>
              <tr>
                <td>Cidade natal</td>
                <td>{reenrollment.student_birth_city}</td>
              </tr>
              <tr>
                <td>Estado natal</td>
                <td>{reenrollment.student_birth_state}</td>
              </tr>
              <tr>
                <td>Gênero</td>
                <td>{formatGender(reenrollment.student_gender)}</td>
              </tr>
              <tr>
                <td>Raça</td>
                <td>{formatRace(reenrollment.student_race)}</td>
              </tr>
              <tr>
                <td>Facilidade em se relacionar</td>
                <td>{reenrollment.student_ease_relating ? 'Sim' : 'Não'}</td>
              </tr>
              <tr>
                <td>Escola de origem</td>
                <td>{reenrollment.student_origin_school}</td>
              </tr>
              {reenrollment.student_health_plan && (
                <tr>
                  <td>Plano de saúde</td>
                  <td>{reenrollment.student_health_plan}</td>
                </tr>
              )}
              {reenrollment.student_food_alergy && (
                <tr>
                  <td>Alergia a alimentos</td>
                  <td>{reenrollment.student_food_alergy}</td>
                </tr>
              )}
              {reenrollment.student_medication_alergy && (
                <tr>
                  <td>Alergia a medicamentos</td>
                  <td>{reenrollment.student_medication_alergy}</td>
                </tr>
              )}
              {reenrollment.student_health_problem && (
                <tr>
                  <td>Problema de sáude</td>
                  <td>{reenrollment.student_health_problem}</td>
                </tr>
              )}
              {reenrollment.student_special_necessities && (
                <tr>
                  <td>Necessidades especiais</td>
                  <td>{reenrollment.student_special_necessities}</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </DataGroup>

      <Form ref={formRef} onSubmit={handleSubmitForm}>
        {documents.length <= 0 && (
          <>
            <Input
              type="number"
              name="monthly_value"
              placeholder="Valor da mensalidade"
            />

            <Input
              type="number"
              name="discount_percent"
              placeholder="Valor do desconto em %"
            />

            <Button loading={loading} type="submit">
              Gerar documentos
            </Button>
          </>
        )}
        {documents.length > 0 && <Button type="button">Enviar e-mail</Button>}
      </Form>

      {documents.length > 0 && (
        <DocumentGroup>
          {documents.map(document => (
            <Document
              key={document.link}
              name={document.name}
              link={`http://localhost:3333/public/${document.link}`}
            />
          ))}
        </DocumentGroup>
      )}
    </Container>
  );
};

export default Reenrollment;

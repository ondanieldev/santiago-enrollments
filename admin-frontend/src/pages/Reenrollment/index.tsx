import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container, DataGroup, Table, DocumentGroup, Top } from './styles';
import IReenrollmentDTO from '../../dtos/IReenrollmentDTO';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Document from '../../components/Document';
import IconBar from '../../components/IconBar';
import Loading from '../../components/Loading';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  prettyDate,
  formatEducationLevel,
  formatGender,
  formatRace,
} from '../../utils/formatFunctions';

import 'react-toastify/dist/ReactToastify.css';

interface IParams {
  reenrollment_number: string;
}

interface IFormData {
  discount_percent: number;
}

interface IDocument {
  name: string;
  link: string;
}

toast.configure();

const Reenrollment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const params = useParams<IParams>();
  const history = useHistory();

  const [monthlyValue, setMonthlyValue] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [reenrollment, setReenrollment] = useState({} as IReenrollmentDTO);
  const [showFinancialData, setshowFinancialData] = useState(true);
  const [showSupportiveData, setshowSupportiveData] = useState(true);
  const [showStudentData, setshowStudentData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([] as IDocument[]);

  useEffect(() => {
    const { reenrollment_number } = params;

    api
      .get(`/reenrollments/${reenrollment_number}`)
      .then(response => {
        const { data } = response;

        if (data) {
          setReenrollment(data);
        }
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, [params]);

  const handleCalcMonthlyValue = useCallback(
    (discountPercent: string): void => {
      let baseValue = 0;

      switch (reenrollment.grade_name) {
        case 'maternal':
          baseValue = 584;
          break;
        case 'first_period':
          baseValue = 584;
          break;
        case 'second_period':
          baseValue = 584;
          break;
        case 'first_year':
          baseValue = 767;
          break;
        case 'second_year':
          baseValue = 767;
          break;
        case 'third_year':
          baseValue = 767;
          break;
        case 'fourth_year':
          baseValue = 767;
          break;
        case 'fifth_year':
          baseValue = 767;
          break;
        case 'sixth_year':
          baseValue = 820;
          break;
        case 'seventh_year':
          baseValue = 820;
          break;
        case 'eighth_year':
          baseValue = 820;
          break;
        case 'nineth_year':
          baseValue = 820;
          break;
        default:
          baseValue = 0;
          break;
      }

      const parsedDiscount = parseInt(discountPercent, 10);

      setMonthlyValue(baseValue - (baseValue * parsedDiscount) / 100 || 0);
    },
    [reenrollment],
  );

  const handleSubmitForm = useCallback(
    async (data: IFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          discount_percent: Yup.number()
            .typeError('Desconto inválida!')
            .required('Desconto obrigatório!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.patch(
          `/reenrollments/pdfs/${reenrollment.enrollment_number}`,
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

  const handleEditData = useCallback(() => {
    const { reenrollment_number } = params;

    history.push(`/edit/${reenrollment_number}`);
  }, [params, history]);

  const handleSendMail = useCallback(async () => {
    try {
      setLoading(true);

      const {
        financial_name,
        student_gender,
        student_name,
        financial_email,
      } = reenrollment;

      await api.post('/reenrollments/mail', {
        reenrollmentForm: documents[0].link,
        contract: documents[1].link,
        checklist: documents[2].link,
        responsibleEmail: financial_email,
        responsibleName: financial_name,
        studentGender: student_gender,
        studentName: student_name,
      });

      toast.success('E-mail enviado com sucesso!');
    } catch (err) {
      toast.error('Erro ao enviar e-mail para o responsável!');
    } finally {
      setLoading(false);
    }
  }, [reenrollment, documents]);

  return (
    <Container>
      <Top>
        <Loading show={loadingData} />

        <IconBar />

        <h1>Solicitação de Rematrícula</h1>

        <strong>
          Analise os dados e preencha os campos de valor e desconto
        </strong>

        <Button type="button" onClick={handleEditData}>
          Editar dados
        </Button>
      </Top>

      <DataGroup>
        <Heading
          showIcon
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
                <td>Parentesco com o aluno</td>
                <td>{reenrollment.financial_kinship}</td>
              </tr>
              <tr>
                <td>Data de nascimento</td>
                <td>{prettyDate(reenrollment.financial_birth_date)}</td>
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
          showIcon
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
                <td>Parentesco com o aluno</td>
                <td>{reenrollment.supportive_kinship}</td>
              </tr>
              <tr>
                <td>Data de nascimento</td>
                <td>{prettyDate(reenrollment.supportive_birth_date)}</td>
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
          showIcon
          title="Aluno"
          showData={showStudentData}
          onClick={() => setshowStudentData(!showStudentData)}
        />

        {showStudentData && (
          <Table>
            <tbody>
              <tr>
                <td>Nome</td>
                <td>
                  {`${reenrollment.student_name} - ${
                    reenrollment.student_origin_school
                      ? 'MATRÍCULA'
                      : 'REMATRÍCULA'
                  }`}
                </td>
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
                <td>{prettyDate(reenrollment.student_birth_date)}</td>
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
              {reenrollment.student_origin_school && (
                <tr>
                  <td>Escola de origem</td>
                  <td>{reenrollment.student_origin_school}</td>
                </tr>
              )}
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
              name="discount_percent"
              placeholder="Valor do desconto em %"
              onChange={e => handleCalcMonthlyValue(e.target.value)}
            />

            <span>{`Valor da mensalidade com desconto: R$ ${monthlyValue}`}</span>

            <Button loading={loading} type="submit">
              Gerar documentos
            </Button>
          </>
        )}
        {documents.length > 0 && (
          <Button type="button" loading={loading} onClick={handleSendMail}>
            Enviar e-mail
          </Button>
        )}
      </Form>

      {documents.length > 0 && (
        <DocumentGroup>
          {documents.map(document => (
            <Document
              key={document.link}
              name={document.name}
              link={`http://162.241.93.179:3333/public/${document.link}`}
            />
          ))}
        </DocumentGroup>
      )}
    </Container>
  );
};

export default Reenrollment;

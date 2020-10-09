import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import {
  FiActivity,
  FiBriefcase,
  FiCalendar,
  FiClipboard,
  FiDollarSign,
  FiFlag,
  FiHeart,
  FiInfo,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSmartphone,
  FiSmile,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';
import cepPromise from 'cep-promise';

import { Container, FormGroup, InputGroup, ButtonGroup } from './styles';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import RadioInput from '../../components/RadioInput';
import Select from '../../components/Select';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import ISendEnrollmentDTO from '../../dtos/ISendEnrollmentDTO';
import enrollmentSchema from '../../schemas/enrollmentSchema';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const FormPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [showOriginSchool, setShowOriginSchool] = useState(false);
  const [showHealthPlan, setShowHealthPlan] = useState(false);
  const [showFoodAlergy, setShowFoodAlergy] = useState(false);
  const [showHealthProblem, setShowHealthProblem] = useState(false);
  const [showMedicationAlergy, setShowMedicationAlergy] = useState(false);
  const [showSpecialNecessities, setShowSpecialNecessities] = useState(false);
  const [reaprooveAddress, setReaprooveAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reaprooveAddress) {
      const street = formRef.current?.getFieldValue('financial_address_street');
      const number = formRef.current?.getFieldValue('financial_address_number');
      const complement = formRef.current?.getFieldValue(
        'financial_address_complement',
      );
      const neighborhood = formRef.current?.getFieldValue(
        'financial_address_neighborhood',
      );
      const city = formRef.current?.getFieldValue('financial_address_city');
      const cep = formRef.current?.getFieldValue('financial_address_cep');

      formRef.current?.setFieldValue('supportive_address_street', street);
      formRef.current?.setFieldValue('supportive_address_number', number);
      formRef.current?.setFieldValue(
        'supportive_address_complement',
        complement,
      );
      formRef.current?.setFieldValue(
        'supportive_address_neighborhood',
        neighborhood,
      );
      formRef.current?.setFieldValue('supportive_address_city', city);
      formRef.current?.setFieldValue('supportive_address_cep', cep);
    } else {
      formRef.current?.setFieldValue('supportive_address_street', '');
      formRef.current?.setFieldValue('supportive_address_number', '');
      formRef.current?.setFieldValue('supportive_address_complement', '');
      formRef.current?.setFieldValue('supportive_address_neighborhood', '');
      formRef.current?.setFieldValue('supportive_address_city', '');
      formRef.current?.setFieldValue('supportive_address_cep', '');
    }
  }, [reaprooveAddress]);

  const handleSearchAddressByCep = useCallback((cep, responsible_type) => {
    cepPromise(cep).then(result => {
      const { street, neighborhood, city } = result;

      if (responsible_type === 'financial') {
        formRef.current?.setFieldValue('financial_address_street', street);
        formRef.current?.setFieldValue(
          'financial_address_neighborhood',
          neighborhood,
        );
        formRef.current?.setFieldValue('financial_address_city', city);
      } else {
        formRef.current?.setFieldValue('supportive_address_street', street);
        formRef.current?.setFieldValue(
          'supportive_address_neighborhood',
          neighborhood,
        );
        formRef.current?.setFieldValue('supportive_address_city', city);
      }
    });
  }, []);

  const handleSubmitForm = useCallback(
    async (data: ISendEnrollmentDTO, { reset }) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const enrollment = data;

        await enrollmentSchema.validate(enrollment, {
          abortEarly: false,
        });

        enrollment.type = showOriginSchool ? 'enrollment' : 'reenrollment';

        enrollment.student_origin_school = showOriginSchool
          ? enrollment.student_origin_school
          : '';

        enrollment.student_health_plan = showHealthPlan
          ? enrollment.student_health_plan
          : '';

        enrollment.student_food_alergy = showFoodAlergy
          ? enrollment.student_food_alergy
          : '';

        enrollment.student_medication_alergy = showMedicationAlergy
          ? enrollment.student_medication_alergy
          : '';

        enrollment.student_health_problem = showHealthProblem
          ? enrollment.student_health_problem
          : '';

        enrollment.student_special_necessities = showSpecialNecessities
          ? enrollment.student_special_necessities
          : '';

        enrollment.financial_income_tax === 'yes'
          ? (enrollment.financial_income_tax = true)
          : (enrollment.financial_income_tax = false);

        enrollment.student_ease_relating === 'yes'
          ? (enrollment.student_ease_relating = true)
          : (enrollment.student_ease_relating = false);

        await api.post('/reenrollments', enrollment);

        reset();

        toast.success('Dados enviados com sucesso!');

        history.push('/success');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          toast.error(
            'Oops... alguns dados não foram preenchidos corretamente!',
          );
          return;
        }

        toast.error('Erro interno do servidor!');
      } finally {
        setLoading(false);
      }
    },
    [
      history,
      showHealthPlan,
      showSpecialNecessities,
      showMedicationAlergy,
      showHealthProblem,
      showFoodAlergy,
      showOriginSchool,
    ],
  );

  return (
    <Container>
      <h1>Ficha de Matrícula/Rematrícula - Ano 2021</h1>

      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <FormGroup>
          <Heading title="Dados do responsável financeiro" />

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input name="financial_name" placeholder="Nome" icon={FiUser} />

            <Input
              name="financial_kinship"
              placeholder="Parentesco com o aluno"
              icon={FiUsers}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input name="financial_rg" placeholder="RG" icon={FiClipboard} />

            <Input name="financial_cpf" placeholder="CPF" icon={FiClipboard} />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="financial_nacionality"
              placeholder="Nacionalidade"
              icon={FiFlag}
            />

            <Input
              name="financial_civil_state"
              placeholder="Estado civil"
              icon={FiHeart}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Select name="financial_education_level" icon={FiInfo}>
              <option value="null">Grau de instrução</option>
              <option value="elementary_incompleted">
                Fundamental incompleto
              </option>
              <option value="elementary_completed">Fundamental completo</option>
              <option value="highschool_incompleted">
                Segundo grau incompleto
              </option>
              <option value="highschool_completed">
                Segundo grau completo
              </option>
              <option value="university_incompleted">
                Superior incompleto
              </option>
              <option value="university_completed">Superior completo</option>
            </Select>

            <Input
              name="financial_profission"
              placeholder="Profissão"
              icon={FiBriefcase}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="financial_workplace"
              placeholder="Local de trabalho"
              icon={FiBriefcase}
            />

            <Input
              name="financial_commercial_phone"
              placeholder="Telefone comercial"
              icon={FiPhone}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="financial_residencial_phone"
              placeholder="Telefone residencial"
              icon={FiPhone}
            />

            <Input
              name="financial_personal_phone"
              placeholder="Telefone pessoal"
              icon={FiSmartphone}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="financial_address_cep"
              placeholder="CEP"
              icon={FiMapPin}
              onBlur={e =>
                handleSearchAddressByCep(e.target.value, 'financial')
              }
            />

            <Input
              name="financial_address_street"
              placeholder="Rua"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              type="number"
              name="financial_address_number"
              placeholder="Número"
              icon={FiMapPin}
            />

            <Input
              name="financial_address_complement"
              placeholder="Complemento"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="financial_address_neighborhood"
              placeholder="Bairro"
              icon={FiMapPin}
            />

            <Input
              name="financial_address_city"
              placeholder="Cidade"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              type="email"
              name="financial_email"
              placeholder="E-mail"
              icon={FiMail}
            />

            <Input
              type="number"
              name="financial_monthly_income"
              placeholder="Renda mensal"
              icon={FiDollarSign}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              type="date"
              name="financial_birth_date"
              icon={FiCalendar}
              label="Data de nascimento"
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <RadioInput
              name="financial_income_tax"
              label="Declara imposto de renda?"
              options={[
                { id: 'fit1', label: 'Sim', value: 'yes' },
                { id: 'fit2', label: 'Não', value: 'no', default: true },
              ]}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Heading title="Dados do responsável solidário" />

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input name="supportive_name" placeholder="Nome" icon={FiUser} />

            <Input
              name="supportive_kinship"
              placeholder="Parentesco com o aluno"
              icon={FiUsers}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input name="supportive_rg" placeholder="RG" icon={FiClipboard} />

            <Input name="supportive_cpf" placeholder="CPF" icon={FiClipboard} />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="supportive_nacionality"
              placeholder="Nacionalidade"
              icon={FiFlag}
            />

            <Input
              name="supportive_civil_state"
              placeholder="Estado civil"
              icon={FiHeart}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Select name="supportive_education_level" icon={FiInfo}>
              <option value="null">Grau de instrução</option>
              <option value="elementary_incompleted">
                Fundamental incompleto
              </option>
              <option value="elementary_completed">Fundamental completo</option>
              <option value="highschool_incompleted">
                Segundo grau incompleto
              </option>
              <option value="highschool_completed">
                Segundo grau completo
              </option>
              <option value="university_incompleted">
                Superior incompleto
              </option>
              <option value="university_completed">Superior completo</option>
            </Select>

            <Input
              name="supportive_profission"
              placeholder="Profissão"
              icon={FiBriefcase}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="supportive_workplace"
              placeholder="Local de trabalho"
              icon={FiBriefcase}
            />

            <Input
              name="supportive_commercial_phone"
              placeholder="Telefone comercial"
              icon={FiPhone}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="supportive_residencial_phone"
              placeholder="Telefone residencial"
              icon={FiPhone}
            />

            <Input
              name="supportive_personal_phone"
              placeholder="Telefone pessoal"
              icon={FiSmartphone}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Checkbox
              name="reaproove_address"
              label="Utilizar o mesmo endereço do responsável financeiro?"
              onChange={e => setReaprooveAddress(e.target.checked)}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="supportive_address_cep"
              placeholder="CEP"
              icon={FiMapPin}
              onBlur={e =>
                handleSearchAddressByCep(e.target.value, 'supportive')
              }
            />

            <Input
              name="supportive_address_street"
              placeholder="Rua"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              type="number"
              name="supportive_address_number"
              placeholder="Número"
              icon={FiMapPin}
            />

            <Input
              name="supportive_address_complement"
              placeholder="Complemento"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="supportive_address_neighborhood"
              placeholder="Bairro"
              icon={FiMapPin}
            />

            <Input
              name="supportive_address_city"
              placeholder="Cidade"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              type="email"
              name="supportive_email"
              placeholder="E-mail"
              icon={FiMail}
            />

            <Input
              type="number"
              name="supportive_monthly_income"
              placeholder="Renda mensal"
              icon={FiDollarSign}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              type="date"
              name="supportive_birth_date"
              icon={FiCalendar}
              label="Data de nascimento"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Heading title="Dados do aluno" />

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input name="student_name" placeholder="Nome" icon={FiUser} />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="student_nacionality"
              placeholder="Nacionalidade"
              icon={FiFlag}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="student_birth_city"
              placeholder="Cidade natal"
              icon={FiMapPin}
            />

            <Input
              name="student_birth_state"
              placeholder="Estado natal"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              name="student_father_name"
              placeholder="Nome do pai"
              icon={FiUsers}
            />

            <Input
              name="student_mother_name"
              placeholder="Nome da mãe"
              icon={FiUsers}
            />
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Select name="student_gender" icon={FiInfo}>
              <option value="null">Gênero</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </Select>

            <Select name="student_race" icon={FiInfo}>
              <option value="null">Raça</option>
              <option value="white">Branco</option>
              <option value="brown">Pardo</option>
              <option value="black">Negro</option>
              <option value="indigenous">Indígena</option>
              <option value="yellow">Amarelo</option>
            </Select>
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <Input
              type="date"
              name="student_birth_date"
              icon={FiCalendar}
              label="Data de nascimento"
            />

            <Select
              name="grade_name"
              icon={FiSmile}
              label="Turma desejada para 2021"
            >
              <option value="null">Turma</option>
              <option value="maternal">Maternal 2021</option>
              <option value="first_period">1º período 2021</option>
              <option value="second_period">2º período 2021</option>
              <option value="first_year">1º ano 2021</option>
              <option value="second_year">2º ano 2021</option>
              <option value="third_year">3º ano 2021</option>
              <option value="fourth_year">4º ano 2021</option>
              <option value="fifth_year">5º ano 2021</option>
              <option value="sixth_year">6º ano 2021</option>
              <option value="seventh_year">7º ano 2021</option>
              <option value="eighth_year">8º ano 2021</option>
              <option value="nineth_year">9º ano 2021</option>
            </Select>
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <RadioInput
              name="has_origin_school"
              label="Selecione uma opção:"
              options={[
                {
                  id: 'hos1',
                  label: 'Matrícula',
                  value: 'yes',
                },
                {
                  id: 'hos2',
                  label: 'Rematrícula',
                  value: 'no',
                  default: true,
                },
              ]}
              change={value => setShowOriginSchool(value === 'yes')}
            />

            {showOriginSchool && (
              <Input
                name="student_origin_school"
                placeholder="Escola de origem"
                icon={FiMapPin}
              />
            )}
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <RadioInput
              name="has_health_plan"
              label="Possui algum plano de saúde?"
              options={[
                { id: 'hhp1', label: 'Sim', value: 'yes' },
                { id: 'hhp2', label: 'Não', value: 'no', default: true },
              ]}
              change={value => setShowHealthPlan(value === 'yes')}
            />

            {showHealthPlan && (
              <Input
                name="student_health_plan"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <RadioInput
              name="has_medication_alergy"
              label="Possui alergia a algum medicamento?"
              options={[
                { id: 'hma1', label: 'Sim', value: 'yes' },
                { id: 'hma2', label: 'Não', value: 'no', default: true },
              ]}
              change={value => setShowMedicationAlergy(value === 'yes')}
            />

            {showMedicationAlergy && (
              <Input
                name="student_medication_alergy"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <RadioInput
              name="has_food_alergy"
              label="Possui alergia a algum alimento?"
              options={[
                { id: 'hfa1', label: 'Sim', value: 'yes' },
                { id: 'hfa2', label: 'Não', value: 'no', default: true },
              ]}
              change={value => setShowFoodAlergy(value === 'yes')}
            />

            {showFoodAlergy && (
              <Input
                name="student_food_alergy"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <RadioInput
              name="has_health_problem"
              label="Possui algum problema de saúde?"
              options={[
                { id: 'hhpp1', label: 'Sim', value: 'yes' },
                { id: 'hhpp2', label: 'Não', value: 'no', default: true },
              ]}
              change={value => setShowHealthProblem(value === 'yes')}
            />

            {showHealthProblem && (
              <Input
                name="student_health_problem"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <RadioInput
              name="has_special_necessities"
              label="Possui alguma necessidade especial ou deficiência?"
              options={[
                { id: 'hsn1', label: 'Sim', value: 'yes' },
                { id: 'hsn2', label: 'Não', value: 'no', default: true },
              ]}
              change={value => setShowSpecialNecessities(value === 'yes')}
            />

            {showSpecialNecessities && (
              <Input
                name="student_special_necessities"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup displayColumn={window.innerWidth <= 700}>
            <RadioInput
              name="student_ease_relating"
              label="Tem facilidade de se relacionar com as pessoas?"
              options={[
                { id: 'ser1', label: 'Sim', value: 'yes' },
                { id: 'ser2', label: 'Não', value: 'no', default: true },
              ]}
            />
          </InputGroup>
        </FormGroup>

        <ButtonGroup>
          <Button loading={loading} type="submit">
            Enviar
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default FormPage;

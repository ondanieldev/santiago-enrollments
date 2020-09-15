import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
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

import { Container, FormGroup, InputGroup, ButtonGroup } from './styles';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Select from '../../components/Select';
import Button from '../../components/Button';
import ISendEnrollmentDTO from '../../dtos/ISendEnrollmentDTO';
import enrollmentSchema from '../../schemas/enrollmentSchema';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const FormPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [showHealthPlan, setShowHealthPlan] = useState(false);
  const [showFoodAlergy, setShowFoodAlergy] = useState(false);
  const [showHealthProblem, setShowHealthProblem] = useState(false);
  const [showMedicationAlergy, setShowMedicationAlergy] = useState(false);
  const [showSpecialNecessities, setShowSpecialNecessities] = useState(false);

  const handleSubmitForm = useCallback(
    async (data: ISendEnrollmentDTO, { reset }) => {
      try {
        formRef.current?.setErrors({});

        await enrollmentSchema.validate(data, {
          abortEarly: false,
        });

        await api.post('/reenrollments', data);

        reset();

        toast.success('Dados enviados com sucesso!');
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
      }
    },
    [],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <FormGroup>
          <Heading title="Dados do responsável financeiro" />

          <InputGroup>
            <Input name="financial_name" placeholder="Nome" icon={FiUser} />

            <Input
              name="financial_kinship"
              placeholder="Parentesco com o aluno"
              icon={FiUsers}
            />
          </InputGroup>

          <InputGroup>
            <Input name="financial_rg" placeholder="RG" icon={FiClipboard} />

            <Input name="financial_cpf" placeholder="CPF" icon={FiClipboard} />
          </InputGroup>

          <InputGroup>
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

          <InputGroup>
            <Input
              name="financial_education_level"
              placeholder="Grau de instrução"
              icon={FiInfo}
            />

            <Input
              name="financial_profission"
              placeholder="Profissão"
              icon={FiBriefcase}
            />
          </InputGroup>

          <InputGroup>
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

          <InputGroup>
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

          <InputGroup>
            <Input
              name="financial_address_street"
              placeholder="Rua"
              icon={FiMapPin}
            />

            <Input
              type="number"
              name="financial_address_number"
              placeholder="Número"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="financial_address_complement"
              placeholder="Complemento"
              icon={FiMapPin}
            />

            <Input
              name="financial_address_neighborhood"
              placeholder="Bairro"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="financial_address_city"
              placeholder="Cidade"
              icon={FiMapPin}
            />

            <Input
              name="financial_address_cep"
              placeholder="CEP"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
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

          <InputGroup>
            <Input type="date" name="financial_birth_date" icon={FiCalendar} />
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="financial_income_tax"
              label="Declara imposto de renda?"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Heading title="Dados do responsável solidário" />

          <InputGroup>
            <Input name="supportive_name" placeholder="Nome" icon={FiUser} />

            <Input
              name="supportive_kinship"
              placeholder="Parentesco com o aluno"
              icon={FiUsers}
            />
          </InputGroup>

          <InputGroup>
            <Input name="supportive_rg" placeholder="RG" icon={FiClipboard} />

            <Input name="supportive_cpf" placeholder="CPF" icon={FiClipboard} />
          </InputGroup>

          <InputGroup>
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

          <InputGroup>
            <Input
              name="supportive_education_level"
              placeholder="Grau de instrução"
              icon={FiInfo}
            />

            <Input
              name="supportive_profission"
              placeholder="Profissão"
              icon={FiBriefcase}
            />
          </InputGroup>

          <InputGroup>
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

          <InputGroup>
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

          <InputGroup>
            <Input
              name="supportive_address_street"
              placeholder="Rua"
              icon={FiMapPin}
            />

            <Input
              type="number"
              name="supportive_address_number"
              placeholder="Número"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="supportive_address_complement"
              placeholder="Complemento"
              icon={FiMapPin}
            />

            <Input
              name="supportive_address_neighborhood"
              placeholder="Bairro"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="supportive_address_city"
              placeholder="Cidade"
              icon={FiMapPin}
            />

            <Input
              name="supportive_address_cep"
              placeholder="CEP"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
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

          <InputGroup>
            <Input type="date" name="supportive_birth_date" icon={FiCalendar} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Heading title="Dados do aluno" />

          <InputGroup>
            <Input name="student_name" placeholder="Nome" icon={FiUser} />
          </InputGroup>

          <InputGroup>
            <Input
              name="student_nacionality"
              placeholder="Nacionalidade"
              icon={FiFlag}
            />

            <Input
              name="student_birth_city"
              placeholder="Cidade natal"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="student_birth_state"
              placeholder="Estado natal"
              icon={FiMapPin}
            />

            <Input
              name="student_origin_school"
              placeholder="Escola de origem"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
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

          <InputGroup>
            <Input type="date" name="student_birth_date" icon={FiCalendar} />

            <Select name="grade" icon={FiSmile}>
              <option value="null">Turma</option>
              <option value="null">1º ano</option>
              <option value="null">2º ano</option>
              <option value="null">3º ano</option>
            </Select>
          </InputGroup>

          <InputGroup>
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

          <InputGroup>
            <Checkbox
              name="has_health_plan"
              label="Possui algum plano de saúde"
              onChange={e => setShowHealthPlan(e.target.checked)}
            />

            {showHealthPlan && (
              <Input name="health_plan" placeholder="Qual?" icon={FiActivity} />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_medication_alergy"
              label="Possui alergia a algum medicamento"
              onChange={e => setShowMedicationAlergy(e.target.checked)}
            />

            {showMedicationAlergy && (
              <Input
                name="medication_alergy"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_food_alergy"
              label="Possui alergia a algum alimento"
              onChange={e => setShowFoodAlergy(e.target.checked)}
            />

            {showFoodAlergy && (
              <Input name="food_alergy" placeholder="Qual?" icon={FiActivity} />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_health_problem"
              label="Possui algum problema de saúde"
              onChange={e => setShowHealthProblem(e.target.checked)}
            />

            {showHealthProblem && (
              <Input
                name="health_problem"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_special_necessities"
              label="Possui alguma necessidade especial"
              onChange={e => setShowSpecialNecessities(e.target.checked)}
            />

            {showSpecialNecessities && (
              <Input
                name="special_necessities"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="student_ease_relating"
              label="Tem facilidade de se relacionar"
            />
          </InputGroup>
        </FormGroup>

        <ButtonGroup>
          <Button type="submit">Enviar</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default FormPage;

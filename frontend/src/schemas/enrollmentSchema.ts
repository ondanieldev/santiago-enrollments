import * as Yup from 'yup';

export default Yup.object().shape({
  financial_name: Yup.string().required('Nome de usuário obrigatório'),
  financial_birth_date: Yup.date()
    .typeError('Data de aniversário inválida')
    .required('Data de nascimento obrigatório'),
  financial_nacionality: Yup.string().required('Nacionalidade obrigatória'),
  financial_civil_state: Yup.string().required('Estado civil obrigatório'),
  financial_profission: Yup.string().required('Profissão obrigatória'),
  financial_cpf: Yup.string().required('CPF obrigatório'),
  financial_rg: Yup.string().required('RG obrigatório'),
  financial_address_street: Yup.string().required('Rua obrigatória'),
  financial_address_number: Yup.number().required('Número obrigatório'),
  financial_address_complement: Yup.string(),
  financial_address_neighborhood: Yup.string().required('Bairro obrigatório'),
  financial_address_city: Yup.string().required('Cidade obrigatória'),
  financial_address_cep: Yup.string().required('CEP obrigatório'),
  financial_residencial_phone: Yup.string().required(
    'Telefone residencial obrigatório',
  ),
  financial_commercial_phone: Yup.string().required(
    'Telefone comercial obrigatório',
  ),
  financial_personal_phone: Yup.string().required(
    'Telefone pessoal obrigatório',
  ),
  financial_education_level: Yup.string().required(
    'Nível de escolaridade obrigatório',
  ),
  financial_workplace: Yup.string().required('Local de trabalho obrigatório'),
  financial_monthly_income: Yup.number()
    .typeError('Renda mensal inválida')
    .required('Renda mensal obrigatória'),
  financial_income_tax: Yup.string()
    .matches(/(yes|no)/, () => 'Declaração inválida')
    .required('Declaração de imposto de renda obrigatória'),
  financial_email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail obrigatório'),
  financial_kinship: Yup.string().required('Parentesco obrigatório'),

  supportive_name: Yup.string().required('Nome de usuário obrigatório'),
  supportive_birth_date: Yup.date()
    .typeError('Data de aniversário inválida')
    .required('Data de nascimento obrigatório'),
  supportive_nacionality: Yup.string().required('Nacionalidade obrigatória'),
  supportive_civil_state: Yup.string().required('Estado civil obrigatório'),
  supportive_profission: Yup.string().required('Profissão obrigatória'),
  supportive_cpf: Yup.string().required('CPF obrigatório'),
  supportive_rg: Yup.string().required('RG obrigatório'),
  supportive_address_street: Yup.string().required('Rua obrigatória'),
  supportive_address_number: Yup.number().required('Número obrigatório'),
  supportive_address_complement: Yup.string(),
  supportive_address_neighborhood: Yup.string().required('Bairro obrigatório'),
  supportive_address_city: Yup.string().required('Cidade obrigatória'),
  supportive_address_cep: Yup.string().required('CEP obrigatório'),
  supportive_residencial_phone: Yup.string().required(
    'Telefone residencial obrigatório',
  ),
  supportive_commercial_phone: Yup.string().required(
    'Telefone comercial obrigatório',
  ),
  supportive_personal_phone: Yup.string().required(
    'Telefone pessoal obrigatório',
  ),
  supportive_education_level: Yup.string().required(
    'Nível de escolaridade obrigatório',
  ),
  supportive_workplace: Yup.string().required('Local de trabalho obrigatório'),
  supportive_monthly_income: Yup.number()
    .typeError('Renda mensal inválida')
    .required('Renda mensal obrigatória'),
  supportive_email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail obrigatório'),
  supportive_kinship: Yup.string().required('Parentesco obrigatório'),

  student_name: Yup.string().required('Nome não informado'),
  student_father_name: Yup.string().required('Nome do pai não informado'),
  student_mother_name: Yup.string().required('Nome da mãe não informado'),
  student_birth_date: Yup.date()
    .typeError('Data de aniversário inválida')
    .required('Data de aniversário informada'),
  student_nacionality: Yup.string().required('Nacionalidade não informada'),
  student_birth_city: Yup.string().required('Cidade natal não informada'),
  student_birth_state: Yup.string().required('Estado natal não informado'),
  student_gender: Yup.string().matches(
    /(male|female)/,
    () => 'Gênero inválido',
  ),
  student_race: Yup.string().matches(
    /(white|brown|black|indigenous|yellow)/,
    () => 'Raça inválida',
  ),
  student_ease_relating: Yup.string()
    .matches(/(yes|no)/, () => 'Declaração inválida')
    .required('Facilidade em se relacionar não informada'),
  student_origin_school: Yup.string(),
  student_health_plan: Yup.string(),
  student_food_alergy: Yup.string(),
  student_medication_alergy: Yup.string(),
  student_health_problem: Yup.string(),
  student_special_necessities: Yup.string(),

  grade_name: Yup.string()
    .matches(
      /(maternal|first_period|second_period|first_year|second_year|third_year|fourth_year|fifth_year|sixth_year|seventh_year|eighth_year|nineth_year)/,
      () => 'Turma inválida',
    )
    .required('Turma não informada'),
});

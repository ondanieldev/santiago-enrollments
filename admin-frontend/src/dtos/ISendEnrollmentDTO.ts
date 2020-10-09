export default interface ISendEnrollmentDTO {
  financial_name: string;
  financial_kinship: string;
  financial_birth_date: Date;
  financial_nacionality: string;
  financial_civil_state: string;
  financial_profission: string;
  financial_cpf: string;
  financial_rg: string;
  financial_address_street: string;
  financial_address_number: string;
  financial_address_complement?: string;
  financial_address_neighborhood: string;
  financial_address_city: string;
  financial_address_cep: string;
  financial_residencial_phone: string;
  financial_commercial_phone: string;
  financial_personal_phone: string;
  financial_education_level:
    | 'elementary_incompleted'
    | 'elementary_completed'
    | 'highschool_incompleted'
    | 'highschool_completed'
    | 'university_incompleted'
    | 'university_completed';
  financial_workplace: string;
  financial_monthly_income: number;
  financial_income_tax: 'yes' | 'no' | boolean;
  financial_email: string;

  supportive_name: string;
  supportive_kinship: string;
  supportive_birth_date: Date;
  supportive_nacionality: string;
  supportive_civil_state: string;
  supportive_profission: string;
  supportive_cpf: string;
  supportive_rg: string;
  supportive_address_street: string;
  supportive_address_number: string;
  supportive_address_complement?: string;
  supportive_address_neighborhood: string;
  supportive_address_city: string;
  supportive_address_cep: string;
  supportive_residencial_phone: string;
  supportive_commercial_phone: string;
  supportive_personal_phone: string;
  supportive_education_level:
    | 'elementary_incompleted'
    | 'elementary_completed'
    | 'highschool_incompleted'
    | 'highschool_completed'
    | 'university_incompleted'
    | 'university_completed';
  supportive_workplace: string;
  supportive_monthly_income: 'yes' | 'no' | boolean;
  supportive_email: string;

  student_name: string;
  student_father_name: string;
  student_mother_name: string;
  student_birth_date: Date;
  student_nacionality: string;
  student_birth_city: string;
  student_birth_state: string;
  student_gender: 'male' | 'female';
  student_race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow';
  student_ease_relating: 'yes' | 'no' | boolean;
  student_origin_school: string;
  student_health_plan: string;
  student_food_alergy: string;
  student_medication_alergy: string;
  student_health_problem: string;
  student_special_necessities: string;

  grade_name:
    | 'maternal'
    | 'first_period'
    | 'second_period'
    | 'first_year'
    | 'second_year'
    | 'third_year'
    | 'fourth_year'
    | 'fifth_year'
    | 'sixth_year'
    | 'seventh_year'
    | 'eighth_year'
    | 'nineth_year';

  type?: 'enrollment' | 'reenrollment';
}

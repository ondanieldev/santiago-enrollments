import { Schema, Document } from 'mongoose';

import autoIncrementModelID from '@modules/reenrollment/infra/mongoose/schemas/CounterSchema';

const ReenrollmentSchema = new Schema({
    enrollment_number: Number,

    financial_name: String,
    financial_kinship: String,
    financial_birth_date: Date,
    financial_nacionality: String,
    financial_civil_state: String,
    financial_profission: String,
    financial_cpf: String,
    financial_rg: String,
    financial_address_street: String,
    financial_address_number: String,
    financial_address_complement: String,
    financial_address_neighborhood: String,
    financial_address_city: String,
    financial_address_cep: String,
    financial_residencial_phone: String,
    financial_commercial_phone: String,
    financial_personal_phone: String,
    financial_education_level: String,
    financial_workplace: String,
    financial_monthly_income: Number,
    financial_income_tax: Boolean,
    financial_email: String,

    supportive_name: String,
    supportive_kinship: String,
    supportive_birth_date: Date,
    supportive_nacionality: String,
    supportive_civil_state: String,
    supportive_profission: String,
    supportive_cpf: String,
    supportive_rg: String,
    supportive_address_street: String,
    supportive_address_number: String,
    supportive_address_complement: String,
    supportive_address_neighborhood: String,
    supportive_address_city: String,
    supportive_address_cep: String,
    supportive_residencial_phone: String,
    supportive_commercial_phone: String,
    supportive_personal_phone: String,
    supportive_education_level: String,
    supportive_workplace: String,
    supportive_monthly_income: Number,
    supportive_email: String,

    student_name: String,
    student_father_name: String,
    student_mother_name: String,
    student_birth_date: Date,
    student_nacionality: String,
    student_birth_city: String,
    student_birth_state: String,
    student_gender: String,
    student_race: String,
    student_ease_relating: Boolean,
    student_origin_school: String,
    student_health_plan: String,
    student_food_alergy: String,
    student_medication_alergy: String,
    student_health_problem: String,
    student_special_necessities: String,

    grade_name: String,

    reenrollment_form: String,
    contract: String,
    checklist: String,
    monthly_control: String,

    paid: { type: Boolean, default: false },

    received_mail_with_documents: { type: Boolean, default: false },
});

interface IReenrollment extends Document {
    _id: string;

    enrollment_number: number;

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
    financial_address_complement: string;
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
    financial_income_tax: boolean;
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
    supportive_address_complement: string;
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
    supportive_monthly_income: number;
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
    student_ease_relating: boolean;
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

    reenrollment_form: string;
    contract: string;
    checklist: string;
    monthly_control: string;

    paid: boolean;
    received_mail_with_documents: boolean;
}

ReenrollmentSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('Reenrollment', this, next);
});

export { ReenrollmentSchema, IReenrollment };

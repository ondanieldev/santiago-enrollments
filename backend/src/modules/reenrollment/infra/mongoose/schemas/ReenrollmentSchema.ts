import { Schema, Document } from 'mongoose';

export const ReenrollmentSchema = new Schema({
    _id: String,

    financial_name: String,
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
});

export interface IReenrollment extends Document {
    _id: string;

    financial_name: string;
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
    financial_education_level: string;
    financial_workplace: string;
    financial_monthly_income: number;
    financial_income_tax: boolean;
    financial_email: string;

    supportive_name: string;
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
    supportive_education_level: string;
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
    student_gender: string;
    student_race: string;
    student_ease_relating: boolean;
    student_origin_school: string;
    student_health_plan: string;
    student_food_alergy: string;
    student_medication_alergy: string;
    student_health_problem: string;
    student_special_necessities: string;

    grade_name: string;

    reenrollment_form: string;
    contract: string;
    checklist: string;
}

export default ReenrollmentSchema;

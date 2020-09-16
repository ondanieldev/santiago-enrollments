import { Request, Response } from 'express';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';
import NewReenrollmetService from '@modules/reenrollment/services/NewReenrollmetService';
// import GenerateEnrollmentFormPdfService from '@modules/reenrollment/services/GenerateEnrollmentFormPdfService';
// import GenerateContractPdfService from '@modules/reenrollment/services/GenerateContractPdfService';

class ReenrollmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            financial_name,
            financial_birth_date,
            financial_nacionality,
            financial_civil_state,
            financial_profission,
            financial_cpf,
            financial_rg,
            financial_address_street,
            financial_address_number,
            financial_address_complement,
            financial_address_neighborhood,
            financial_address_city,
            financial_address_cep,
            financial_residencial_phone,
            financial_commercial_phone,
            financial_personal_phone,
            financial_education_level,
            financial_workplace,
            financial_monthly_income,
            financial_income_tax,
            financial_email,
            supportive_name,
            supportive_birth_date,
            supportive_nacionality,
            supportive_civil_state,
            supportive_profission,
            supportive_cpf,
            supportive_rg,
            supportive_address_street,
            supportive_address_number,
            supportive_address_complement,
            supportive_address_neighborhood,
            supportive_address_city,
            supportive_address_cep,
            supportive_residencial_phone,
            supportive_commercial_phone,
            supportive_personal_phone,
            supportive_education_level,
            supportive_workplace,
            supportive_monthly_income,
            supportive_email,
            student_name,
            student_father_name,
            student_mother_name,
            student_birth_date,
            student_nacionality,
            student_birth_city,
            student_birth_state,
            student_gender,
            student_race,
            student_ease_relating,
            student_origin_school,
            student_healt_plan,
            student_food_alergy,
            student_medication_alergy,
            student_health_problem,
            student_special_necessities,
            grade_name,
        }: NewReenrollmentDTO = request.body;

        const data = {
            financial_name,
            financial_birth_date,
            financial_nacionality,
            financial_civil_state,
            financial_profission,
            financial_cpf,
            financial_rg,
            financial_address_street,
            financial_address_number,
            financial_address_complement,
            financial_address_neighborhood,
            financial_address_city,
            financial_address_cep,
            financial_residencial_phone,
            financial_commercial_phone,
            financial_personal_phone,
            financial_education_level,
            financial_workplace,
            financial_monthly_income,
            financial_income_tax,
            financial_email,
            supportive_name,
            supportive_birth_date,
            supportive_nacionality,
            supportive_civil_state,
            supportive_profission,
            supportive_cpf,
            supportive_rg,
            supportive_address_street,
            supportive_address_number,
            supportive_address_complement,
            supportive_address_neighborhood,
            supportive_address_city,
            supportive_address_cep,
            supportive_residencial_phone,
            supportive_commercial_phone,
            supportive_personal_phone,
            supportive_education_level,
            supportive_workplace,
            supportive_monthly_income,
            supportive_email,
            student_name,
            student_father_name,
            student_mother_name,
            student_birth_date,
            student_nacionality,
            student_birth_city,
            student_birth_state,
            student_gender,
            student_race,
            student_ease_relating,
            student_origin_school,
            student_healt_plan,
            student_food_alergy,
            student_medication_alergy,
            student_health_problem,
            student_special_necessities,
            grade_name,
        };

        const newReenrollmet = new NewReenrollmetService();

        await newReenrollmet.execute(data);

        // const generateEnrollmentFormPdf = new GenerateEnrollmentFormPdfService();

        // generateEnrollmentFormPdf.execute(data);

        // const generateContractPdf = new GenerateContractPdfService();

        // generateContractPdf.execute(data);

        return response.json({ ok: true });
    }
}

export default ReenrollmentController;

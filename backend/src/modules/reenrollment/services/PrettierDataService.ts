import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import IPrettierEnrollment from '../dtos/IPrettierEnrollmentDTO';

class PrettierDataService {
    public execute(data: IReenrollment): IPrettierEnrollment {
        const reenrollment = data as IPrettierEnrollment;

        reenrollment.student_name = this.capitalize(reenrollment.student_name);

        reenrollment.student_father_name = this.capitalize(
            reenrollment.student_father_name,
        );

        reenrollment.student_mother_name = this.capitalize(
            reenrollment.student_mother_name,
        );

        reenrollment.student_gender = this.formatGender(
            reenrollment.student_gender,
        );

        reenrollment.student_race = this.formatRace(reenrollment.student_race);

        reenrollment.student_birth_city = this.capitalize(
            reenrollment.student_birth_city,
        );

        reenrollment.student_birth_state = this.capitalize(
            reenrollment.student_birth_state,
        );

        reenrollment.student_nacionality = this.capitalize(
            reenrollment.student_nacionality,
        );

        reenrollment.financial_name = this.capitalize(
            reenrollment.financial_name,
        );

        reenrollment.financial_education_level = this.formatEducationLevel(
            reenrollment.financial_education_level,
        );

        reenrollment.financial_email = reenrollment.financial_email.toLowerCase();

        reenrollment.financial_nacionality = this.capitalize(
            reenrollment.financial_nacionality,
        );

        reenrollment.financial_civil_state = this.capitalize(
            reenrollment.financial_civil_state,
        );

        reenrollment.financial_address_street = this.capitalize(
            reenrollment.financial_address_street,
        );

        reenrollment.financial_address_neighborhood = this.capitalize(
            reenrollment.financial_address_neighborhood,
        );
        reenrollment.financial_address_complement = this.capitalize(
            reenrollment.financial_address_complement,
        );

        reenrollment.financial_address_city = this.capitalize(
            reenrollment.financial_address_city,
        );

        reenrollment.financial_profission = this.capitalize(
            reenrollment.financial_profission,
        );
        reenrollment.supportive_name = this.capitalize(
            reenrollment.supportive_name,
        );

        reenrollment.supportive_education_level = this.formatEducationLevel(
            reenrollment.supportive_education_level,
        );

        reenrollment.supportive_email = reenrollment.supportive_email.toLowerCase();

        reenrollment.supportive_nacionality = this.capitalize(
            reenrollment.supportive_nacionality,
        );

        reenrollment.supportive_civil_state = this.capitalize(
            reenrollment.supportive_civil_state,
        );

        reenrollment.supportive_address_street = this.capitalize(
            reenrollment.supportive_address_street,
        );

        reenrollment.supportive_address_neighborhood = this.capitalize(
            reenrollment.supportive_address_neighborhood,
        );

        reenrollment.supportive_address_complement = this.capitalize(
            reenrollment.supportive_address_complement,
        );

        reenrollment.supportive_address_city = this.capitalize(
            reenrollment.supportive_address_city,
        );

        reenrollment.supportive_profission = this.capitalize(
            reenrollment.supportive_profission,
        );

        reenrollment.student_origin_school = this.capitalize(
            reenrollment.student_origin_school,
        );

        reenrollment.student_health_plan = this.capitalize(
            reenrollment.student_health_plan,
        );

        reenrollment.student_food_alergy = this.capitalize(
            reenrollment.student_food_alergy,
        );

        reenrollment.student_medication_alergy = this.capitalize(
            reenrollment.student_medication_alergy,
        );

        reenrollment.student_health_problem = this.capitalize(
            reenrollment.student_health_problem,
        );

        reenrollment.student_special_necessities = this.capitalize(
            reenrollment.student_special_necessities,
        );

        reenrollment.monthly_value = this.getMonthlyValue(
            reenrollment.grade_name,
        );

        reenrollment.grade_name = this.formatGrade(reenrollment.grade_name);

        return reenrollment;
    }

    private capitalize(str: string): string {
        if (typeof str === 'string') {
            return str
                .toLowerCase()
                .replace(/(^\w{1})|(\s+\w{1})/g, letter =>
                    letter.toUpperCase(),
                );
        }
        return '';
    }

    private formatGender(gender: string): string {
        switch (gender) {
            case 'male':
                return 'Masculino';
            case 'female':
                return 'Feminino';
            default:
                return '-';
        }
    }

    private formatRace(race: string): string {
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
                return '-';
        }
    }

    private formatEducationLevel(educationLevel: string): string {
        switch (educationLevel) {
            case 'elementary_incompleted':
                return 'Fundamental Incompleto';
            case 'elementary_completed':
                return 'Fundamental Completo';
            case 'highschool_incompleted':
                return 'Segundo Grau Incompleto';
            case 'highschool_completed':
                return 'Segundo Grau Completo';
            case 'university_incompleted':
                return 'Superior Incompleto';
            case 'university_completed':
                return 'Superior Completo';
            default:
                return '-';
        }
    }

    private formatGrade(grade: string): string {
        switch (grade) {
            case 'maternal':
                return 'Maternal';
            case 'first_period':
                return 'Primeiro Período';
            case 'second_period':
                return 'Segundo Período';
            case 'first_year':
                return '1º Ano';
            case 'second_year':
                return '2º Ano';
            case 'third_year':
                return '3º Ano';
            case 'fourth_year':
                return '4º Ano';
            case 'fifth_year':
                return '5º Ano';
            case 'sixth_year':
                return '6º Ano';
            case 'seventh_year':
                return '7º Ano';
            case 'eighth_year':
                return '8º Ano';
            case 'nineth_year':
                return '9º Ano';
            default:
                return '-';
        }
    }

    private getMonthlyValue(grade_name: string): number {
        switch (grade_name) {
            case 'maternal':
                return 584;
            case 'first_period':
                return 584;
            case 'second_period':
                return 584;
            case 'first_year':
                return 717;
            case 'second_year':
                return 717;
            case 'third_year':
                return 717;
            case 'fourth_year':
                return 717;
            case 'fifth_year':
                return 717;
            case 'sixth_year':
                return 766;
            case 'seventh_year':
                return 766;
            case 'eighth_year':
                return 766;
            case 'nineth_year':
                return 766;
            default:
                return 0;
        }
    }
}

export default PrettierDataService;

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';

class PrettierDataService {
    public execute(data: NewReenrollmentDTO): NewReenrollmentDTO {
        const reenrollment = data;

        reenrollment.financial_name = this.capitalize(
            reenrollment.financial_name,
        );

        reenrollment.financial_kinship = this.capitalize(
            reenrollment.financial_kinship,
        );

        reenrollment.financial_nacionality = this.capitalize(
            reenrollment.financial_nacionality,
        );

        reenrollment.financial_civil_state = this.capitalize(
            reenrollment.financial_civil_state,
        );

        reenrollment.financial_profission = this.capitalize(
            reenrollment.financial_profission,
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

        reenrollment.financial_workplace = this.capitalize(
            reenrollment.financial_workplace,
        );

        reenrollment.financial_email = reenrollment.financial_email.toLowerCase();

        reenrollment.supportive_name = this.capitalize(
            reenrollment.supportive_name,
        );

        reenrollment.supportive_kinship = this.capitalize(
            reenrollment.supportive_kinship,
        );

        reenrollment.supportive_nacionality = this.capitalize(
            reenrollment.supportive_nacionality,
        );

        reenrollment.supportive_civil_state = this.capitalize(
            reenrollment.supportive_civil_state,
        );

        reenrollment.supportive_profission = this.capitalize(
            reenrollment.supportive_profission,
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

        reenrollment.supportive_workplace = this.capitalize(
            reenrollment.supportive_workplace,
        );

        reenrollment.supportive_email = reenrollment.supportive_email.toLowerCase();

        reenrollment.student_name = this.capitalize(reenrollment.student_name);

        reenrollment.student_father_name = this.capitalize(
            reenrollment.student_father_name,
        );

        reenrollment.student_mother_name = this.capitalize(
            reenrollment.student_mother_name,
        );

        reenrollment.student_nacionality = this.capitalize(
            reenrollment.student_nacionality,
        );

        reenrollment.student_birth_city = this.capitalize(
            reenrollment.student_birth_city,
        );

        reenrollment.student_birth_state = this.capitalize(
            reenrollment.student_birth_state,
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

        return reenrollment;
    }

    private capitalize(str: string | undefined): string {
        if (typeof str === 'string') {
            return str
                .toLowerCase()
                .replace(/(^\w{1})|(\s+\w{1})/g, letter =>
                    letter.toUpperCase(),
                );
        }
        return '';
    }
}

export default PrettierDataService;

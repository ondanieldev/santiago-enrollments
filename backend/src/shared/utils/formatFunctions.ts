export function formatGender(gender: 'male' | 'female'): string {
    switch (gender) {
        case 'male':
            return 'Masculino';
        case 'female':
            return 'Feminino';
        default:
            return '-';
    }
}

export function formatRace(
    race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow',
): string {
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

export function formatEducationLevel(
    educationLevel:
        | 'elementary_incompleted'
        | 'elementary_completed'
        | 'highschool_incompleted'
        | 'highschool_completed'
        | 'university_incompleted'
        | 'university_completed',
): string {
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

export function formatGrade(
    grade:
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
        | 'nineth_year',
): string {
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

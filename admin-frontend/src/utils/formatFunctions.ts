export const formatDate = (date: Date): string => {
  const d = new Date(date);

  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate() + 1}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

export const prettyDate = (date: Date): string => {
  const d = new Date(date);

  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate() + 1}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [day, month, year].join('/');
};

export const formatEducationLevel = (educationLevel: string): string => {
  switch (educationLevel) {
    case 'elementary_incompleted':
      return 'Fundamental incompleto';

    case 'elementary_completed':
      return 'Fundamental completo';

    case 'highschool_incompleted':
      return 'Segundo grau incompleto';

    case 'highschool_completed':
      return 'Segundo grau completo';

    case 'university_incompleted':
      return 'Superior incompleto';

    case 'university_completed':
      return 'Superior completo';
    default:
      return '';
  }
};

export const formatGender = (gender: string): string => {
  switch (gender) {
    case 'male':
      return 'Masculino';

    case 'female':
      return 'Feminino';

    default:
      return '';
  }
};

export const formatRace = (race: string): string => {
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
      return '';
  }
};

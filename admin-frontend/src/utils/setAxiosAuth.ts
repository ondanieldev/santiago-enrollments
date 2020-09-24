import api from '../services/api';

export default function setAxiosAuth(): void {
  const token = localStorage.getItem('@SantiagoReenrollments:token');

  if (token) {
    api.defaults.headers.common.Authorization = `bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

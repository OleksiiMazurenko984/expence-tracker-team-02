// Axios-инстанс для клиентских запросов к прокси /api.
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

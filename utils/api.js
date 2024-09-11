import axios from 'axios';

// Базовый URL вашего API
const API_URL = 'http://localhost:3000/api';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для выполнения GET-запросов
export const getRequest = async (endpoint, config = {}) => {
  try {
    const response = await api.get(endpoint, config);
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

// Функция для выполнения POST-запросов
export const postRequest = async (endpoint, data, config = {}) => {
  try {
    const response = await api.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Сервер ответил с кодом, отличным от 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      console.error('Request data:', error.request);
    } else {
      // Ошибка на уровне настройки запроса
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
  }
};

// Функция для выполнения PUT-запросов
export const putRequest = async (endpoint, data, config = {}) => {
  try {
    const response = await api.put(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

// Функция для выполнения DELETE-запросов
export const deleteRequest = async (endpoint, config = {}) => {
  try {
    const response = await api.delete(endpoint, config);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};
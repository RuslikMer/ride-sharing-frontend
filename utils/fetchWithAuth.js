// Импортируем хук useSession для получения текущей сессии
import { getSession } from 'next-auth/react';

// Функция для выполнения запросов с авторизацией
export const fetchWithAuth = async (url, options = {}) => {
  // Получаем сессию через next-auth
  const session = await getSession();

  // Если сессия есть, добавляем токен в заголовки
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json', // Указываем, что отправляем JSON
  };

  if (session?.accessToken) {
    headers.Authorization = `Bearer ${session.accessToken}`;
  }

  // Выполняем запрос с обновленными заголовками
  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Обрабатываем ответ
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json(); // Парсим JSON-ответ
};
// pages/api/auth.js
import axios from 'axios';
import { setToken, getAuthHeaders } from '../../utils/auth';

const API_URL = 'http://localhost:3000'; // Адрес вашего бэкенда

export default async function handler(req, res) {
  const { method, url } = req;

  switch (method) {
    case 'POST':
      if (url === '/api/auth/register') {
        try {
          const response = await axios.post(`${API_URL}/auth/register`, req.body);
          res.status(200).json(response.data);
        } catch (error) {
          console.error('Error in registration:', error.message);
          res.status(error.response?.status || 500).json({ message: error.message });
        }
      } else if (url === '/api/auth/login') {
        try {
          const response = await axios.post(`${API_URL}/auth/login`, req.body);
          setToken(response.data.access_token); // Сохраняем токен в localStorage
          res.status(200).json(response.data);
        } catch (error) {
          console.error('Error in login:', error.message);
          res.status(error.response?.status || 500).json({ message: error.message });
        }
      }
      break;

    case 'GET':
      if (url === '/api/auth/profile') {
        try {
          const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: getAuthHeaders()
          });
          res.status(200).json(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error.message);
          res.status(error.response?.status || 500).json({ message: error.message });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
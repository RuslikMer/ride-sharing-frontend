import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Адрес вашего бэкенда

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get(`${API_URL}/ratings`);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        const response = await axios.post(`${API_URL}/ratings`, req.body, {
          headers: { Authorization: req.headers.authorization }
        });
        res.status(201).json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
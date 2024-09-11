import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Адрес вашего бэкенда

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get(`${API_URL}/ads`);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        const response = await axios.post(`${API_URL}/ads`, req.body, {
          headers: { Authorization: req.headers.authorization }
        });
        res.status(201).json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const response = await axios.put(`${API_URL}/ads/${id}`, req.body, {
          headers: { Authorization: req.headers.authorization }
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await axios.delete(`${API_URL}/ads/${id}`, {
          headers: { Authorization: req.headers.authorization }
        });
        res.status(204).end();
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
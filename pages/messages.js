import { useEffect, useState } from 'react';
import { getRequest } from '../utils/api';
import { getAuthHeaders } from '../utils/auth';
import styles from '../styles/Home.module.css';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getRequest('/messages', { headers: getAuthHeaders() });
        setMessages(data);
      } catch (error) {
        setError('Failed to load messages.');
      }
    };

    fetchMessages();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Messages</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p><strong>{message.sender}</strong>: {message.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
}
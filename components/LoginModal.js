import { useState } from 'react';
import styles from '../styles/LoginModal.module.css';
import { postRequest } from '../utils/api';
import { useRouter } from 'next/router';
import { setToken, getAuthHeaders } from '../utils/auth';

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await postRequest('/auth/login', { email, password });
      console.log('Response:', response); // Логирование ответа
      
      const token = response.access_token;
      console.log('Token:', token); // Логирование токена
      
      if (!token) {
        throw new Error('Token not received');
      }

      // Сохраняем токен
      setToken(token);
  
      onClose(); // Закрываем модальное окно после успешного входа
      router.push('/'); // Перенаправляем на страницу профиля
    } catch (error) {
      console.error('Login Error:', error); // Логирование ошибки
      setError('Login failed. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    onClose(); // Закрываем модальное окно
    router.push('/register'); // Перенаправляем на страницу регистрации
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form className={styles.form} onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button className={styles.switchButton} onClick={handleRegisterRedirect}>
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
}
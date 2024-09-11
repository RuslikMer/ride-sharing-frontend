import { useState } from 'react';
import { postRequest } from '../utils/api';
import styles from '../styles/pages/register.module.css'; // Подключение стилей
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Иконки для глазка

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  
  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await postRequest('/auth/register', { username, email, password });
      // window.location.href = '/';
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form className={styles.form} onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Username" // Плейсхолдер для username
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email" // Плейсхолдер для email
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password" // Плейсхолдер для password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value === '') {
                setConfirmPassword('');
              }
            }}
            required
            className={error && password !== confirmPassword ? styles.inputError : ''}
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="Confirm Password" // Плейсхолдер для подтверждения пароля
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={password === ''}
            required
            className={error && password !== confirmPassword ? styles.inputError : ''}
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
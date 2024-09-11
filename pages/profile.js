import { useEffect, useState } from 'react';
import { getRequest } from '../utils/api';
import { getAuthHeaders, removeToken } from '../utils/auth';
import styles from '../styles/Home.module.css';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getRequest('/auth/profile', { headers: getAuthHeaders() });
        setProfile(data);
      } catch (error) {
        setError('Failed to load profile.');
        // Очистка токена и перенаправление на страницу входа при ошибке
        removeToken();
        window.location.href = '/';
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Profile</h1>
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
import { useEffect, useState } from 'react';
import { getRequest } from '../utils/api';
import styles from '../styles/Home.module.css';

export default function Ratings() {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getRequest('/ratings');
        setRatings(data);
      } catch (error) {
        setError('Failed to load ratings.');
      }
    };

    fetchRatings();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Ratings</h1>
      {ratings.length > 0 ? (
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>
              <p><strong>User:</strong> {rating.user}</p>
              <p><strong>Rating:</strong> {rating.value}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ratings found.</p>
      )}
    </div>
  );
}
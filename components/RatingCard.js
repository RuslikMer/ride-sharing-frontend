import styles from '../styles/RatingCard.module.css';

export default function RatingCard({ rating }) {
  return (
    <div className={styles.card}>
      <p><strong>User:</strong> {rating.user}</p>
      <p><strong>Rating:</strong> {rating.value}</p>
      <p className={styles.date}>Rated on: {new Date(rating.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
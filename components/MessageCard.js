import styles from '../styles/MessageCard.module.css';

export default function MessageCard({ message }) {
  return (
    <div className={styles.card}>
      <p><strong>{message.sender}:</strong> {message.content}</p>
      <p className={styles.date}>Sent on: {new Date(message.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
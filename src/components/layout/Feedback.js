import styles from './styles/Feedback.module.sass';

const Feedback = ({ name, date, feedback }) => {
  return (
    <div className={styles.feedback}>
      <div className={styles.header}>
        <p>{name}</p>
        <p>{new Date(date).toLocaleString()}</p>
      </div>
      <div className={styles.content}>
        {feedback}
      </div>
    </div>
  );
}

export default Feedback;
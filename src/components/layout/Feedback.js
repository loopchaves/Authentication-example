import { FaTrash } from 'react-icons/fa'

import styles from './styles/Feedback.module.sass';

const Feedback = ({ id, name, date, feedback, handlerRemoveFeedback }) => {
  return (
    <div className={styles.feedback}>
      <div className={styles.header}>
        <p>{name}</p>
        <p>
          {new Date(date).toLocaleString()}
          {handlerRemoveFeedback && <FaTrash onClick={() => handlerRemoveFeedback(id)} />}
        </p>
      </div>
      <div className={styles.content}>
        {feedback}
      </div>
    </div>
  );
}

export default Feedback;
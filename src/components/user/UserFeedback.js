import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFeedbacks } from '../../app/appSlice';


import WriteFeedback from '../layout/WriteFeedback';

import styles from './styles/UserFeedback.module.sass';

const UserFeedback = ({ getFeedbacks }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const handlerFeedbacks = (newFeedback) => setFeedbacks([newFeedback, ...feedbacks]);

  useEffect(() => {
    getFeedbacks().then((action) => {
      if (action.payload) setFeedbacks(action.payload);
    });
  }, [getFeedbacks]);

  return (
    <div className={styles.container}>
      <WriteFeedback handlerFeedbacks={handlerFeedbacks} />
      <div className={styles.feedbacks}>
        {feedbacks}
      </div>
    </div>
  );
}

const mapDispatch = { getFeedbacks }

export default connect(null, mapDispatch)(UserFeedback);
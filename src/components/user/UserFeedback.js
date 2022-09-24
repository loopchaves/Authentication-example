import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFeedbacks, deleteFeedback } from '../../app/appSlice';

import WriteFeedback from '../layout/WriteFeedback';
import Feedback from '../layout/Feedback';

import styles from './styles/UserFeedback.module.sass';
import language from '../../lang/lang.json';


const UserFeedback = ({ uid, lang, getFeedbacks, deleteFeedback }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const handlerNewFeedback = (newFeedback) => setFeedbacks([newFeedback, ...feedbacks]);
  const handlerRemoveFeedback = (id) => {
    if (window.confirm(lang.removeFeedback)) {
      deleteFeedback(id).then((action) => {
        if (!action.error) setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
      })
    }
  }

  useEffect(() => {
    getFeedbacks().then((action) => {
      if (action.payload) setFeedbacks(action.payload);
    });
  }, [getFeedbacks]);

  useEffect(() => {
    if (feedbacks.length > 0) {
      const divFeedbacks = document.getElementById('feedbacks');
      if (divFeedbacks.clientHeight === 300) {
        divFeedbacks.style.setProperty('overflow-y', 'scroll');
      } else {
        divFeedbacks.style.setProperty('overflow-y', 'hidden');
      }
    }
  }, [feedbacks]);

  return (
    <div className={styles.container}>
      <WriteFeedback handlerNewFeedback={handlerNewFeedback} />
      <div className={styles.feedbacks} id='feedbacks'>
        {feedbacks.length > 0
          ? feedbacks.map((feedback) => <Feedback
            key={feedback.id}
            id={feedback.id}
            name={feedback.name}
            date={feedback.date}
            feedback={feedback.feedback}
            handlerRemoveFeedback={
              uid === feedback.user
                ? handlerRemoveFeedback
                : null
            }
          />)
          : <p className={styles.noFeedback}>{lang.noFeedback}</p>}
      </div>
    </div>
  );
}

const mapState = (state) => ({
  uid: state.app.user.uid,
  lang: language[state.app.language].text
})

const mapDispatch = { getFeedbacks, deleteFeedback }

export default connect(mapState, mapDispatch)(UserFeedback);
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../app/appSlice';

import styles from './styles/AlertMsg.module.sass';
import language from '../../lang/lang.json';


const AlertMsg = ({ message, type, setAlert }) => {
  useEffect(() => {
    setTimeout(() => setAlert(null), 10000);
  }, [setAlert]);

  return (
    <div className={styles.container}>
      <div className={styles[type]}>
        <p className={styles.msg}>{message}</p>
      </div>
    </div>
  );
}

const mapState = (state) => {
  const lang = state.app.language;
  const msg = state.app.alert.msg;
  return {
    message: language[lang].alert[msg],
    type: state.app.alert.type
  }
}

const mapDispatch = { setAlert }

export default connect(mapState, mapDispatch)(AlertMsg);
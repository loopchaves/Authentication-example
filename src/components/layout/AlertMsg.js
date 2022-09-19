import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguage, getAlert, setAlert } from '../../app/appSlice';

import styles from './styles/AlertMsg.module.sass';
import language from '../../lang/lang.json';


export default function ErrorMsg() {
  const dispatch = useDispatch();
  const alert = useSelector(getAlert);
  const lang = useSelector(getLanguage);
  const messages = language[lang].alert;
  const msg = messages[alert.msg];

  useEffect(() => {
    setTimeout(() => dispatch(setAlert(undefined)), 10000);
  }, [dispatch]);

  return msg ? (
    <div className={styles.container}>
      <div className={styles[alert.type]}>
        <p className={styles.msg}>{msg}</p>
      </div>
    </div>
  ) : console.log(alert);
}

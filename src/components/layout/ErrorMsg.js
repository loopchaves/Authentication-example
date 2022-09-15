import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../app/appSlice';

import styles from './styles/ErrorMsg.module.sass';
import language from '../../lang/lang.json';


export default function ErrorMsg({ errorType, handlerError }) {
  const lang = language[useSelector(getLanguage)];
  const errorMsg = lang.authError;

  useEffect(() => {
    setTimeout(() => handlerError(), 10000);
  }, [handlerError]);

  return errorMsg[errorType] ? (
    <div className={styles.error}>
      <p className={styles.info}>{errorMsg[errorType]}</p>
    </div>
  ) : console.log(errorType);
}

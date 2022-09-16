import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguage, getErrorType, setErrorType } from '../../app/appSlice';

import styles from './styles/ErrorMsg.module.sass';
import language from '../../lang/lang.json';


export default function ErrorMsg() {
  const dispatch = useDispatch();
  const errorType = useSelector(getErrorType);
  const lang = language[useSelector(getLanguage)];
  const errorMsg = lang.authError;

  useEffect(() => {
    setTimeout(() => dispatch(setErrorType(undefined)), 10000);
  }, [dispatch]);

  return errorMsg[errorType] ? (
    <div className={styles.container}>
      <div className={styles.error}>
        <p className={styles.info}>{errorMsg[errorType]}</p>
      </div>
    </div>
  ) : console.log(errorType);
}

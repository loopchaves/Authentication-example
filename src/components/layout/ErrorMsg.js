import { useEffect } from 'react';
import { auth } from '../../firebaseCfg';

import styles from './styles/ErrorMsg.module.sass';
import language from '../../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];
const errorMsg = lang.authError;


export default function ErrorMsg({ errorType, handlerError }) {
  useEffect(() => {
    setTimeout(() => handlerError(), 10000);
  }, [handlerError]);

  return errorMsg[errorType] ? (
    <div className={styles.error}>
      <p className={styles.info}>{errorMsg[errorType]}</p>
    </div>
  ) : console.log(errorType);
}

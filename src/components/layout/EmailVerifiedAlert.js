import { useSelector } from 'react-redux';
import { getLanguage } from '../../app/appSlice';

import styles from './styles/EmailVerifiedAlert.module.sass';
import language from '../../lang/lang.json';


export default function EmailVerifiedAlert() {
  const lang = language[useSelector(getLanguage)];

  return (
    <div className={styles.container}>
      <div className={styles.emailVerified}>
        <p className={styles.msg}>{lang.text.msgVerifyYourEmail}</p>
      </div>
    </div>
  );
}

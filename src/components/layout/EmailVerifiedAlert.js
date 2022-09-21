import { connect } from 'react-redux';

import styles from './styles/EmailVerifiedAlert.module.sass';
import language from '../../lang/lang.json';


const EmailVerifiedAlert = ({ verifyYourEmail }) => {
  return (
    <div className={styles.container}>
      <div className={styles.emailVerified}>
        <p className={styles.msg}>{verifyYourEmail}</p>
      </div>
    </div>
  );
}

const mapState = (state) => ({ verifyYourEmail: language[state.app.language].alert.verifyYourEmail })

export default connect(mapState, null)(EmailVerifiedAlert);

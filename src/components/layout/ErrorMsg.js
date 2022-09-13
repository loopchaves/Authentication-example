import { useEffect } from 'react';

import styles from './styles/ErrorMsg.module.sass';

const errorMsg = {
  'auth/invalid-email': 'Invalid email',
  'auth/wrong-password': 'Wrong password',
  'auth/email-already-in-use': 'Email already in use',
  'auth/network-request-failed': 'Network request failed',
  'auth/user-not-found': 'User not found',
  'auth/invalid-action-code': 'Invalid verification link',
  'auth/expired-action-code': 'Link expired'
}

export default function ErrorMsg({ errorType, handlerError }) {
  useEffect(() => {
    const timer = setTimeout(() => handlerError(), 10000);
    return () => clearTimeout(timer);
  }, [handlerError])

  return errorMsg[errorType] ? (
    <div className={styles.error}>
      <p className={styles.info}>{errorMsg[errorType]}</p>
    </div>
  ) : console.log(errorType);
}

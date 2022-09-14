import { useState } from 'react';
import { auth } from '../../firebaseCfg'
import { signOut } from "firebase/auth";

import Loading from '../layout/Loading';
import ErrorMsg from '../layout/ErrorMsg';

import styles from './styles/User.module.sass';
import language from '../../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];


export default function User({ handlerUser }) {
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState(undefined);
  const user = auth.currentUser;

  const handlerError = () => setErrorType(undefined);

  async function logout() {
    setLoading(true);
    setErrorType(undefined);
    try {
      await signOut(auth);
      handlerUser(false);
    } catch (error) {
      setLoading(true);
      setErrorType(error.code);
    }
  }

  return (
    <>{loading
      ? <Loading />
      : (
        <div className={styles.container}>
          {!user.emailVerified && (
            <div className={styles.emailVerified}>
              <p className={styles.info}>{lang.text.msgVerifyYourEmail}</p>
            </div>
          )}
          <p>
            {lang.text.userName}
            {user.displayName}
          </p>
          <p>
            {lang.text.userEmail}
            {user.email}
          </p>
          <p>
            {lang.text.userEmailVerified}
            {user.emailVerified 
            ? lang.text.yes
            : lang.text.no}
          </p>
          <p>
            {lang.text.userSignupDate}
            {user.metadata.creationTime}
          </p>
          <p>
            {lang.text.userLastLogin}
            {user.metadata.lastSignInTime}
          </p>
          <div className={styles.buttons}>
            <button onClick={() => logout()}>{lang.text.buttonLogout}</button>
          </div>
          {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
        </div>
      )}
    </>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { auth } from '../../firebaseCfg'
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading, getLanguage } from '../../app/appSlice';

import ErrorMsg from '../layout/ErrorMsg';

import styles from './styles/User.module.sass';
import language from '../../lang/lang.json';


export default function User({ handlerUser }) {
  const dispatch = useDispatch();
  const lang = language[useSelector(getLanguage)];
  const [errorType, setErrorType] = useState(undefined);
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    emailVerified: true,
    metadata: {
      creationTime: '',
      lastSignInTime: ''
    }
  });

  const handlerError = () => setErrorType(undefined);

  async function logout() {
    dispatch(displayLoading(true));
    setErrorType(undefined);
    try {
      await signOut(auth);
      handlerUser(false);
    } catch (error) {
      setErrorType(error.code);
    }
    dispatch(displayLoading(false));
  }

  const getUser = useCallback(() => {
    setUser({ ...auth.currentUser });
    dispatch(displayLoading(false));
  }, [dispatch]);

  useEffect(() => getUser(), [getUser]);

  return (
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
  );
}

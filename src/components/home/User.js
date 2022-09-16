import { useState, useEffect, useCallback } from 'react';
import { auth } from '../../firebaseCfg'
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading, getLanguage, setErrorType } from '../../app/appSlice';

import styles from './styles/User.module.sass';
import language from '../../lang/lang.json';


export default function User({ handlerUser }) {
  const dispatch = useDispatch();
  const lang = language[useSelector(getLanguage)];
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    emailVerified: true,
    metadata: {
      creationTime: '',
      lastSignInTime: ''
    }
  });

  async function logout() {
    dispatch(displayLoading(true));
    dispatch(setErrorType(undefined));
    try {
      await signOut(auth);
      handlerUser(false);
    } catch (error) {
      dispatch(setErrorType(error.code));
    }
    dispatch(displayLoading(false));
  }

  const getUser = useCallback(() => {
    if (auth.currentUser) {
      const metadata = auth.currentUser.metadata;
      const creationTime = Date.parse(metadata.creationTime);
      const lastSignInTime = Date.parse(metadata.lastSignInTime);
      setUser({
        ...auth.currentUser,
        metadata: {
          creationTime: new Date(creationTime).toLocaleString(),
          lastSignInTime: new Date(lastSignInTime).toLocaleString()
        }
      });
      dispatch(displayLoading(false));
    }
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
    </div>
  );
}

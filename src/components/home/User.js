import { useState } from 'react';
import { auth } from '../../firebaseCfg'
import { signOut } from "firebase/auth";

import Loading from '../layout/Loading';
import ErrorMsg from '../layout/ErrorMsg';

import styles from './styles/User.module.sass';


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
              <p className={styles.info}>Verify your email</p>
            </div>
          )}
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>Email verified: {user.emailVerified ? 'Yes' : 'No'}</p>
          <p>Sign up date: {user.metadata.creationTime}</p>
          <p>Last login: {user.metadata.lastSignInTime}</p>
          <div className={styles.buttons}>
            <button onClick={() => logout()}>Logout</button>
          </div>
          {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
        </div>
      )}
    </>
  );
}

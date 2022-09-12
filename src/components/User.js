import { auth } from '../firebaseCfg'
import { signOut } from "firebase/auth";

import styles from './styles/User.module.sass';

export default function User({ user, handlerUser }) {
  const logout = () => signOut(auth)
    .then(() => {
      handlerUser(false);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  return (
    <>
      {!user.emailVerified && (
        <div className={styles.emailVerified}>
          <p>Verify your email</p>
        </div>
      )}
      <div className={styles.userInfo}>
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>Email verified: {user.emailVerified ? 'yes' : 'no'}</p>
        <p>Sign up date: {user.metadata.creationTime}</p>
        <p>Last login: {user.metadata.lastSignInTime}</p>
        <div className={styles.buttons}>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </>
  );
}

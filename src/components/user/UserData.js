

import styles from './styles/UserData.module.sass';

export default function UserData() {
  

  return (
    <div className={styles.container}>
      {!user.emailVerified && (
        <div className={styles.emailVerified}>
          <p className={styles.msg}>{lang.text.msgVerifyYourEmail}</p>
        </div>
      )}
      <p>
        {lang.text.userName}
        {user.name}
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
        {user.creationDate}
      </p>
      <p>
        {lang.text.userLastLogin}
        {user.lastLogin}
      </p>
      <div className={styles.buttons}>
        <button onClick={() => logout()}>{lang.text.buttonLogout}</button>
      </div>
    </div>
  );
}

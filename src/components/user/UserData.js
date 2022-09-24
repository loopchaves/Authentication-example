import { connect } from 'react-redux';
import { tryLogout } from '../../app/appSlice';

import styles from './styles/UserData.module.sass';
import language from '../../lang/lang.json';


const UserData = ({ user, lang, tryLogout }) => {
  const logout = () => tryLogout()

  return (
    <div className={styles.container}>
      <p>
        {lang.userName}
        {user.name}
      </p>
      <p>
        {lang.userEmail}
        {user.email}
      </p>
      <p>
        {lang.userEmailVerified}
        {user.emailVerified
          ? lang.yes
          : lang.no}
      </p>
      <p>
        {lang.userSignupDate}
        {user.creationDate}
      </p>
      <p>
        {lang.userLastLogin}
        {user.lastLogin}
      </p>
      <div className={styles.buttons}>
        <button onClick={() => logout()}>{lang.buttonLogout}</button>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  user: state.app.user,
  lang: language[state.app.language].text
})

const mapDispatch = { tryLogout }

export default connect(mapState, mapDispatch)(UserData);

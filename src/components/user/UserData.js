import { auth } from '../../firebaseCfg'
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading, getLanguage, setAlert } from '../../app/appSlice';
import { getUser, removeUser } from '../../app/userSlice';

import styles from './styles/UserData.module.sass';
import language from '../../lang/lang.json';

export default function UserData() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const lang = language[useSelector(getLanguage)];

  async function logout() {
    dispatch(displayLoading(true));
    dispatch(setAlert({ msg: undefined, type: '' }));
    try {
      await signOut(auth);
      dispatch(removeUser());
    } catch (error) {
      dispatch(setAlert({ msg: error.code, type: 'error' }));
      dispatch(displayLoading(false));
    }
  }

  return (
    <div className={styles.container}>
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

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLayoutEffect, useCallback, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseCfg';
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading, isLoading, setLanguage, getAlert } from './app/appSlice';
import { addUser } from './app/userSlice';

import Home from './pages/Home';
import Signup from './pages/Signup';
import UserMgmt from './pages/UserMgmt';
import Loading from './components/layout/Loading';
import AlertMsg from './components/layout/AlertMsg';

import styles from './styles/App.module.sass';


export default function App() {
  const loading = useSelector(isLoading);
  const alert = useSelector(getAlert);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const checkLangague = useCallback(() => {
    auth.useDeviceLanguage();
    if (auth.languageCode.substring(0, 2) === 'pt')
      dispatch(setLanguage('pt'));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          creationDate: new Date(parseInt(user.metadata.createdAt)).toLocaleString(),
          lastLogin: new Date(parseInt(user.metadata.lastLoginAt)).toLocaleString()
        }
        dispatch(addUser(payload));
      } else {
        dispatch(displayLoading(false));
      }
      setLoaded(true);
    });
  }, [dispatch]);

  useLayoutEffect(() => checkLangague(), [checkLangague]);

  return (
    <Router>
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={loaded
            ? <Home />
            : <div className={styles.blank}></div>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/usermgmt' element={<UserMgmt />} />
        </Routes>
        {loading && <Loading />}
        {alert.msg && <AlertMsg />}
      </main>
    </Router>
  );
}

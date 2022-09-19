import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { auth } from './firebaseCfg';
import { useSelector, useDispatch } from 'react-redux';
import { getLoading, setLanguage, getAlert } from './app/appSlice';

import Home from './pages/Home';
import Signup from './pages/Signup';
import UserMgmt from './pages/UserMgmt';
import Loading from './components/layout/Loading';
import AlertMsg from './components/layout/AlertMsg';

import styles from './styles/App.module.sass';


export default function App() {
  const loading = useSelector(getLoading);
  const alert = useSelector(getAlert);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    auth.useDeviceLanguage();
    if (auth.languageCode.substring(0, 2) === 'pt')
      dispatch(setLanguage('pt'));
  }, [dispatch]);

  return (
    <Router>
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          < Route path='/signup' element={<Signup />} />
          <Route path='/usermgmt' element={<UserMgmt />} />
        </Routes>
        {loading && <Loading />}
        {alert && <AlertMsg />}
      </main>
    </Router>
  );
}

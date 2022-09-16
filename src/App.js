import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLayoutEffect, useCallback } from 'react';
import { auth } from './firebaseCfg';
import { useSelector, useDispatch } from 'react-redux';
import { isLoading, setLanguage } from './app/appSlice';

import Home from './pages/Home';
import Signup from './pages/Signup';
import UserMgmt from './pages/UserMgmt';
import Loading from './components/layout/Loading';

import styles from './styles/App.module.sass';


export default function App() {
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();

  const checkLangague = useCallback(() => {
    auth.useDeviceLanguage();
    if (auth.languageCode.substring(0, 2) === 'pt')
      dispatch(setLanguage('pt'));
  }, [dispatch]);

  useLayoutEffect(() => checkLangague(), [checkLangague]);

  return (
    <Router>
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/usermgmt' element={<UserMgmt />} />
        </Routes>
        {loading ? <Loading /> : null}
      </main>
    </Router>
  );
}

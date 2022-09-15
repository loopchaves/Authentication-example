import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoading } from './app/loadingSlice';

import Home from './pages/Home';
import Signup from './pages/Signup';
import UserMgmt from './pages/UserMgmt';
import Loading from './components/layout/Loading';

import styles from './styles/App.module.sass';


export default function App() {
  const loading = useSelector(isLoading);

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

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import UserMgmt from './pages/UserMgmt';

import styles from './styles/App.module.sass';

export default function App() {
  return (
    <Router>
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/usermgmt' element={<UserMgmt />} />
        </Routes>
      </main>
    </Router>
  );
}

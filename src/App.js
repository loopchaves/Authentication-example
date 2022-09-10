import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';

import styles from './styles/App.module.sass';

export default function App() {
  return (
    <Router>
      <main className={styles.container}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
}

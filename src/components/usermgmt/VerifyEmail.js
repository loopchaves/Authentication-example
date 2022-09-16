import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseCfg';
import { applyActionCode } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../app/appSlice';

import styles from './styles/VerifyEmail.module.sass';


export default function VerifyEmail({ actionCode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkActionCode() {
      try {
        await applyActionCode(auth, actionCode);
        await auth.currentUser.reload()
        dispatch(setAlert({ msg: 'emailVerified', type: 'notice' }));
      } catch (error) {
        dispatch(setAlert({ msg: error.code, type: 'error' }));
      }
      setTimeout(() => navigate('/'), 1000);
    }
    checkActionCode();
  }, [actionCode, dispatch, navigate]);

  return <div className={styles.blank}></div>;
}

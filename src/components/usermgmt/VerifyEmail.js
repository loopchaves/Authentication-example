import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmailCode } from '../../app/appSlice';

import styles from './styles/VerifyEmail.module.sass';


export default function VerifyEmail({ actionCode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(verifyEmailCode(actionCode)).then(() => navigate('/'));
  }, [dispatch, actionCode]);

  return <div className={styles.blank}></div>;
}

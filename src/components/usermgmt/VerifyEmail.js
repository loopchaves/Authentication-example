import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyEmailCode } from '../../app/appSlice';

import styles from './styles/VerifyEmail.module.sass';


const VerifyEmail = ({ verifyEmailCode, actionCode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmailCode(actionCode).then(() => navigate('/'));
  }, [verifyEmailCode, actionCode, navigate]);

  return <div className={styles.blank}></div>;
}

const mapDispatch = { verifyEmailCode }

export default connect(null, mapDispatch)(VerifyEmail);
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseCfg';
import { applyActionCode } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading, getLanguage } from '../../app/appSlice';

import ErrorMsg from '../layout/ErrorMsg';

import styles from './styles/VerifyEmail.module.sass';
import language from '../../lang/lang.json';


export default function VerifyEmail({ actionCode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = language[useSelector(getLanguage)];
  const [onError, setOnError] = useState(false);
  const [errorType, setErrorType] = useState(undefined);

  const handlerError = () => setErrorType(undefined);

  useEffect(() => {
    async function checkActionCode() {
      try {
        await applyActionCode(auth, actionCode);
        await auth.currentUser.reload()
          .then(() => {
            dispatch(displayLoading(false));
            setTimeout(() => navigate('/'), 3000);
          });
      } catch (error) {
        setErrorType(error.code);
        setOnError(true);
        dispatch(displayLoading(false));
      }
    }
    checkActionCode();
  }, [actionCode, dispatch, navigate]);

  return (
    <div className={styles.container}>
      {onError
        ? (<>
          <h2 className={styles.error}>{lang.text.emailFailVerify}</h2>
          <button onClick={() => navigate('/')}>{lang.text.buttonHome}</button>
          {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
        </>) : (<>
          <h2>{lang.text.emailVerified}</h2>
          <p className={styles.waitRedirect}>{lang.text.waitRedirect}</p>
        </>)}
    </div>
  );
}

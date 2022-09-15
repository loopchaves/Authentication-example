import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseCfg';
import { applyActionCode } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { displayLoading } from '../../app/loadingSlice';

import ErrorMsg from '../layout/ErrorMsg';

import styles from './styles/VerifyEmail.module.sass';
import language from '../../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];


export default function VerifyEmail({ actionCode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [onError, setOnError] = useState(false);
  const [errorType, setErrorType] = useState(undefined);

  const handlerError = () => setErrorType(undefined);

  useEffect(() => {
    applyActionCode(auth, actionCode)
      .then(() => {
        auth.currentUser.reload()
          .then(() => {
            dispatch(displayLoading(false));
            setTimeout(() => navigate('/'), 3000);
          });
      })
      .catch((error) => {
        setErrorType(error.code);
        setOnError(true);
        dispatch(displayLoading(false));
      })
  }, [actionCode, navigate, dispatch]);

  return (
    <div className={styles.container}>
      {onError
        ? (<>
          <h2 className={styles.error}>{lang.text.emailFailVerify}</h2>
          <button onClick={() => navigate('/')}>{lang.text.buttonHome}</button>
          {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
        </>)
        : <h2>{lang.text.emailVerified}</h2>}
    </div>
  );
}

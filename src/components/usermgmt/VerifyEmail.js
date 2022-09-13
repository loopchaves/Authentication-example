import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseCfg';
import { applyActionCode } from 'firebase/auth';

import Loading from '../layout/Loading';
import ErrorMsg from '../layout/ErrorMsg';

import styles from './styles/VerifyEmail.module.sass';


export default function VerifyEmail({ actionCode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [onError, setOnError] = useState(false);
  const [errorType, setErrorType] = useState(undefined);

  const handlerError = () => setErrorType(undefined);

  useEffect(() => {
    applyActionCode(auth, actionCode)
      .then(() => {
        auth.currentUser.reload();
        setLoading(false);
        setTimeout(() => navigate('/'), 3000);
      })
      .catch((error) => {
        setErrorType(error.code);
        setOnError(true);
        setLoading(false);
      })
  }, [actionCode, navigate]);

  return (
    <>
      {loading
        ? <Loading />
        : (
          <div className={styles.container}>
            {onError
              ? (<>
                <h2 className={styles.error}>Fail verify!</h2>
                <button onClick={() => navigate('/')}>Home</button>
                {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
              </>)
              : <h2>Verified email!</h2>}
          </div>
        )}
    </>
  );
}

import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebaseCfg';
import { sendPasswordResetEmail } from 'firebase/auth';

import { Input } from '../layout/Input';
import ErrorMsg from '../layout/ErrorMsg';
import Loading from '../layout/Loading';

import styles from './styles/ForgotPassword.module.sass';


export default function ForgotPassword({ handlerForgotPassword }) {
  const [loading, setLoading] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [errorType, setErrorType] = useState(undefined);
  const handlerError = () => setErrorType(undefined);

  async function submit(email, setSubmitting) {
    setLoading(true);
    setSubmitting(false);
    setErrorType(undefined);
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSend(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorType(error.code);
    }
  }

  return (
    <>
      {emailSend
        ? (
          <div className={styles.container}>
            <h2>Verify your email!</h2>
            <button onClick={() => handlerForgotPassword()}>Continue</button>
          </div>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({ email: Yup.string().email('Invalid email').required('Required') })}
            onSubmit={(values, { setSubmitting }) => submit(values.email, setSubmitting)}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {loading
              ? <Loading />
              : (
                <Form>
                  <div className={styles.container}>
                    <h2>Reset your password</h2>
                    <Input type='text' label='Email' name='email' />
                    <div className={styles.buttons}>
                      <button type='submit'>Send email</button>
                      <button onClick={() => handlerForgotPassword()}>Cancel</button>
                    </div>
                  </div>
                </Form>
              )}
          </Formik>
        )}
      {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
    </>
  );
}

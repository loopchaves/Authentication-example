import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../firebaseCfg';
import { sendPasswordResetEmail } from 'firebase/auth';

import { Input } from './Input';
import ErrorMsg from './ErrorMsg';

import styles from './styles/PasswordReset.module.sass';
import Loading from './Loading';

export default function PasswordReset({ handlerPasswordReset }) {
  const [loading, setLoading] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [errorType, setErrorType] = useState(undefined);
  const handlerError = () => setErrorType(undefined);

  async function submit(email, setSubmitting) {
    setLoading(true);
    setSubmitting(false);
    setErrorType(undefined);
    try {
      const url = { url: 'https://authentication-example-loopchaves.vercel.app/' }
      await sendPasswordResetEmail(auth, email, url);
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
            <p>Verify your email!</p>
            <button onClick={() => handlerPasswordReset()}>Continue</button>
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
                    <p>Reset your password</p>
                    <Input type='text' label='Email' name='email' />
                    <button type='submit'>Send email</button>
                  </div>
                </Form>
              )}
          </Formik>
        )}
      {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
    </>
  );
}

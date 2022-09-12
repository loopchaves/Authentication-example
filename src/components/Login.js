import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseCfg';
import { signInWithEmailAndPassword } from "firebase/auth";

import { Input } from './Input';
import Loading from './Loading';
import ErrorMsg from './ErrorMsg';

import styles from './styles/Login.module.sass';
import PasswordReset from './PasswordReset';


const initialValues = {
  email: '',
  password: ''
}

const validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})


export default function Login({ handlerUser }) {
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const handlerPasswordReset = () => setPasswordReset(!passwordReset);
  const [errorType, setErrorType] = useState(undefined);
  const handlerError = () => setErrorType(undefined);

  // Colocar isso dentro de login()
  function submit(values, setSubmitting) {
    setLoading(true);
    setSubmitting(false);
    setErrorType(undefined);
    login(values.email, values.password);
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handlerUser(userCredential.user);
    } catch (error) {
      setLoading(false);
      setErrorType(error.code);
    }
  }

  return (
    <>
      {passwordReset
        ? <PasswordReset handlerPasswordReset={handlerPasswordReset} />
        : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {loading
              ? <Loading />
              : (<>
                <Form>
                  <div className={styles.login}>
                    <Input type='text' label='Email' name='email' />
                    <Input type='password' label='Password' name='password' />
                    <div className={styles.buttons}>
                      <button type='submit'>Login</button>
                      <Link to='signup'><button>Sign up</button></Link>
                    </div>
                  </div>
                </Form>
                <button onClick={() => handlerPasswordReset()} className={styles.forgotPassword}>
                  Forgot your password?
                </button>
                {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
              </>)}
          </Formik>
        )}
    </>
  );
}

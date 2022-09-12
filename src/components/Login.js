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
  const [errorType, setErrorType] = useState(undefined);
  const handlerError = () => setErrorType(undefined);

  function submit(values, setSubmitting) {
    setLoading(true);
    setErrorType(undefined);
    login(values.email, values.password);
    setSubmitting(false);
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {loading
          ? <Loading />
          : (
            <Form>
              <div className={styles.login}>
                <Input type='text' label='Email' name='email' />
                <Input type='password' label='Password' name='password' />
                <div className={styles.buttons}>
                  <button id='login' type='submit'>Login</button>
                  <Link to='signup'><button>Sign up</button></Link>
                </div>
              </div>
            </Form>
          )}
      </Formik>
      {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
    </>
  );
}

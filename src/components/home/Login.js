import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseCfg';
import { signInWithEmailAndPassword } from "firebase/auth";

import { Input } from '../layout/Input';
import Loading from '../layout/Loading';
import ErrorMsg from '../layout/ErrorMsg';
import ForgotPassword from '../home/ForgotPassword';

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
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errorType, setErrorType] = useState(undefined);
  
  const handlerForgotPassword = () => setForgotPassword(!forgotPassword);
  const handlerError = () => setErrorType(undefined);

  async function submit(email, password, setSubmitting) {
    setLoading(true);
    setSubmitting(false);
    setErrorType(undefined);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handlerUser(true);
    } catch (error) {
      setLoading(false);
      setErrorType(error.code);
    }
  }

  return (
    <>
      {forgotPassword
        ? <ForgotPassword handlerForgotPassword={handlerForgotPassword} />
        : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => submit(values.email, values.password, setSubmitting)}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {loading
              ? <Loading />
              : (<>
                <Form>
                  <div className={styles.container}>
                    <Input type='text' label='Email' name='email' />
                    <Input type='password' label='Password' name='password' />
                    <div className={styles.buttons}>
                      <button type='submit'>Login</button>
                      <Link to='signup'><button>Sign up</button></Link>
                    </div>
                    {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
                  </div>
                </Form>
                <button onClick={() => handlerForgotPassword()} className={styles.forgotPasswordLink}>
                  Forgot your password?
                </button>
              </>)}
          </Formik>
        )}
    </>
  );
}

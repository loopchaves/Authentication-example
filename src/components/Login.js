import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseCfg';
import { signInWithEmailAndPassword } from "firebase/auth";

import { Input } from './Input';
import Loading from './Loading';

import styles from './styles/Login.module.sass';

export default function Login({ handlerUser }) {
  const [loading, setLoading] = useState(false);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      handlerUser(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setLoading(false);
    });

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setLoading(true);
        login(values.email, values.password);
        setSubmitting(false);
      }}
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
  );
}

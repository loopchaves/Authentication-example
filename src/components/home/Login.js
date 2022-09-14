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
import language from '../../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = Yup.object({
  email: Yup.string()
    .required(lang.inputError.required),
  password: Yup.string()
    .required(lang.inputError.required)
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
                    <Input type='text' label={lang.text.labelEmail} name='email' />
                    <Input type='password' label={lang.text.labelPassword} name='password' />
                    <div className={styles.buttons}>
                      <button type='submit'>{lang.text.buttonLogin}</button>
                      <Link to='signup'><button>{lang.text.buttonSignup}</button></Link>
                    </div>
                    {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
                  </div>
                </Form>
                <button onClick={() => handlerForgotPassword()} className={styles.forgotPasswordLink}>
                  {lang.text.buttonForgotPassword}
                </button>
              </>)}
          </Formik>
        )}
    </>
  );
}

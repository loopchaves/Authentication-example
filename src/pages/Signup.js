import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseCfg';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

import { Input, Select } from '../components/Input';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';

import styles from './styles/Signin.module.sass';


const initialValues = {
  name: '',
  function: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const validatePassword = values => {
  const errors = {};
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword &&
    values.password.length > 5 &&
    values.confirmPassword.length > 5
  ) {
    errors.password = "Passwords don't match";
    errors.confirmPassword = "Passwords don't match";
  }
  return errors;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  function: Yup.string()
    .oneOf(['admin', 'editor', 'reader'], 'Invalid function')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Required')
});


export default function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState(undefined);
  const handlerError = () => setErrorType(undefined);

  function submit(values, setSubmitting) {
    setLoading(true);
    setErrorType(undefined);
    signUp(values.email, values.password, values.name);
    setSubmitting(false);
  }

  async function signUp(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      const url = { url: 'https://authentication-example-loopchaves.vercel.app/' }
      await sendEmailVerification(userCredential.user, url);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setErrorType(error.code);
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validatePassword}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {loading
          ? <Loading />
          : (
            <Form>
              <div className={styles.signin}>
                <Input type='text' label='Name' name='name' />
                <Select type='text' label='Function' name='function'>
                  <option value=''>Select a function</option>
                  <option value='admin'>Admin</option>
                  <option value='editor'>Editor</option>
                  <option value='reader'>Reader</option>
                </Select>
                <Input type='text' label='Email' name='email' />
                <Input type='password' label='Password' name='password' />
                <Input type='password' label='Confirm password' name='confirmPassword' />
                <div className={styles.buttons}>
                  <button type='submit'>Register</button>
                  <Link to='/'><button>Cancel</button></Link>
                </div>
              </div>
            </Form>
          )}
      </Formik>
      {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
    </>
  );
}

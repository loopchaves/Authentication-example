import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebaseCfg';
import { verifyPasswordResetCode, confirmPasswordReset, signInWithEmailAndPassword } from "firebase/auth";

import { Input } from '../layout/Input';
import Loading from '../layout/Loading';
import ErrorMsg from '../layout/ErrorMsg';

import styles from './styles/ResetPassword.module.sass';


const initialValues = {
  newPassword: '',
  confirmNewPassword: ''
}

const validatePassword = values => {
  const errors = {};
  if (
    values.newPassword &&
    values.confirmNewPassword &&
    values.newPassword !== values.confirmNewPassword &&
    values.newPassword.length > 5 &&
    values.confirmNewPassword.length > 5
  ) {
    errors.newPassword = "Passwords don't match";
    errors.confirmNewPassword = "Passwords don't match";
  }
  return errors;
}

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Required'),
  confirmNewPassword: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Required')
});


export default function ResetPassword({ actionCode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [errorType, setErrorType] = useState(undefined);

  const handlerError = () => setErrorType(undefined);

  useEffect(() => {
    verifyPasswordResetCode(auth, actionCode)
      .then((userEmail) => {
        setEmail(userEmail);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.code);
        navigate('/');
      })
  }, [actionCode, navigate]);

  async function submit(newPassword, setSubmitting) {
    setLoading(true);
    setSubmitting(false);
    setErrorType(undefined);
    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      await signInWithEmailAndPassword(auth, email, newPassword);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setErrorType(error.code);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validatePassword}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => submit(values.newPassword, setSubmitting)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {loading
        ? <Loading />
        : (<>
          <Form>
            <div className={styles.container}>
              <p>User: {email}</p>
              <Input type='password' label='New password' name='newPassword' />
              <Input type='password' label='Confirm new password' name='confirmNewPassword' />
              <button type='submit'>Reset password</button>
            </div>
          </Form>
          {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
        </>)}
    </Formik>
  );
}

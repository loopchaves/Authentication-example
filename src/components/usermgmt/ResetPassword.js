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
import language from '../../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];

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
    errors.newPassword = lang.inputError.passwordDontMatch;
    errors.confirmNewPassword = lang.inputError.passwordDontMatch;
  }
  return errors;
}

const yupPassword = Yup.string()
  .min(6, lang.inputError.passwordMin)
  .required(lang.inputError.required);

const validationSchema = Yup.object({
  newPassword: yupPassword,
  confirmNewPassword: yupPassword
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
              <Input type='password' label={lang.text.labelNewPassword} name='newPassword' />
              <Input type='password' label={lang.text.labelConfirmNewPassword} name='confirmNewPassword' />
              <button type='submit'>{lang.text.buttonResetPassword}</button>
            </div>
          </Form>
          {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
        </>)}
    </Formik>
  );
}

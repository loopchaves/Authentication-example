import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebaseCfg';
import { sendPasswordResetEmail } from 'firebase/auth';

import { Input } from '../layout/Input';
import ErrorMsg from '../layout/ErrorMsg';
import Loading from '../layout/Loading';

import styles from './styles/ForgotPassword.module.sass';
import language from '../../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];

const validationSchema = Yup.object({
  email: Yup.string()
    .email(lang.inputError.invalidEmail)
    .required(lang.inputError.required)
})


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
            <h2>{lang.text.msgVerifyYourEmail}</h2>
            <button onClick={() => handlerForgotPassword()}>{lang.text.buttonContinue}</button>
          </div>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => submit(values.email, setSubmitting)}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {loading
              ? <Loading />
              : (
                <Form>
                  <div className={styles.container}>
                    <h2>{lang.text.titleForgotPassword}</h2>
                    <Input type='text' label={lang.text.labelEmail} name='email' />
                    <div className={styles.buttons}>
                      <button type='submit'>{lang.text.buttonSendEmail}</button>
                      <button onClick={() => handlerForgotPassword()}>{lang.text.buttonCancel}</button>
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

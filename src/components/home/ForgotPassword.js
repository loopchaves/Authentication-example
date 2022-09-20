import { useState } from 'react';
import * as Yup from 'yup';
import { auth } from '../../firebaseCfg';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, getLanguage, setAlert } from '../../app/appSlice';

import { Email } from '../layout/Input';
import FormBase from '../layout/FormBase';
import styles from './styles/ForgotPassword.module.sass';
import language from '../../lang/lang.json';


export default function ForgotPassword({ handlerForgotPassword }) {
  const dispatch = useDispatch();
  const lang = language[useSelector(getLanguage)];
  const [emailSend, setEmailSend] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(lang.inputError.invalidEmail)
      .required(lang.inputError.required)
  })

  const buttonAction = {
    action: handlerForgotPassword,
    label: lang.text.buttonCancel
  }

  async function submit(values) {
    try {
      dispatch(setLoading(true));
      await sendPasswordResetEmail(auth, values.email);
      setEmailSend(true);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setAlert({ msg: error.code, type: 'error' }));
      dispatch(setLoading(false));
    }
  }

  return (
    <>
      {emailSend
        ? (
          <div className={styles.container}>
            <h2 className={styles.msg}>{lang.text.msgVerifyYourEmail}</h2>
            <button onClick={() => handlerForgotPassword()}>{lang.text.buttonContinue}</button>
          </div>
        ) : (
          <FormBase
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={submit}
            buttonSubmit={lang.text.buttonSendEmail}
            buttonAction={buttonAction}
          >
            <h2 className={styles.msg}>{lang.text.titleForgotPassword}</h2>
            <Email label={lang.text.labelEmail} name='email' autoComplete='email' />
          </FormBase>
        )}
    </>
  );
}

import { useState } from 'react';
import * as Yup from 'yup';
import { auth } from '../../firebaseCfg';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { displayLoading } from '../../app/loadingSlice';

import { Input } from '../layout/Input';
import FormBase from '../layout/FormBase';
import styles from './styles/ForgotPassword.module.sass';
import language from '../../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];


export default function ForgotPassword({ handlerForgotPassword }) {
  const dispatch = useDispatch();
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

  async function submit(values, setErrorType) {
    try {
      await sendPasswordResetEmail(auth, values.email);
      setEmailSend(true);
    } catch (error) {
      setErrorType(error.code);
    }
    dispatch(displayLoading(false));
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
            <Input type='text' label={lang.text.labelEmail} name='email' />
          </FormBase>
        )}
    </>
  );
}

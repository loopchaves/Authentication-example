import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { auth } from '../../firebaseCfg';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithEmailAndPassword
} from "firebase/auth";

import { Input } from '../layout/Input';
import FormBase from '../layout/FormBase';
import language from '../../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];


export default function ResetPassword({ actionCode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const initialValues = {
    newPassword: '',
    confirmNewPassword: ''
  }

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, lang.inputError.passwordMin)
      .oneOf([Yup.ref('confirmNewPassword')], lang.inputError.passwordDontMatch)
      .required(lang.inputError.required),
    confirmNewPassword: Yup.string()
      .min(6, lang.inputError.passwordMin)
      .oneOf([Yup.ref('newPassword')], lang.inputError.passwordDontMatch)
      .required(lang.inputError.required)
  });

  async function submit(values, setSubmitting) {
    setLoading(true);
    setSubmitting(false);
    setErrorType(undefined);
    try {
      await confirmPasswordReset(auth, actionCode, values.newPassword);
      await signInWithEmailAndPassword(auth, email, values.newPassword);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setErrorType(error.code);
    }
  }

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

  return (
    <FormBase
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      buttonSubmit={lang.text.buttonResetPassword}
    >
      <p>
        {lang.text.userEmail}
        {email}
      </p>
      <Input type='password' label={lang.text.labelNewPassword} name='newPassword' />
      <Input type='password' label={lang.text.labelConfirmNewPassword} name='confirmNewPassword' />
    </FormBase>
  );
}

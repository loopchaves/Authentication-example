import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { auth } from '../../firebaseCfg';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading, getLanguage } from '../../app/appSlice';

import { Input } from '../layout/Input';
import FormBase from '../layout/FormBase';
import styles from './styles/ResetPassword.module.sass';
import language from '../../lang/lang.json';


export default function ResetPassword({ actionCode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = language[useSelector(getLanguage)];
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

  async function submit(values, setErrorType) {
    try {
      await confirmPasswordReset(auth, actionCode, values.newPassword);
      await signInWithEmailAndPassword(auth, email, values.newPassword)
        .then(() => navigate('/'));
    } catch (error) {
      setErrorType(error.code);
    }
    dispatch(displayLoading(false));
  }

  useEffect(() => {
    async function checkActionCode() {
      try {
        const userEmail = await verifyPasswordResetCode(auth, actionCode);
        setEmail(userEmail);
        dispatch(displayLoading(false));
      } catch (error) {
        console.log(error.code);
        navigate('/');
      }
    }
    checkActionCode();
  }, [actionCode, dispatch, navigate]);

  return (
    <FormBase
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      buttonSubmit={lang.text.buttonResetPassword}
    >
      <p className={styles.msg}>
        {lang.text.userEmail}
        {email}
      </p>
      <Input type='password' label={lang.text.labelNewPassword} name='newPassword' />
      <Input type='password' label={lang.text.labelConfirmNewPassword} name='confirmNewPassword' />
    </FormBase>
  );
}

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
import { displayLoading, getLanguage, setAlert } from '../../app/appSlice';
import { addUser } from '../../app/userSlice';

import { Password } from '../layout/Input';
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

  async function submit(values) {
    try {
      await confirmPasswordReset(auth, actionCode, values.newPassword);
      const userCredential = await signInWithEmailAndPassword(auth, email, values.newPassword);
      const payload = {
        uid: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        creationDate: new Date(parseInt(userCredential.user.metadata.createdAt)).toLocaleString(),
        lastLogin: new Date(parseInt(userCredential.user.metadata.lastLoginAt)).toLocaleString()
      }
      dispatch(addUser(payload));
      dispatch(setAlert({ msg: 'updatePassword', type: 'notice' }));
      navigate('/');
    } catch (error) {
      dispatch(setAlert({ msg: error.code, type: 'error' }));
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
        dispatch(setAlert({ msg: error.code, type: 'error' }));
        setTimeout(() => navigate('/'), 1000);
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
      <Password label={lang.text.labelNewPassword} name='newPassword' autoComplete='new-password' autoFocus />
      <Password label={lang.text.labelConfirmNewPassword} name='confirmNewPassword' autoComplete='new-password' />
    </FormBase>
  );
}

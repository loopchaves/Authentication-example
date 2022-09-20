import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { verifyPasswordCode, tryPasswordReset, getLanguage } from '../../app/appSlice';

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

  function submit(values) {
    dispatch(tryPasswordReset({ ...values, actionCode: actionCode, email: email }))
    .then((action) => {
      if (action.payload) navigate('/');
    });
  }

  useEffect(() => {
    dispatch(verifyPasswordCode(actionCode))
      .then((action) => {
        action.error ? navigate('/') : setEmail(action.payload);
      });
  }, [dispatch, actionCode, navigate]);

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

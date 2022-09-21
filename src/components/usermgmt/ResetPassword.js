import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { verifyPasswordCode, tryPasswordReset } from '../../app/appSlice';

import { Password } from '../layout/Input';
import FormBase from '../layout/FormBase';
import styles from './styles/ResetPassword.module.sass';
import language from '../../lang/lang.json';


const ResetPassword = ({ lang, verifyPasswordCode, tryPasswordReset, actionCode }) => {
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

  const submit = (values) => {
    tryPasswordReset({ ...values, actionCode: actionCode, email: email })
      .then((action) => {
        if (action.payload) navigate('/');
      });
  }

  useEffect(() => {
    verifyPasswordCode(actionCode)
      .then((action) => {
        action.error ? navigate('/') : setEmail(action.payload);
      });
  }, [verifyPasswordCode, actionCode, navigate]);

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

const mapState = (state) => ({ lang: language[state.app.language] })
const mapDispatch = { verifyPasswordCode, tryPasswordReset }

export default connect(mapState, mapDispatch)(ResetPassword);
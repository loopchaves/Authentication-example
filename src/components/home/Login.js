import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { tryLogin, setAlert } from '../../app/appSlice';

import { Email, Password } from '../layout/Input';
import FormBase from '../layout/FormBase';
import ForgotPassword from '../home/ForgotPassword';
import styles from './styles/Login.module.sass';
import language from '../../lang/lang.json';


const Login = ({ lang, tryLogin, setAlert }) => {
  const navigate = useNavigate();
  const handlerNavigate = () => navigate('/signup');

  const [forgotPassword, setForgotPassword] = useState(false);
  const handlerForgotPassword = (clearError) => {
    if (clearError) setAlert(null);
    setForgotPassword(!forgotPassword);
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required(lang.inputError.required),
    password: Yup.string()
      .required(lang.inputError.required)
  })

  const buttonAction = {
    action: handlerNavigate,
    label: lang.text.buttonSignup
  }

  const submit = (values) => tryLogin(values);

  return (<>
    {forgotPassword
      ? <ForgotPassword handlerForgotPassword={handlerForgotPassword} />
      : (
        <FormBase
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
          buttonSubmit={lang.text.buttonLogin}
          buttonAction={buttonAction}
        >
          <Email label={lang.text.labelEmail} name='email' autoComplete='username' />
          <Password label={lang.text.labelPassword} name='password' autoComplete='current-password' />
          <p onClick={() => handlerForgotPassword(true)} className={styles.forgotPasswordLink}>
            {lang.text.buttonForgotPassword}
          </p>
        </FormBase>
      )}
  </>);
}

const mapState = (state) => ({ lang: language[state.app.language] })
const mapDispatch = { tryLogin, setAlert }

export default connect(mapState, mapDispatch)(Login);
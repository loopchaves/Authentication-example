import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { auth } from '../../firebaseCfg';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading, getLanguage, setAlert } from '../../app/appSlice';
import { addUser } from '../../app/userSlice';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

import { Input } from '../layout/Input';
import FormBase from '../layout/FormBase';
import ForgotPassword from '../home/ForgotPassword';
import styles from './styles/Login.module.sass';
import language from '../../lang/lang.json';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = language[useSelector(getLanguage)];
  const [forgotPassword, setForgotPassword] = useState(false);
  const [token, setToken] = useState();

  const handlerNavigate = () => navigate('/signup');

  const handlerForgotPassword = () => {
    dispatch(setAlert({ msg: undefined, type: '' }));
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

  async function submit(values) {
    console.log(token);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const payload = {
        uid: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        creationDate: new Date(parseInt(userCredential.user.metadata.createdAt)).toLocaleString(),
        lastLogin: new Date(parseInt(userCredential.user.metadata.lastLoginAt)).toLocaleString()
      }
      dispatch(addUser(payload));
    } catch (error) {
      dispatch(displayLoading(false));
      dispatch(setAlert({ msg: error.code, type: 'error' }));
    }
  }

  return (
    <>
      {forgotPassword
        ? <ForgotPassword handlerForgotPassword={handlerForgotPassword} />
        : (<>
          <FormBase
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
            buttonSubmit={lang.text.buttonLogin}
            buttonAction={buttonAction}
          >
            <Input type='text' label={lang.text.labelEmail} name='email' />
            <Input type='password' label={lang.text.labelPassword} name='password' />
            <p onClick={() => handlerForgotPassword()} className={styles.forgotPasswordLink}>
              {lang.text.buttonForgotPassword}
            </p>
          </FormBase>
          <GoogleReCaptcha onVerify={token => setToken(token)} />
        </>)}
    </>
  );
}

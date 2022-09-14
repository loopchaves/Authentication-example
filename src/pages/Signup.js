import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseCfg';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

import { Input, Select } from '../components/layout/Input';
import Loading from '../components/layout/Loading';
import ErrorMsg from '../components/layout/ErrorMsg';

import styles from './styles/Signup.module.sass';
import language from '../lang/lang.json';


auth.useDeviceLanguage();
const lang = language[auth.languageCode.substring(0, 2)];

const initialValues = {
  name: '',
  function: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const validatePassword = values => {
  const errors = {};
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword &&
    values.password.length > 5 &&
    values.confirmPassword.length > 5
  ) {
    errors.password = lang.inputError.passwordDontMatch;
    errors.confirmPassword = lang.inputError.passwordDontMatch;
  }
  return errors;
}

const yupPassword = Yup.string()
  .min(6, lang.inputError.passwordMin)
  .required(lang.inputError.required);

const validationSchema = Yup.object({
  name: Yup.string()
    .required(lang.inputError.required),
  function: Yup.string()
    .oneOf(['admin', 'editor', 'reader'], lang.inputError.invalidFunction)
    .required(lang.inputError.required),
  email: Yup.string()
    .email(lang.inputError.invalidEmail)
    .required(lang.inputError.required),
  password: yupPassword,
  confirmPassword: yupPassword
});


export default function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState(undefined);
  const handlerError = () => setErrorType(undefined);

  async function submit(email, password, name, setSubmitting) {
    setLoading(true);
    setSubmitting(false);
    setErrorType(undefined);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setErrorType(error.code);
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validatePassword}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          submit(values.email, values.password, values.name, setSubmitting)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {loading
          ? <Loading />
          : (<>
            <Form>
              <div className={styles.container}>
                <Input type='text' label={lang.text.labelName} name='name' />
                <Select label={lang.text.labelFunction} name='function'>
                  <option value=''>{lang.text.functionOptions[0]}</option>
                  <option value='admin'>{lang.text.functionOptions[1]}</option>
                  <option value='editor'>{lang.text.functionOptions[2]}</option>
                  <option value='reader'>{lang.text.functionOptions[3]}</option>
                </Select>
                <Input type='text' label={lang.text.labelEmail} name='email' />
                <Input type='password' label={lang.text.labelPassword} name='password' />
                <Input type='password' label={lang.text.labelConfirmPassword} name='confirmPassword' />
                <div className={styles.buttons}>
                  <button type='submit'>{lang.text.buttonRegister}</button>
                  <Link to='/'><button>{lang.text.buttonCancel}</button></Link>
                </div>
              </div>
            </Form>
            {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
          </>)}
      </Formik>
    </>
  );
}

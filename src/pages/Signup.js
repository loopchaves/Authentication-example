import * as Yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { trySignup, setLoading, setAlert } from '../app/appSlice';

import { Name, Email, Password } from '../components/layout/Input';
import FormBase from '../components/layout/FormBase';
import language from '../lang/lang.json';


const Signup = ({ lang, trySignup, setLoading, setAlert }) => {
  const navigate = useNavigate();
  const handlerNavigate = () => {
    setAlert(null);
    navigate('/');
  }

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(lang.inputError.required),
    email: Yup.string()
      .email(lang.inputError.invalidEmail)
      .required(lang.inputError.required),
    password: Yup.string()
      .min(6, lang.inputError.passwordMin)
      .oneOf([Yup.ref('confirmPassword')], lang.inputError.passwordDontMatch)
      .required(lang.inputError.required),
    confirmPassword: Yup.string()
      .min(6, lang.inputError.passwordMin)
      .oneOf([Yup.ref('password')], lang.inputError.passwordDontMatch)
      .required(lang.inputError.required)
  });

  const buttonAction = {
    action: handlerNavigate,
    label: lang.text.buttonCancel
  }

  const submit = (values) => {
    trySignup(values).then((action) => {
      if (action.payload) navigate('/');
    });
  }

  useEffect(() => {
    setLoading(false);
  }, [setLoading])

  return (
    <FormBase
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      buttonSubmit={lang.text.buttonRegister}
      buttonAction={buttonAction}
    >
      <Name label={lang.text.labelName} name='name' autoComplete='name' />
      <Email label={lang.text.labelEmail} name='email' autoComplete='email' />
      <Password label={lang.text.labelPassword} name='password' autoComplete='new-password' />
      <Password label={lang.text.labelConfirmPassword} name='confirmPassword' autoComplete='new-password' />
    </FormBase>
  );
}

const mapState = (state) => ({ lang: language[state.app.language] })
const mapDispatch = { trySignup, setLoading, setAlert }

export default connect(mapState, mapDispatch)(Signup);

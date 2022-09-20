import * as Yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { trySignup, setLoading, getLanguage, setAlert } from '../app/appSlice';

import { Name, Email, Password } from '../components/layout/Input';
import FormBase from '../components/layout/FormBase';
import language from '../lang/lang.json';


export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = language[useSelector(getLanguage)];

  const handlerNavigate = () => {
    dispatch(setAlert(undefined));
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

  function submit(values) {
    dispatch(trySignup(values)).then((action) => {
      if (action.payload) navigate('/');
    });
  }

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch])

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

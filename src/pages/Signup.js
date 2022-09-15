import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseCfg';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading, getLanguage } from '../app/appSlice';

import { Input, Select } from '../components/layout/Input';
import FormBase from '../components/layout/FormBase';
import language from '../lang/lang.json';


export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = language[useSelector(getLanguage)];
  const handlerNavigate = () => navigate('/');

  const initialValues = {
    name: '',
    function: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(lang.inputError.required),
    function: Yup.string()
      .oneOf(['admin', 'editor', 'reader'], lang.inputError.invalidFunction)
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

  async function submit(values, setErrorType) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(userCredential.user, { displayName: values.name });
      await sendEmailVerification(userCredential.user).then(() => navigate('/'));
    } catch (error) {
      dispatch(displayLoading(false));
      setErrorType(error.code);
    }
  }

  return (
    <FormBase
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      buttonSubmit={lang.text.buttonRegister}
      buttonAction={buttonAction}
    >
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
    </FormBase>
  );
}

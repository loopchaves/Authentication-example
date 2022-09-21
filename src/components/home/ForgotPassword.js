import * as Yup from 'yup';
import { connect } from 'react-redux';
import { trySendPasswordResetEmail } from '../../app/appSlice';

import { Email } from '../layout/Input';
import FormBase from '../layout/FormBase';
import styles from './styles/ForgotPassword.module.sass';
import language from '../../lang/lang.json';


const ForgotPassword = ({ lang, trySendPasswordResetEmail, handlerForgotPassword }) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(lang.inputError.invalidEmail)
      .required(lang.inputError.required)
  })

  const buttonAction = {
    action: () => handlerForgotPassword(true),
    label: lang.text.buttonCancel
  }

  const submit = (values) => {
    trySendPasswordResetEmail(values)
      .then((action) => { if (!action.error) handlerForgotPassword(false) });
  }

  return (
    <FormBase
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={submit}
      buttonSubmit={lang.text.buttonSendEmail}
      buttonAction={buttonAction}
    >
      <h2 className={styles.msg}>{lang.text.titleForgotPassword}</h2>
      <Email label={lang.text.labelEmail} name='email' autoComplete='email' />
    </FormBase>
  );
}

const mapState = (state) => ({ lang: language[state.app.language] })
const mapDispatch = { trySendPasswordResetEmail }

export default connect(mapState, mapDispatch)(ForgotPassword);

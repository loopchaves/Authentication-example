import * as Yup from 'yup';
import { connect } from 'react-redux';
import { tryEditUser, setLoading, setAlert } from '../../app/appSlice';

import { Name, Email, Password } from '../layout/Input';
import FormBase from '../layout/FormBase';

import styles from './styles/EditUser.module.sass';
import language from '../../lang/lang.json';

const EditUser = ({ lang, user, tryEditUser, setLoading, setAlert }) => {
  const initialValues = {
    name: user.name,
    email: user.email,
    newPassword: '',
    confirmNewPassword: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().email(lang.inputError.invalidEmail),
    newPassword: Yup.string()
      .min(6, lang.inputError.passwordMin)
      .oneOf([Yup.ref('confirmNewPassword')], lang.inputError.passwordDontMatch),
    confirmNewPassword: Yup.string()
      .min(6, lang.inputError.passwordMin)
      .oneOf([Yup.ref('newPassword')], lang.inputError.passwordDontMatch),
    password: Yup.string().required(lang.inputError.required)
  });

  const submit = (values, resetForm) => {
    if (values.name !== initialValues.name || values.email !== initialValues.email || values.newPassword) {
      tryEditUser({ form: { ...values }, initial: { ...initialValues } }).then((action) => {
        if (action.payload) {
          resetForm({
            values: {
              ...initialValues,
              name: action.payload.name,
              email: action.payload.email
            }
          });
          setLoading(false);
        }
      });
    } else {
      setAlert({ msg: 'noDataChanged', type: 'error' })
    }
  }

  return (
    <div className={styles.container}>
      <FormBase
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
        buttonSubmit={lang.text.buttonSave}
        recaptcha={true}
      >
        <Name label={lang.text.labelName} name='name' autoComplete='name' />
        <Email label={lang.text.labelEmail} name='email' autoComplete='email' />
        <Password label={lang.text.labelNewPassword} name='newPassword' autoComplete='new-password' />
        <Password label={lang.text.labelConfirmNewPassword} name='confirmNewPassword' autoComplete='new-password' />
        <Password label={lang.text.labelCurrentPassword} name='password' autoComplete='current-password' />
      </FormBase>
    </div>
  );
}

const mapState = (state) => ({
  lang: language[state.app.language],
  user: state.app.user
})

const mapDispatch = { tryEditUser, setLoading, setAlert }

export default connect(mapState, mapDispatch)(EditUser);
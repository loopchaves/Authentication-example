import { useState, createRef } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { setAlert } from '../../app/appSlice';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './styles/FormBase.module.sass';

const FormBase = ({
  hl,
  loading,
  theme,
  setAlert,
  children,
  initialValues,
  validationSchema,
  onSubmit,
  buttonSubmit,
  buttonAction,
  recaptcha
}) => {
  const recaptchaRef = createRef();
  const [token, setToken] = useState(!recaptcha);

  const submit = (values, setSubmitting, resetForm) => {
    setSubmitting(false);
    if (token) {
      recaptchaRef.current.reset();
      onSubmit(values, resetForm);
    } else {
      setAlert({ msg: 'recaptcha', type: 'error' })
    }
  }

  const onChange = (value) => {
    if (value) setToken(true);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => submit(values, setSubmitting, resetForm)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <div className={styles.container}>
          {children}
          <div className={styles.buttons}>
            <button type='submit' disabled={loading}>{buttonSubmit}</button>
            {buttonAction ? (
              <button onClick={() => buttonAction.action()} disabled={loading}>{buttonAction.label}</button>
            ) : null}
          </div>
          {recaptcha &&
            <div className={styles.recaptcha}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA}
                onChange={onChange}
                hl={hl}
                theme={theme}
              />
            </div>
          }
        </div>
      </Form>
    </Formik>
  );
}

const mapState = (state) => ({
  hl: state.app.language,
  loading: state.app.loading,
  theme: state.app.style.color === 'dark' ? 'dark' : 'light'
})

const mapDispatch = { setAlert }

export default connect(mapState, mapDispatch)(FormBase);
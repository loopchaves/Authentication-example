import { useState, useEffect, useCallback } from 'react';
import { appCheck } from '../../app/firebaseCfg';
import { getToken } from 'firebase/app-check';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { setAlert } from '../../app/appSlice';

import styles from './styles/FormBase.module.sass';


const FormBase = ({
  loading,
  setAlert,
  children,
  initialValues,
  validationSchema,
  onSubmit,
  buttonSubmit,
  buttonAction
}) => {
  const [token, setToken] = useState('');

  const submit = (values, setSubmitting, resetForm) => {
    setSubmitting(false);
    if (token) {
      onSubmit(values, resetForm);
    } else {
      setAlert({ msg: 'recaptcha', type: 'error' })
    }
  }

  const handlerToken = useCallback(async () => {
    const result = await getToken(appCheck);
    setToken(result?.token);
  }, []);

  useEffect(() => {
    handlerToken();
  }, [handlerToken]);

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
            {buttonAction ? (
              <button
                onClick={() => buttonAction.action()}
                disabled={loading}
                className={styles.action}
              >
                {buttonAction.label}
              </button>
            ) : null}
            <button
              type='submit'
              disabled={loading}
              className={styles.submit}
            >
              {buttonSubmit}
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

const mapState = (state) => ({
  loading: state.app.loading
})

const mapDispatch = { setAlert }

export default connect(mapState, mapDispatch)(FormBase);
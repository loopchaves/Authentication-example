import { Formik, Form } from 'formik';
import { connect } from 'react-redux';

import styles from './styles/FormBase.module.sass';

const FormBase = ({
  loading,
  children,
  initialValues,
  validationSchema,
  onSubmit,
  buttonSubmit,
  buttonAction
}) => {
  const submit = (values, setSubmitting, resetForm) => {
    setSubmitting(false);
    onSubmit(values, resetForm);
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
        </div>
      </Form>
    </Formik>
  );
}

const mapState = (state) => ({ loading: state.app.loading })

export default connect(mapState, null)(FormBase);
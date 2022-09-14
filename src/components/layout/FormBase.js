import { useState } from 'react';
import { Formik, Form } from 'formik';

import Loading from './Loading';
import ErrorMsg from './ErrorMsg';

import styles from './styles/FormBase.module.sass';

export default function FormBase({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  buttonSubmit,
  buttonAction
}) {
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState(undefined);

  const handlerError = () => setErrorType(undefined);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => onSubmit(values, setLoading, setSubmitting, setErrorType)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {loading
        ? <Loading />
        : (
          <Form>
            <div className={styles.container}>
              {children}
              <div className={styles.buttons}>
                <button type='submit'>{buttonSubmit}</button>
                {buttonAction ? (
                  <button onClick={() => buttonAction.action()}>{buttonAction.label}</button>
                ) : null}
              </div>
              {errorType && <ErrorMsg errorType={errorType} handlerError={handlerError} />}
            </div>
          </Form>
        )}
    </Formik>
  );
}

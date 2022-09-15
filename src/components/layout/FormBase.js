import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { displayLoading } from '../../app/appSlice';

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
  const dispatch = useDispatch();
  const [errorType, setErrorType] = useState(undefined);

  const handlerError = () => setErrorType(undefined);

  function submit(values, setSubmitting) {
    dispatch(displayLoading(true));
    setSubmitting(false);
    setErrorType(undefined);
    onSubmit(values, setErrorType);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
      validateOnBlur={false}
      validateOnChange={false}
    >
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
    </Formik>
  );
}

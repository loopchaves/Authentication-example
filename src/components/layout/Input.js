import { useField } from 'formik';
import { useSelector } from 'react-redux';
import { getLoading } from '../../app/appSlice';

import styles from './styles/Input.module.sass';


export const Select = ({ label, ...props }) => {
  const loading = useSelector(getLoading);
  const [field, meta, helpers] = useField(props);
  const { setError } = helpers;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name} className={styles.label}>{label}</label>
      <select
        onClick={() => setError(undefined)}
        className={styles.input}
        disabled={loading}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.errorInput}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export const Name = ({ label, ...props }) => {
  const loading = useSelector(getLoading);
  const hideKeyboard = loading ? { inputMode: 'none' } : null;
  const [field, meta, helpers] = useField(props);
  const { setError } = helpers;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name} className={styles.label}>{label}</label>
      <input
        onClick={() => setError(undefined)}
        className={styles.input}
        maxLength='40'
        type='text'
        autoCapitalize='words'
        disabled={loading}
        {...hideKeyboard}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.errorInput}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export const Email = ({ label, ...props }) => {
  const loading = useSelector(getLoading);
  const hideKeyboard = loading ? { inputMode: 'none' } : null;
  const [field, meta, helpers] = useField(props);
  const { setError } = helpers;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name} className={styles.label}>{label}</label>
      <input
        onClick={() => setError(undefined)}
        className={styles.input}
        maxLength='40'
        type='text'
        autoCapitalize='none'
        spellCheck={false}
        inputMode='email'
        disabled={loading}
        {...hideKeyboard}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.errorInput}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export const Password = ({ label, ...props }) => {
  const loading = useSelector(getLoading);
  const hideKeyboard = loading ? { inputMode: 'none' } : null;
  const [field, meta, helpers] = useField(props);
  const { setError } = helpers;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name} className={styles.label}>{label}</label>
      <input
        onClick={() => setError(undefined)}
        className={styles.input}
        maxLength='40'
        type='password'
        autoCapitalize='none'
        spellCheck={false}
        disabled={loading}
        {...hideKeyboard}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.errorInput}>{meta.error}</div>
      ) : null}
    </div>
  );
}

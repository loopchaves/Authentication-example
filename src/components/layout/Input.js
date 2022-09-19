import { useField } from 'formik';
import { useSelector } from 'react-redux';
import { getLoading } from '../../app/appSlice';

import styles from './styles/Input.module.sass';


export function Select({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setError } = helpers;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name} className={styles.label}>{label}</label>
      <select
        onClick={() => setError(undefined)}
        className={styles.input}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.errorInput}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export function Name({ label, ...props }) {
  const hideKeyboard = useSelector(getLoading) ? { inputMode: 'none' } : null;
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

export function Email({ label, ...props }) {
  const hideKeyboard = useSelector(getLoading) ? { inputMode: 'none' } : null;
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

export function Password({ label, ...props }) {
  const hideKeyboard = useSelector(getLoading) ? { inputMode: 'none' } : null;
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
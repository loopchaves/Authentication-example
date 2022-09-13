import { useField } from 'formik';

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

export function Input({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setError } = helpers;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name} className={styles.label}>{label}</label>
      <input
        onClick={() => setError(undefined)}
        className={styles.input}
        autoComplete='off'
        maxLength='40'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.errorInput}>{meta.error}</div>
      ) : null}
    </div>
  );
}
import { useField } from 'formik';

import styles from './styles/Input.module.sass';

export function Select({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      <label htmlFor={props.name} className={styles.label}>{label}</label>
      <select className={styles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.errorMsg}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      <label htmlFor={props.name} className={styles.label}>{label}</label>
      <input
        className={styles.input}
        autoComplete='off'
        maxLength='35'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.errorMsg}>{meta.error}</div>
      ) : null}
    </div>
  );
}

import styles from './styles/Tab.module.sass';

export default function Tab({ name }) {
  return (
    <p className={styles.tab}>
      {name}
    </p>
  );
}

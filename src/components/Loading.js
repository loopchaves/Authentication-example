import loading from '../img/loading.svg';

import styles from './styles/Loading.module.sass';

export default function Loading() {
  return (
    <div className={styles.container}>
      <img src={loading} alt='Loading' />
    </div>
  );
}

import UserTab from './UserTab';

import styles from './styles/TabBar.module.sass';

export default function TabBar() {
  return (
    <div className={styles.tabBar}>
      <UserTab name='Dados' />
      <UserTab name='Editar' />
      <UserTab name='Configurações' />
    </div>
  );
}

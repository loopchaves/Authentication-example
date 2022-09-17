import { useSelector } from 'react-redux';
import { getLanguage } from '../../app/appSlice';

import UserTab from './UserTab';

import styles from './styles/UserTabBar.module.sass';
import language from '../../lang/lang.json';

export default function TabBar({ handlerClick, selected }) {
  const lang = language[useSelector(getLanguage)];

  return (
    <div className={styles.tabBar}>
      <UserTab
        handlerClick={handlerClick}
        name={lang.text.tabData}
        tab='data'
        selected={selected}
      />
      <UserTab
        handlerClick={handlerClick}
        name={lang.text.tabEdit}
        tab='edit'
        selected={selected}
      />
      <UserTab
        handlerClick={handlerClick}
        name={lang.text.tabConfig}
        tab='config'
        selected={selected}
      />
      <UserTab
        handlerClick={handlerClick}
        name={lang.text.tabFeedback}
        tab='feedback'
        selected={selected}
      />
    </div>
  );
}

import { connect } from 'react-redux';

import UserTab from './UserTab';

import styles from './styles/UserTabBar.module.sass';
import language from '../../lang/lang.json';

const TabBar = ({ lang, handlerClick, selected }) => {
  return (
    <div className={styles.tabBar}>
      <UserTab
        handlerClick={handlerClick}
        name={lang.tabData}
        tab='data'
        selected={selected}
      />
      <UserTab
        handlerClick={handlerClick}
        name={lang.tabEdit}
        tab='edit'
        selected={selected}
      />
      <UserTab
        handlerClick={handlerClick}
        name={lang.tabConfig}
        tab='config'
        selected={selected}
      />
      <UserTab
        handlerClick={handlerClick}
        name={lang.tabFeedback}
        tab='feedback'
        selected={selected}
      />
    </div>
  );
}

const mapState = (state) => ({ lang: language[state.app.language].text })

export default connect(mapState, null)(TabBar);
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStyle } from '../../app/appSlice';

import UserTabBar from '../layout/UserTabBar';
import UserData from '../user/UserData';
import EditUser from '../user/EditUser';
import UserConfig from '../user/UserConfig';
import UserFeedback from '../user/UserFeedback';
import EmailVerifiedAlert from '../layout/EmailVerifiedAlert';


const User = ({ uid, emailVerified, getStyle }) => {
  const [selected, setSelected] = useState('data');

  const handlerClick = (tab) => {
    setSelected(tab);
  }

  useEffect(() => {
    getStyle(uid);
  }, [uid]);

  return (<>
    {!emailVerified && <EmailVerifiedAlert />}
    <UserTabBar handlerClick={handlerClick} selected={selected} />
    {selected === 'data' && <UserData />}
    {selected === 'edit' && <EditUser />}
    {selected === 'config' && <UserConfig />}
    {selected === 'feedback' && <UserFeedback />}
  </>);
}

const mapState = (state) => ({
  uid: state.app.user.uid,
  emailVerified: state.app.user.emailVerified
})

const mapDispatch = { getStyle }

export default connect(mapState, mapDispatch)(User);
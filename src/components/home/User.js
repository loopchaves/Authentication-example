import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading } from '../../app/appSlice';
import { getEmailVerified } from '../../app/userSlice';

import UserTabBar from '../layout/UserTabBar';
import UserData from '../user/UserData';
import EditUser from '../user/EditUser';
import UserConfig from '../user/UserConfig';
import UserFeedback from '../user/UserFeedback';
import EmailVerifiedAlert from '../layout/EmailVerifiedAlert';


export default function User() {
  const dispatch = useDispatch();
  const emailVerified = useSelector(getEmailVerified);
  const [selected, setSelected] = useState('data');

  function handlerClick(tab) {
    setSelected(tab);
  }

  const loadingOff = useCallback(() => {
    dispatch(displayLoading(false))
  }, [dispatch]);

  useEffect(() => loadingOff(), [loadingOff]);

  return (<>
    {!emailVerified && <EmailVerifiedAlert />}
    <UserTabBar handlerClick={handlerClick} selected={selected} />
    {selected === 'data' && <UserData />}
    {selected === 'edit' && <EditUser />}
    {selected === 'config' && <UserConfig />}
    {selected === 'feedback' && <UserFeedback />}
  </>);
}

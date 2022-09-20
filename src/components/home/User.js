import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmailVerified, setLoading } from '../../app/appSlice';

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

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  return (<>
    {!emailVerified && <EmailVerifiedAlert />}
    <UserTabBar handlerClick={handlerClick} selected={selected} />
    {selected === 'data' && <UserData />}
    {selected === 'edit' && <EditUser />}
    {selected === 'config' && <UserConfig />}
    {selected === 'feedback' && <UserFeedback />}
  </>);
}

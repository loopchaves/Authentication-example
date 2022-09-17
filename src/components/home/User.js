import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { displayLoading } from '../../app/appSlice';

import UserTabBar from '../layout/UserTabBar';
import UserData from '../user/UserData';
import EditUser from '../user/EditUser';
import UserConfig from '../user/UserConfig';
import UserFeedback from '../user/UserFeedback';


export default function User() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('data');

  function handlerClick(tab) {
    setSelected(tab);
  }

  const loadingOff = useCallback(() => {
    dispatch(displayLoading(false))
  }, [dispatch]);

  useEffect(() => loadingOff(), [loadingOff]);

  return (<>
    <UserTabBar handlerClick={handlerClick} selected={selected} />
    {selected === 'data' && <UserData />}
    {selected === 'edit' && <EditUser />}
    {selected === 'config' && <UserConfig />}
    {selected === 'feedback' && <UserFeedback />}
  </>);
}

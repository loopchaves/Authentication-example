import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser, getUser } from '../app/appSlice';

import User from '../components/home/User';
import Login from '../components/home/Login';


export default function Home() {
  const dispatch = useDispatch();
  const logged = useSelector(getUser);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <>
      {logged ? <User /> : <Login />}
    </>
  );
}

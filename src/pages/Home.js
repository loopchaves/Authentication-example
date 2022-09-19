import { useSelector } from 'react-redux';
import { getUid } from '../app/userSlice';

import User from '../components/home/User';
import Login from '../components/home/Login';


export default function Home() {
  const logged = useSelector(getUid);

  return (
    <>
      {logged ? <User /> : <Login />}
    </>
  );
}

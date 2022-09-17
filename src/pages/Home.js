import { useEffect, useCallback } from 'react';
import { auth } from '../firebaseCfg';
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { displayLoading } from '../app/appSlice';
import { addUser, getUid } from '../app/userSlice';

import User from '../components/home/User';
import Login from '../components/home/Login';


export default function Home() {
  const dispatch = useDispatch();
  const logged = useSelector(getUid);

  const checkUser = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          creationDate: new Date(parseInt(user.metadata.createdAt)).toLocaleString(),
          lastLogin: new Date(parseInt(user.metadata.lastLoginAt)).toLocaleString()
        }
        dispatch(addUser(payload));
      } else {
        dispatch(displayLoading(false));
      }
    });
  }, [dispatch])

  useEffect(() => checkUser(), [checkUser]);

  return (
    <>
      {logged ? <User /> : <Login />}
    </>
  );
}

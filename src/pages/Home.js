import { useState, useEffect } from 'react';
import { auth } from '../firebaseCfg';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { displayLoading } from '../app/loadingSlice';

import User from '../components/home/User';
import Login from '../components/home/Login';


export default function Home() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);

  const handlerUser = (user) => setUser(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(true) : dispatch(displayLoading(false));
    });
  }, [dispatch]);

  return (
    <>
      {user
        ? <User handlerUser={handlerUser} />
        : <Login handlerUser={handlerUser} />}
    </>
  );
}

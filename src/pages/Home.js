import { useState, useEffect } from 'react';
import { auth } from '../firebaseCfg';
import { onAuthStateChanged } from "firebase/auth";

import User from '../components/home/User';
import Login from '../components/home/Login';
import Loading from '../components/layout/Loading';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const handlerUser = (user) => setUser(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(true);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading
        ? <Loading />
        : user
          ? <User handlerUser={handlerUser} />
          : <Login handlerUser={handlerUser} />}
    </>
  );
}

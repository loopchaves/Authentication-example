import { useState, useEffect } from 'react';
import { auth } from '../firebaseCfg';
import { onAuthStateChanged } from "firebase/auth";

import User from '../components/User';
import Login from '../components/Login';
import Loading from '../components/Loading';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      setLoading(false);
    });
  }, []);

  const handlerUser = (user) => setUser(user);

  return (
    <>
      {loading
        ? <Loading />
        : user
          ? <User user={user} handlerUser={handlerUser} />
          : <Login handlerUser={handlerUser} />}
    </>
  );
}

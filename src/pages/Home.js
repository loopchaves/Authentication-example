import { useEffect } from 'react';
import { connect } from 'react-redux';
import { verifyUser } from '../app/appSlice';

import User from '../components/home/User';
import Login from '../components/home/Login';


const Home = ({ user, verifyUser }) => {
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <>
      {user ? <User /> : <Login />}
    </>
  );
}

const mapState = (state) => ({
  user: state.app.user
})

const mapDispatch = { verifyUser }

export default connect(mapState, mapDispatch)(Home);
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { verifyUser, getStyle } from '../app/appSlice';

import User from '../components/home/User';
import Login from '../components/home/Login';
import changeStyle from '../app/themeStyles';


const Home = ({ user, verifyUser, getStyle }) => {
  useEffect(() => {
    if (user) {
      getStyle(user.uid).then((action) => {
        if (action.payload) changeStyle(action.payload);
      });
    } else {
      verifyUser().then((action) => {
        if (!action.payload) changeStyle();
      });
    }
  }, [user, verifyUser, getStyle]);

  return (
    <>
      {user ? <User /> : <Login />}
    </>
  );
}

const mapState = (state) => ({ user: state.app.user })
const mapDispatch = { verifyUser, getStyle }

export default connect(mapState, mapDispatch)(Home);
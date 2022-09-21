import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyEmailCode } from '../app/appSlice';

import ResetPassword from '../components/usermgmt/ResetPassword';

import styles from './styles/UserMgmt.module.sass';

const UserMgmt = ({ verifyEmailCode }) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  const actionCode = params.get('oobCode');

  switch (mode) {
    case 'resetPassword':
      return <ResetPassword actionCode={actionCode} />;

    case 'verifyEmail':
      verifyEmailCode(actionCode).then(() => navigate('/'));
      return <div className={styles.blank}></div>

    default:
      navigate('/');
      break;
  }
}

const mapDispatch = { verifyEmailCode }

export default connect(null, mapDispatch)(UserMgmt);

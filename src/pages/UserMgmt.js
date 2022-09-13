import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ResetPassword from '../components/usermgmt/ResetPassword';
import VerifyEmail from '../components/usermgmt/VerifyEmail';

import Loading from '../components/layout/Loading';


export default function UserMgmt() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mgmt, setMgmt] = useState();


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const actionCode = params.get('oobCode');

    switch (mode) {
      case 'resetPassword':
        setMgmt(<ResetPassword actionCode={actionCode} />);
        break;

      case 'verifyEmail':
        setMgmt(<VerifyEmail actionCode={actionCode} />);
        break;

      default:
        navigate('/');
        break;
    }

    setLoading(false);
  }, [navigate]);

  return (
    <>
      {loading
        ? <Loading />
        : mgmt
      }
    </>
  );
}

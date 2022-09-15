// import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ResetPassword from '../components/usermgmt/ResetPassword';
import VerifyEmail from '../components/usermgmt/VerifyEmail';


export default function UserMgmt() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  const actionCode = params.get('oobCode');

  switch (mode) {
    case 'resetPassword':
      return <ResetPassword actionCode={actionCode} />;

    case 'verifyEmail':
      return <VerifyEmail actionCode={actionCode} />;

    default:
      navigate('/');
      break;
  }


  // const [mgmt, setMgmt] = useState();
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const mode = params.get('mode');
  //   const actionCode = params.get('oobCode');

  //   switch (mode) {
  //     case 'resetPassword':
  //       setMgmt(<ResetPassword actionCode={actionCode} />);
  //       break;

  //     case 'verifyEmail':
  //       setMgmt(<VerifyEmail actionCode={actionCode} />);
  //       break;

  //     default:
  //       navigate('/');
  //       break;
  //   }
  // }, [navigate]);

  // return (
  //   <>
  //     {mgmt}
  //   </>
  // );
}

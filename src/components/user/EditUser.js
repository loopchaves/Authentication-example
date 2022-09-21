import * as Yup from 'yup';

import FormBase from '../layout/FormBase';

import styles from './styles/EditUser.module.sass';

export default function EditUser() {
  const initialValues = {
    name: { name: '' },
    email: { email: '' },
    password: { newPassword: '', confirmNewPassword: '' }
  }
  return (
    <div className={styles.container}>
      <FormBase>

      </FormBase>
    </div>
  );
}

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Input } from '../components/Input';

import styles from './styles/Login.module.sass';

export default function Login() {
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        alert('Username: ' + values.username + '\nPassword: ' + values.password);
        setSubmitting(false);
      }}
    >
      <Form>
        <div className={styles.login}>
          <Input type='text' label='Username' name='username' />
          <Input type='password' label='Password' name='password' />
          <div className={styles.buttons}>
            <Link to='signup'><button>Sign up</button></Link>
            <button type='submit'>Login</button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

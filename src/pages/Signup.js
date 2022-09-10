import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import { Input, Select } from '../components/Input';

import styles from './styles/Signin.module.sass';

const validatePassword = values => {
  const errors = {};

  if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
    errors.password = "Passwords don't match";
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
}

export default function Signin() {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        name: '',
        function: '',
        username: '',
        password: '',
        confirmPassword: ''
      }}
      validate={validatePassword}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        function: Yup.string()
          .oneOf(['admin', 'editor', 'reader'], 'Invalid function')
          .required('Required'),
        username: Yup.string().required('Required'),
        password: Yup.string()
          .min(6, 'Min 6 characters')
          .required('Required'),
        confirmPassword: Yup.string()
          .min(6, 'Min 6 characters')
          .required('Required')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        alert(
          'Name: ' + values.name +
          '\nFunction: ' + values.function +
          '\nUsername: ' + values.username +
          '\nPassword: ' + values.password
        )
        navigate('/');
        setSubmitting(false);
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <div className={styles.signin}>
          <Input type='text' label='Name' name='name' />
          <Select type='text' label='Function' name='function'>
            <option value=''>Select a function</option>
            <option value='admin'>Admin</option>
            <option value='editor'>Editor</option>
            <option value='reader'>Reader</option>
          </Select>
          <Input type='text' label='Username' name='username' />
          <Input type='password' label='Password' name='password' />
          <Input type='password' label='Confirm password' name='confirmPassword' />
          <div className={styles.buttons}>
            <Link to='/'><button>Cancel</button></Link>
            <button type='submit'>Register</button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

import s from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { login } from '../../redux/auth/operations';
import FormInput from '../FormInput/FormInput';
import { useId } from 'react';
import { loginUserSchema } from '../../Schemas/schema';

export default function LoginForm() {
  const dispatch = useDispatch();

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = values => {
    dispatch(login(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginUserSchema}
    >
      <Form className={s.formContainer} autoComplete="off">
        <FormInput
          id={emailFieldId}
          type="email"
          name="email"
          placeholder="Email"
        >
          Email
        </FormInput>
        <FormInput
          id={passwordFieldId}
          type="password"
          name="password"
          placeholder="Password"
        >
          Password
        </FormInput>
        <button type="submit" className={s.logBtn}>
          Log In
        </button>
      </Form>
    </Formik>
  );
}

import s from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { register } from '../../redux/auth/operations';
import FormInput from '../FormInput/FormInput';
import { useId } from 'react';
import { registerUserSchema } from '../../Schemas/schema';

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = values => {
    dispatch(register(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerUserSchema}
    >
      <Form className={s.formContainer} autoComplete="off">
        <FormInput
          id={nameFieldId}
          type="text"
          name="name"
          placeholder="Username"
        >
          Username
        </FormInput>

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

        <button type="submit" className={s.regBtn}>
          Register
        </button>
      </Form>
    </Formik>
  );
}

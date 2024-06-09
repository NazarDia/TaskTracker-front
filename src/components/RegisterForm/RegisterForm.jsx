import s from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { register } from '../../redux/auth/operations';
import FormInput from '../FormInput/FormInput';
import * as Yup from 'yup';
import { useId } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isRegister = location.pathname === '/auth/register';

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, 'Too short!')
      .max(50, 'Too long!')
      .required('Required'),
    password: Yup.string().trim().min(4, 'Too short!').required('Required'),
    email: Yup.string().trim().email().required('Required'),
  });

  const handleSubmit = values => {
    dispatch(register(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className={s.registerPage}>
        <div className={s.registerContainer}>
          <ul className={s.navBtns}>
            <li className={isRegister ? s.active : ''}>
              <Link
                className={isRegister ? s.activeLink : s.navLinks}
                to="/auth/register"
              >
                Registration
              </Link>
            </li>
            <li className={isRegister ? s.active : ''}>
              <Link
                className={!isRegister ? s.activeLink : s.navLinks}
                to="/auth/login"
              >
                Log In
              </Link>
            </li>
          </ul>
          <Form className={s.formContainer} autoComplete="off">
            <FormInput
              id={nameFieldId}
              type="text"
              name="name"
              placeholder="Enter your name"
            ></FormInput>

            <FormInput
              id={emailFieldId}
              type="email"
              name="email"
              placeholder="Enter your email"
            ></FormInput>

            <FormInput
              id={passwordFieldId}
              type="password"
              name="password"
              placeholder="Create a password"
            ></FormInput>
            <button type="submit" className={s.regBtn}>
              Register Now
            </button>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

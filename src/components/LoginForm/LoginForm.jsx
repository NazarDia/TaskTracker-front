import s from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { login } from '../../redux/auth/operations';
import FormInput from '../FormInput/FormInput';
import { useId } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loginUserSchema } from '../../Schemas/schema';

export default function LoginForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogin = location.pathname === '/auth/login';

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
      <div className={s.loginPage}>
        <div className={s.loginContainer}>
          <ul className={s.navBtns}>
            <li className={isLogin ? s.active : ''}>
              <Link
                className={!isLogin ? s.activeLink : s.navLinks}
                to="/auth/register"
              >
                Registration
              </Link>
            </li>
            <li className={isLogin ? s.active : ''}>
              <Link
                className={isLogin ? s.activeLink : s.navLinks}
                to="/auth/login"
              >
                Log In
              </Link>
            </li>
          </ul>
          <Form className={s.formContainer} autoComplete="off">
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
              placeholder="Confirm a password"
            ></FormInput>
            <button type="submit" className={s.logBtn}>
              Log In Now
            </button>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

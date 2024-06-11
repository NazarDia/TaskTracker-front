import s from './LoginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { login } from '../../redux/auth/operations';
import FormInput from '../FormInput/FormInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUserSchema } from '../../Schemas/schema';
import { useRef, useEffect, useId } from 'react';
import { selectAuthError } from '../../redux/auth/selectors';
import { resetAuthError } from '../../redux/auth/slice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/auth/login';

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const containerRef = useRef();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = values => {
    dispatch(login(values));
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        navigate('/');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthError());
    };
  }, [dispatch]);
  const authError = useSelector(selectAuthError);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginUserSchema}
    >
      <div className={s.loginPage}>
        <div className={s.loginContainer} ref={containerRef}>
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
            {authError && <div className={s.error}>{authError}</div>}
            <button type="submit" className={s.logBtn}>
              Log In Now
            </button>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

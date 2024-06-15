import s from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { register } from '../../redux/auth/operations';
import FormInput from '../FormInput/FormInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerUserSchema } from '../../Schemas/schema';
import { useId, useRef, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname === '/auth/register';

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = async values => {
    setIsLoading(true);
    await dispatch(register(values));
    setIsLoading(false);
    navigate('/home');
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerUserSchema}
    >
      <div className={s.registerPage}>
        <div className={s.registerContainer} ref={containerRef}>
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Create a password"
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            ></FormInput>
            <button type="submit" className={s.regBtn}>
              Register Now
            </button>
            <div className={s.loaderWrapper}>{isLoading && <Loader />}</div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

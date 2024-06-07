import s from './WelcomePage.module.css';
import icons from '../../images/sprite/icons.svg';

import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className={s.welcomeContainer}>
      <div className={s.welcomeLogo}>
        <img
          src="/src/images/logo/logo-mob.png"
          alt="Logo"
          className={s.logo}
        />
        <div className={s.welcomeText}>
          <span className={s.logoContainer}>
            <svg className={s.logoIcon}>
              <use xlinkHref={`${icons}#icon-lightning`} />
            </svg>
          </span>
          <p className={s.logoItem}>Task Pro</p>
        </div>
      </div>
      <p className={s.mainSlogan}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Do not wait, start achieving your goals now!
      </p>
      <div className={s.mainButtons}>
        <Link to="/auth/register">
          <button className={s.registerButton}>Register</button>
        </Link>
        <Link to="/auth/login">
          <button className={s.loginButton}>Log In</button>
        </Link>
      </div>
    </div>
  );
}

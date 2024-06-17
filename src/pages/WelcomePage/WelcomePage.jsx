import s from './WelcomePage.module.css';
import icon from '../../images/sprite/sprite-icon.svg';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className={s.welcomeContainer}>
      <div className={s.welcomeHeader}>
        <div className={s.welcomeImage}></div>
        <div className={s.welcomeNameWrapper}>
          <span className={s.welcomeIconWrapper}>
            <svg className={s.welcomeIcon} width={16} height={20}>
              <use href={`${icon}#icon-welcome`}></use>
            </svg>
          </span>
          <h1 className={s.welcomeName}>Task Pro</h1>
        </div>
      </div>
      <p className={s.welcomeSlogan}>
        Supercharge your productivity and take control
        <br className={s.mobileBreak} /> of your tasks with Task
        <br className={s.tabletBreak} /> Pro - Don&apos;t wait, start
        <br className={s.mobileBreak} /> achieving your goals now!
      </p>
      <div className={s.mainButtons}>
        <Link to="/auth/register">
          <button className={s.registerButton}>Registration</button>
        </Link>
        <Link to="/auth/login">
          <button className={s.loginButton}>Log In</button>
        </Link>
      </div>
    </div>
  );
}

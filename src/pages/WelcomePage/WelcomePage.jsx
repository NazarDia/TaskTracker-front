import s from './WelcomePage.module.css';
import icon from '../../images/sprite/sprite-icon.svg';
import welcomeMob1x from '../../images/welcome-page-image/welcome-mob-1x.png';
import welcomeMob2x from '../../images/welcome-page-image/welcome-mob-2x.png';
import welcomeTab1x from '../../images/welcome-page-image/welcome-tab-1x.png';
import welcomeTab2x from '../../images/welcome-page-image/welcome-tab-2x.png';
import welcomeDesk1x from '../../images/welcome-page-image/welcome-desk-1x.png';
import welcomeDesk2x from '../../images/welcome-page-image/welcome-desk-2x.png';

import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className={s.welcomeContainer}>
      <div className={s.welcomeHeader}>
        <div className={s.welcomeImage}>
          <img
            src={welcomeMob1x}
            srcSet={`
    ${welcomeMob1x} 320w,
    ${welcomeMob2x} 640w,
    ${welcomeTab1x} 768w,
    ${welcomeTab2x} 1536w,
    ${welcomeDesk1x} 1440w,
    ${welcomeDesk2x} 2880w
  `}
            sizes="
    (max-width: 767px) 124px,
    (min-width: 768px) and (max-width: 1439px) 162px,
    (min-width: 1440px) 162px
  "
            alt="Welcome Image"
          />
        </div>
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

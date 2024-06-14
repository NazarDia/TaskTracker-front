import sprite from '../../images/sprite/sprite-icon.svg';
import s from './Logo.module.css';

export default function Logo() {
  return (
    <div className={s.container}>
      <svg width={32} height={32}>
        <use href={`${sprite}#sidebar-logo`}></use>
      </svg>
      <p className={s.logoName}>Task Pro</p>
    </div>
  );
}

import sprite from '../../images/sprite/sprite-icon.svg';
import s from './NeedHelp.module.css';

export default function NeedHelp() {
  return (
    <div className={s.container}>
      <div className={s.img}></div>
      <p className={s.text}>
        If you need help with <span>TaskPro</span>, check out our support
        resources or reach out to our customer support team.
      </p>
      <button className={s.btn}>
        <svg width={20} height={20} stroke="#161616">
          <use href={`${sprite}#help_circle`}></use>
        </svg>
        <p>Need help?</p>
      </button>
    </div>
  );
}

import s from './Card.module.css';
import sprite from '../../images/sprite/sprite-icon.svg';

const Card = ({ task }) => {
  return (
    <div className={s.container}>
      <div className={s.contentWrapper}>
        <h3 className={s.cardTitle}>{task.title}</h3>
        <p className={s.taskDescr}>{task.description}</p>
      </div>
      <div className={s.cardBottomnContent}>
        <div className={s.cardextraWrapper}>
          <div className={s.exraItem}>
            <p className={s.extraItemTitle}>Priority</p>
            <p className={s.extraItemContent}>Low</p>
          </div>
          <div className={s.exraItem}>
            <p className={s.extraItemTitle}>Deadline</p>
            <p className={s.extraItemContent}>{task.deadline}</p>
          </div>
        </div>
        <div className={s.cardBtnWrapper}>
          <button className={s.cardBtn}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#broken-right`}></use>
            </svg>
          </button>
          <button className={s.cardBtn}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#pencil`}></use>
            </svg>
          </button>
          <button className={s.cardBtn}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#trash`}></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

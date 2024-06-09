import s from './HeaderDashboard.module.css';
import sprite from '../../images/sprite/sprite-icon.svg';

const HeaderDashboard = ({ activeBoard }) => {
  return (
    <div className={s.headerWrapper}>
      <p className={s.boardTitle}>{activeBoard ? activeBoard.title : ''}</p>
      <div className={s.filterWrapper}>
        <svg width={20} height={20} className={s.icon}>
          <use href={`${sprite}#filter`}></use>
        </svg>
        <p className={s.filtersPar}>Filters</p>
      </div>
    </div>
  );
};

export default HeaderDashboard;

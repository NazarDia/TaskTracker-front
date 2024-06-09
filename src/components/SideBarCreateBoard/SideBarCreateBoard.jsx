import sprite from '../../images/sprite/sprite-icon.svg';
import s from './SideBarCreateBoard.module.css';

export default function SideBarCreateBoard() {
  return (
    <div className={s.createBoard}>
      <p className={s.text}>Create a new board</p>
      <button className={s.btn}>
        <svg width={20} height={20} stroke="#121212">
          <use href={`${sprite}#icon-plus`}></use>
        </svg>
      </button>
    </div>
  );
}

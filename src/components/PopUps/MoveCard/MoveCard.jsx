import s from './MoveCardDropdown.module.css';
import sprite from '../../../images/sprite/sprite-icon.svg'

const MoveCard = ({ columns, onMoveCard }) => {
  return (
    <ul className={s.dropdown}>
      {columns.map(column => (
        <li className={s.dropdownItem} key={column._id} onClick={() => onMoveCard(column._id, column.name)}>
          {column.name}
          <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#broken-right`}></use>
            </svg>
        </li>
      ))}
    </ul>
  );
};

export default MoveCard;
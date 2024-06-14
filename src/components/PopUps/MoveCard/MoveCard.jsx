import s from './MoveCard.module.css';
import sprite from '../../../images/sprite/sprite-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllColumns } from '../../../redux/columns/operations';
import { selectColumns } from '../../../redux/columns/selectors';
import { moveCard } from '../../../redux/cards/operations';

const MoveCard = ({ card, onClose }) => {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);

  const onMoveCard = (columnId, targetColumnName) => {
    const taskId = card._id;
    dispatch(moveCard(taskId, columnId, targetColumnName));
    onClose();
    console.log(columns, taskId, columnId, targetColumnName);
  };
  return (
    <ul className={s.dropdown}>
      {columns.map(column => (
        <li
          className={s.dropdownItem}
          key={column._id}
          onClick={() => onMoveCard(column._id, column.title)}
        >
          {column.title}
          <svg width={16} height={16} className={s.icon}>
            <use href={`${sprite}#broken-right`}></use>
          </svg>
        </li>
      ))}
    </ul>
  );
};

export default MoveCard;

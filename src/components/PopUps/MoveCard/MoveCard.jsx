import s from './MoveCard.module.css';
import sprite from '../../../images/sprite/sprite-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumns } from '../../../redux/columns/selectors';
import { moveCard } from '../../../redux/cards/operations';

const MoveCard = ({ card, onClose }) => {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);

  const currentBoardId = card.boardId;

  const filteredColumns = columns.filter(
    column => column.boardId === currentBoardId
  );

  const onMoveCard = (columnId, targetColumnName, boardId) => {
    const taskId = card._id;
    dispatch(moveCard({ taskId, boardId, targetColumnName }))
      .then(() => {
        onClose();
      })
      .catch(error => {
        console.error('Error moving card:', error);
      });
  };

  return (
    <ul className={s.dropdown}>
      {filteredColumns.map(column => (
        <li
          className={s.dropdownItem}
          key={column._id}
          onClick={() => onMoveCard(column._id, column.title, column.boardId)}
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

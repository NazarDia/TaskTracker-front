import { useDispatch } from 'react-redux';
import s from './TaskColumn.module.css';
import { deleteColumn, editColumnById } from '../../redux/columns/operations';

import sprite from '../../images/sprite/sprite-icon.svg';
import CardsList from '../CardsList/CardsList';
import { CardButton } from '../PopUps/CardButton/CardButton';

const TaskColumn = ({ column }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={s.container}>
        <h4 className={s.columnTitle}>{column.title}</h4>
        <div className={s.btnWrapper}>
          <button
            onClick={() => dispatch(editColumnById(column.id))}
            className={s.columnBtn}
          >
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#pencil`}></use>
            </svg>
          </button>
          <button
            onClick={() => dispatch(deleteColumn(column.id))}
            className={s.columnBtn}
          >
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#trash`}></use>
            </svg>
          </button>
        </div>
      </div>
      <CardsList column={column}></CardsList>
      <CardButton btnText={'Add another card'}></CardButton>
    </>
  );
};

export default TaskColumn;

<svg width={20} height={20} className={s.icon}>
  <use href={`${sprite}#filter`}></use>
</svg>;

import { useDispatch } from 'react-redux';
import s from './TaskColumn.module.css';
import { deleteColumn, editColumnById } from '../../redux/columns/operations';

const TaskColumn = ({ column }) => {
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
      <h4>Заголовок колонки</h4>
      <div>
        <div>
          <button onClick={() => dispatch(editColumnById(column.id))}>
            Delete
          </button>
          <button onClick={() => dispatch(deleteColumn(column.id))}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;

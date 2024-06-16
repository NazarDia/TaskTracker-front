import s from './TaskColumnsList.module.css';
import { useSelector } from 'react-redux';

import TaskColumn from '../TaskColumn/TaskColumn';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import ColumnStatus from '../ColumnStatus/ColumnStatus';

import {
  selectColumnsByBoardId,
  selectError,
  selectIsLoading,
} from '../../redux/boards/selectors';

const TaskColumnsList = () => {
  const columns = useSelector(selectColumnsByBoardId) || [];
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (loading) return <Loader />;
  if (error) return <Error />;
  if (!Array.isArray(columns)) return <div>No columns available</div>;

  return (
    <div className={s.container}>
      {columns.length === 0 ? (
        <ColumnStatus />
      ) : (
        <ul className={s.columnList}>
          {columns.map(column => (
            <li key={column._id} className={s.listItem}>
              <TaskColumn column={column} />
            </li>
          ))}
          <li>
            <ColumnStatus />
          </li>
        </ul>
      )}
    </div>
  );
};

export default TaskColumnsList;

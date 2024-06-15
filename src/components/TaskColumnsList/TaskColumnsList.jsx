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

import { selectFilteredCards } from '../../redux/filters/selector';

const TaskColumnsList = () => {
  const columns = useSelector(selectColumnsByBoardId);
  const filteredTasks = useSelector(selectFilteredCards);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  console.log('Columns:', columns);
  console.log('Filtered Tasks:', filteredTasks);

  const getFilteredTasksForColumn = column => {
    return filteredTasks.filter(task => task.columnId === column._id);
  };

  if (loading) return <Loader />;
  if (error) return <Error />;
  if (!Array.isArray(columns)) return <div>No columns available</div>;

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: getFilteredTasksForColumn(column),
  }));

  return (
    <div className={s.container}>
      {columns.length === 0 ? (
        <ColumnStatus />
      ) : (
        <ul className={s.columnList}>
          {filteredColumns.map(column => (
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

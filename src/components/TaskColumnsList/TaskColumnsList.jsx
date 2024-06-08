import { useEffect } from 'react';
import s from './TaskColumnsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllColumns } from '../../redux/columns/operations';
import TaskColumn from '../TaskColumn/TaskColumn';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import ColumnStatus from '../ColumnStatus/ColumnStatus';

const TaskColumnsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllColumns());
  }, [dispatch]);
  const columns = useSelector(state => state.columns.items);
  const loading = useSelector(state => state.columns.loading);
  const error = useSelector(state => state.columns.error);
  return (
    <div className={s.container}>
      {loading && <Loader />}
      {error && <Error />}
      {!loading &&
        !error &&
        (columns.length === 0 ? (
          <ColumnStatus />
        ) : (
          <ul>
            {columns.map(column => (
              <li key={column.id}>
                <TaskColumn column={column} />
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
};

export default TaskColumnsList;

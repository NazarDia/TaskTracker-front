import { useEffect } from 'react';
import ColumnStatus from '../ColumnStatus/ColumnStatus';
import StartBoard from '../StartBoard/StartBoard';
import TaskColumnsList from '../TaskColumnsList/TaskColumnsList';
import s from './MainDashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllColumns } from '../../redux/columns/operations';

const MainDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllColumns());
  }, [dispatch]);
  const columns = useSelector(state => state.columns.items);

  return (
    <div className={s.contentWrapper}>
      {columns.length > 0 ? (
        <>
          <ColumnStatus />
          <TaskColumnsList columns={columns} />
        </>
      ) : (
        <StartBoard />
      )}
    </div>
  );
};

export default MainDashboard;

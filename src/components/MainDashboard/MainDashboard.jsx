import StartBoard from '../StartBoard/StartBoard';
import TaskColumnsList from '../TaskColumnsList/TaskColumnsList';
import s from './MainDashboard.module.css';
import { useSelector } from 'react-redux';

const MainDashboard = () => {
  const boards = useSelector(state => state.boards.boards.items);

  return (
    <div className={s.contentWrapper}>
      {boards.length > 0 ? (
        <>
          <TaskColumnsList />
        </>
      ) : (
        <StartBoard />
      )}
    </div>
  );
};

export default MainDashboard;

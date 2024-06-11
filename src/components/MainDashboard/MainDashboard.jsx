import StartBoard from '../StartBoard/StartBoard';
import TaskColumnsList from '../TaskColumnsList/TaskColumnsList';
import s from './MainDashboard.module.css';

const MainDashboard = ({ activeBoard }) => {
  return (
    <div className={s.contentWrapper}>
      {activeBoard ? <TaskColumnsList /> : <StartBoard />}
    </div>
  );
};

export default MainDashboard;

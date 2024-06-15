import TaskColumnsList from '../TaskColumnsList/TaskColumnsList';
import s from './MainDashboard.module.css';

const MainDashboard = ({ activeBoard }) => {
  return (
    <div className={s.contentWrapper}>{activeBoard && <TaskColumnsList />}</div>
  );
};

export default MainDashboard;

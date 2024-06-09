import { useSelector } from 'react-redux';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import s from './ScreensPage.module.css';

const ScreensPage = () => {
  const boards = useSelector(state => state.boards.boards.items);
  const activeBoard = useSelector(state => state.boards.boards.current);

  let boardToShow;
  if (!activeBoard || Object.keys(activeBoard).length === 0) {
    boardToShow = boards.length > 0 ? boards[0] : null;
  } else {
    boardToShow = activeBoard;
  }

  return (
    <main className={s.container}>
      <HeaderDashboard activeBoard={boardToShow}></HeaderDashboard>
      <MainDashboard></MainDashboard>
    </main>
  );
};

export default ScreensPage;

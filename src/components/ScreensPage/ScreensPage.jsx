import { useDispatch, useSelector } from 'react-redux';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import s from './ScreensPage.module.css';
import { useEffect, useRef } from 'react';
import { getBoardByID } from '../../redux/boards/operations';

const ScreensPage = () => {
  const dispatch = useDispatch();
  const activeBoardId = useSelector(state => state.boards.boards.current._id);
  const activeBoard = useSelector(state =>
    state.boards.boards.items.find(board => board._id === activeBoardId)
  );
  const previousBoardId = useRef(activeBoardId);

  useEffect(() => {
    if (activeBoardId && previousBoardId.current !== activeBoardId) {
      previousBoardId.current = activeBoardId;
      dispatch(getBoardByID(activeBoardId));
    }
  }, [dispatch, activeBoardId]);

  return (
    <main className={s.container}>
      <HeaderDashboard activeBoard={activeBoard}></HeaderDashboard>
      <MainDashboard activeBoard={activeBoard}></MainDashboard>
    </main>
  );
};

export default ScreensPage;

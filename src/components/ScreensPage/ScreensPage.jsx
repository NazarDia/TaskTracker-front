import { useDispatch, useSelector } from 'react-redux';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import s from './ScreensPage.module.css';
import { useEffect, useState } from 'react';
import { getBoardByID } from '../../redux/boards/operations';

const ScreensPage = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards.boards.items);
  const activeBoardId = useSelector(state => state.boards.boards.current._id);
  const activeBoard = useSelector(state =>
    state.boards.boards.items.find(board => board._id === activeBoardId)
  );

  const [defaultBoardSet, setDefaultBoardSet] = useState(false);

  // }, [dispatch, activeBoardId, boards]);

  useEffect(() => {
    if (!defaultBoardSet && boards.length > 0) {
      if (!activeBoardId) {
        const defaultBoardId = boards[0]._id;
        dispatch(getBoardByID(defaultBoardId));
      }
      setDefaultBoardSet(true);
    } else if (activeBoardId && !defaultBoardSet) {
      dispatch(getBoardByID(activeBoardId));
      setDefaultBoardSet(true);
    }
  }, [dispatch, activeBoardId, boards, defaultBoardSet]);

  return (
    <main className={s.container}>
      <HeaderDashboard activeBoard={activeBoard}></HeaderDashboard>
      <MainDashboard activeBoard={activeBoard}></MainDashboard>
    </main>
  );
};

export default ScreensPage;

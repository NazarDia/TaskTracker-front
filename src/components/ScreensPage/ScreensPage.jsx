import { useDispatch, useSelector } from 'react-redux';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';

import StartBoard from '../StartBoard/StartBoard';
import s from './ScreensPage.module.css';
import { useEffect, useState } from 'react';
import { getBoardByID } from '../../redux/boards/operations';
import { selectBoardById, selectBoards } from '../../redux/boards/selectors';

const ScreensPage = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const activeBoardId = useSelector(selectBoardById);
  const activeBoard = useSelector(state =>
    state.boards.boards.items.find(board => board._id === activeBoardId)
  );

  useEffect(() => {
    if (boards.length > 0) {
      if (!activeBoardId) {
        const defaultBoardId = boards[0]._id;
        dispatch(getBoardByID(defaultBoardId));
      }
    } else if (activeBoardId) {
      dispatch(getBoardByID(activeBoardId));
    }
  }, [dispatch, activeBoardId, boards]);

  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (activeBoard && activeBoard.background) {
      const key = Object.keys(activeBoard.background).find(
        key => key !== '_id'
      );
      const activeBoardBG = activeBoard.background[key];
      if (!activeBoardBG) return;
      const screenWidth = window.innerWidth;
      const isRetina = window.devicePixelRatio > 1;

      let bgImageUrl = '';
      if (screenWidth >= 1280) {
        bgImageUrl =
          isRetina && activeBoardBG.desc2x
            ? activeBoardBG.desc2x
            : activeBoardBG.desc;
      } else if (screenWidth >= 768) {
        bgImageUrl =
          isRetina && activeBoardBG.tablet2x
            ? activeBoardBG.tablet2x
            : activeBoardBG.tablet;
      } else {
        bgImageUrl =
          isRetina && activeBoardBG.mobl2x
            ? activeBoardBG.mobl2x
            : activeBoardBG.mobl;
      }
      console.log(bgImageUrl);
      setBackgroundImage(bgImageUrl);
    }
  }, [activeBoard]);

  return (
    <main
      className={s.container}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      }}
    >
      <HeaderDashboard activeBoard={activeBoard}></HeaderDashboard>

      {activeBoard ? (
        <MainDashboard activeBoard={activeBoard} />
      ) : (
        <StartBoard />
      )}
    </main>
  );
};

export default ScreensPage;

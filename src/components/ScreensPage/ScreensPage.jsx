import { useSelector } from 'react-redux';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';

import StartBoard from '../StartBoard/StartBoard';
import s from './ScreensPage.module.css';
import { useEffect, useMemo, useState } from 'react';

import { selectBoardById, selectBoards } from '../../redux/boards/selectors';

const ScreensPage = () => {
  const boards = useSelector(selectBoards);
  let activeBoardId = useSelector(selectBoardById);

  const [backgroundImage, setBackgroundImage] = useState('');

  const activeBoard = useMemo(() => {
    if (boards.length > 0) {
      if (!activeBoardId) {
        return boards[0];
      }
      return boards.find(board => board._id === activeBoardId);
    }
    return null;
  }, [boards, activeBoardId]);

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

      {activeBoard || (boards.length > 0 && !activeBoardId) ? (
        <MainDashboard activeBoard={activeBoard || boards[0]} />
      ) : (
        <StartBoard />
      )}
    </main>
  );
};

export default ScreensPage;

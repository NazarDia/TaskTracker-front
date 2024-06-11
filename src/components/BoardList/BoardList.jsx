import { useDispatch, useSelector } from 'react-redux';
import SideBarCreateBoard from '../SideBarCreateBoard/SideBarCreateBoard';
import s from './BoardList.module.css';
import { setActiveBoard } from '../../redux/boards/boardSlice.js';
import { useEffect } from 'react';
import { fetchBoards, getBoardByID } from '../../redux/boards/operations.js';

export default function BoardList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);
  const boards = useSelector(state => state.boards.boards.items);

  const handleBoardClick = board => {
    dispatch(setActiveBoard(board));
    dispatch(getBoardByID(board._id));
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>My boards</h2>
      <SideBarCreateBoard />
      {boards.length > 0 ? (
        <ul className={s.boardList}>
          {boards.map(board => (
            <li key={board._id} onClick={() => handleBoardClick(board)}>
              {board.title}
            </li>
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
}

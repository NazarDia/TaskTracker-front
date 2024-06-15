import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import {
  fetchBoards,
  getBoardByID,
  deleteBoard,
} from '../../redux/boards/operations';
import { setActiveBoard } from '../../redux/boards/boardSlice';
import sprite from '../../images/sprite/sprite-icon.svg';
import GeneralModal from '../GeneralModal/GeneralModal';
import EditNewBoard from '../PopUps/EditBoard/EditBoard';
import { FaAngleRight } from 'react-icons/fa6';
import s from './SidebarBoardList.module.css';

export default function SidebarBoardList({ onClose }) {
  const dispatch = useDispatch();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState(null);
  const [showAllBoards, setShowAllBoards] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    dispatch(fetchBoards());

    const handleResize = () => setIsDesktop(window.innerWidth >= 1440);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const boards = useSelector(state => state.boards.boards.items);

  useEffect(() => {
    const activeBoardId = localStorage.getItem('activeBoard');
    if (activeBoardId && Array.isArray(boards)) {
      const activeBoard = boards.find(board => board?._id === activeBoardId);
      if (activeBoard) {
        setSelectedBoard(activeBoardId);
        dispatch(setActiveBoard(activeBoard));
        dispatch(getBoardByID(activeBoardId));
      }
    }
  }, [boards, dispatch]);

  const handleBoardClick = board => {
    if (board._id === selectedBoard) return;

    const boardId = board._id;
    setSelectedBoard(boardId);
    dispatch(setActiveBoard(board));
    dispatch(getBoardByID(boardId));
    localStorage.setItem('activeBoard', boardId);
    if (onClose) onClose();
  };

  const handleEditBoard = (e, board) => {
    e.stopPropagation();
    setBoardToEdit(board._id);
    setModalIsOpen(true);
  };

  const handleDeleteBoard = async (e, board) => {
    e.stopPropagation();
    await dispatch(deleteBoard(board._id));
    dispatch(fetchBoards());
    localStorage.removeItem('activeBoard');
    if (selectedBoard === board._id) setSelectedBoard(null);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBoardToEdit(null);
  };

  const handleMouseEnter = () => setShowAllBoards(true);
  const handleMouseLeave = () => setShowAllBoards(false);

  const renderBoardItem = (board, isActive) => {
    if (!board) return null;
    return (
      <li
        key={board._id}
        onClick={() => handleBoardClick(board)}
        className={`${s.boardItem} ${isActive ? s.active : ''}`}
      >
        <svg
          className={`${s.boardIcon} ${isActive ? s.checked : ''}`}
          width="18"
          height="18"
        >
          <use href={`${sprite}#${board.icon}`} />
        </svg>
        <span className={s.boardTitle}>{board.title}</span>
        <div className={`${s.iconButtons} ${isActive ? s.alwaysVisible : ''}`}>
          <button
            onClick={e => handleEditBoard(e, board)}
            className={s.editButton}
          >
            <svg width="16" height="16">
              <use href={`${sprite}#pencil`} />
            </svg>
          </button>
          <button
            onClick={e => handleDeleteBoard(e, board)}
            className={s.deleteButton}
          >
            <svg width="16" height="16">
              <use href={`${sprite}#trash`} />
            </svg>
          </button>
        </div>
      </li>
    );
  };

  const renderBoardList = useMemo(() => {
    if (!boards || boards.length === 0) return [];

    if (boards.length < 3) {
      const activeBoard = boards.find(board => board?._id === selectedBoard);
      const otherBoards = boards.filter(board => board?._id !== selectedBoard);
      return [activeBoard, ...otherBoards].filter(Boolean); // Remove any null/undefined
    }
    return boards;
  }, [boards, selectedBoard]);

  return (
    <>
      <div className={s.container}>
        {boards && boards.length > 0 ? (
          isDesktop ? (
            boards.length >= 3 ? (
              <div className={s.activeBoardContainer}>
                {selectedBoard &&
                  renderBoardItem(
                    boards.find(board => board?._id === selectedBoard),
                    true
                  )}
                <div
                  className={s.showAllBoards}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <p>Show all boards</p>
                  <FaAngleRight className={s.arrow} />
                  {showAllBoards && (
                    <div className={s.allBoardsMenu}>
                      <ul className={s.boardList}>
                        {boards.map(board => renderBoardItem(board, false))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <ul className={s.boardList}>
                {renderBoardList.map(board =>
                  renderBoardItem(board, selectedBoard === board._id)
                )}
              </ul>
            )
          ) : (
            <ul className={s.boardList}>
              {boards.map(board =>
                renderBoardItem(board, selectedBoard === board._id)
              )}
            </ul>
          )
        ) : (
          <div></div>
        )}
      </div>
      {modalIsOpen && (
        <GeneralModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit board"
        >
          <EditNewBoard boardId={boardToEdit} onClose={closeModal} />
        </GeneralModal>
      )}
    </>
  );
}

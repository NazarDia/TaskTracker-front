import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState(null);
  const [showAllBoards, setShowAllBoards] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);
  const [animateOut, setAnimateOut] = useState(false);

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
        navigate(`/home/${activeBoard._id}`);
      } else {
        navigate('/home');
      }
    }
  }, [boards, dispatch, navigate]);

  const handleBoardClick = board => {
    if (board._id === selectedBoard) return;

    const boardId = board._id;
    setSelectedBoard(boardId);
    dispatch(setActiveBoard(board));
    dispatch(getBoardByID(boardId));
    localStorage.setItem('activeBoard', boardId);
    navigate(`/home/${board.title}`);
    if (onClose) onClose();
  };

  const handleEditBoard = (e, board) => {
    e.stopPropagation();
    setBoardToEdit(board._id);
    setModalIsOpen(true);

    if (board._id !== selectedBoard) {
      setSelectedBoard(board.title);
      dispatch(setActiveBoard(board));
      // dispatch(getBoardByID(board._id));
      localStorage.setItem('activeBoard', board._id);
      navigate(`/home/${board.title}`);
    }
  };

  const handleDeleteBoard = async (e, board) => {
    e.stopPropagation();
    dispatch(deleteBoard(board._id));
    // dispatch(fetchBoards());

    localStorage.removeItem('activeBoard');

    if (selectedBoard === board._id) {
      if (boards.length === 0) {
        setSelectedBoard(null);
        navigate(`/home`);
      } else {
        setSelectedBoard(boards[0]._id);
        dispatch(setActiveBoard(boards[0]));
        // dispatch(getBoardByID(boards[0]._id));
        localStorage.setItem('activeBoard', boards[0]._id);
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBoardToEdit(null);
  };

  const handleMouseEnter = () => {
    setAnimateOut(false);
    setShowAllBoards(true);
  };
  const handleMouseLeave = () => {
    setAnimateOut(true);
    setTimeout(() => setShowAllBoards(false), 0);
  };

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
      return [activeBoard, ...otherBoards].filter(Boolean);
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
                  {(showAllBoards || animateOut) && (
                    <div
                      className={`${s.allBoardsMenu} ${
                        animateOut ? s.slideOut : s.slideIn
                      }`}
                    >
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

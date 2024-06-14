import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  fetchBoards,
  getBoardByID,
  deleteBoard,
} from '../../redux/boards/operations';
import { setActiveBoard } from '../../redux/boards/boardSlice';
import sprite from '../../images/sprite/sprite-icon.svg';
import GeneralModal from '../GeneralModal/GeneralModal';
import EditNewBoard from '../PopUps/EditBoard/EditBoard';
import s from './SidebarBoardList.module.css';

export default function SidebarBoardList() {
  const dispatch = useDispatch();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const boards = useSelector(state => state.boards.boards.items);

  useEffect(() => {
    const activeBoardId = localStorage.getItem('activeBoard');
    if (activeBoardId && Array.isArray(boards)) {
      const activeBoard = boards.find(board => board._id === activeBoardId);
      if (activeBoard) {
        setSelectedBoard(activeBoardId);
        dispatch(setActiveBoard(activeBoard));
        dispatch(getBoardByID(activeBoardId));
      }
    }
  }, [boards, dispatch]);

  const handleBoardClick = board => {
    const boardId = board._id === selectedBoard ? null : board._id;
    setSelectedBoard(boardId);
    if (boardId) {
      dispatch(setActiveBoard(board));
      dispatch(getBoardByID(boardId));
      localStorage.setItem('activeBoard', boardId);
    } else {
      localStorage.removeItem('activeBoard');
    }
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
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBoardToEdit(null);
  };

  return (
    <>
      <div className={s.container}>
        {boards && boards.length > 0 ? (
          <ul className={s.boardList}>
            {boards.map(board => (
              <li
                key={board._id}
                onClick={() => handleBoardClick(board)}
                className={`${s.boardItem} ${
                  selectedBoard === board._id ? s.active : ''
                }`}
              >
                <svg
                  className={`${s.boardIcon} ${
                    selectedBoard === board._id ? s.checked : ''
                  }`}
                  width="18"
                  height="18"
                >
                  <use href={`${sprite}#${board.icon}`} />
                </svg>
                <span className={s.boardTitle}>{board.title}</span>
                {selectedBoard === board._id && (
                  <div className={s.iconButtons}>
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
                )}
              </li>
            ))}
          </ul>
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

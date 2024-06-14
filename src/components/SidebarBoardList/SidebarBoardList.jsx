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

  const handleBoardClick = board => {
    setSelectedBoard(board._id === selectedBoard ? null : board._id);
    dispatch(setActiveBoard(board));
    dispatch(getBoardByID(board._id));
  };

  const handleEditBoard = board => {
    setBoardToEdit(board._id);
    setModalIsOpen(true);
  };

  const handleDeleteBoard = async board => {
    await dispatch(deleteBoard(board._id));
    dispatch(fetchBoards());
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBoardToEdit(null);
  };

  return (
    <>
      <div className={s.container}>
        {boards.length > 0 ? (
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
                      onClick={() => handleEditBoard(board)}
                      className={`${s.editButton} ${
                        selectedBoard === board._id ? s.checked : ''
                      }`}
                    >
                      <svg width="16" height="16">
                        <use href={`${sprite}#pencil`} />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteBoard(board)}
                      className={`${s.deleteButton} ${
                        selectedBoard === board._id ? s.checked : ''
                      }`}
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

import { useDispatch } from 'react-redux';
import s from './TaskColumn.module.css';
import { deleteColumn } from '../../redux/columns/operations';

import sprite from '../../images/sprite/sprite-icon.svg';
import CardsList from '../CardsList/CardsList';
import { CardButton } from '../PopUps/CardButton/CardButton';

import GeneralModal from '../GeneralModal/GeneralModal';
import { useState } from 'react';
import EditColumn from '../PopUps/EditColumn/EditColumn';
import { getBoardByID } from '../../redux/boards/operations';
import PopUpAddCard from '../PopUps/AddCard/AddCard';

const TaskColumn = ({ column }) => {
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    dispatch(getBoardByID(column.boardId));
  };

  const openAddCardModal = () => setIsAddCardModalOpen(true);
  const closeAddCardModal = () => {
    setIsAddCardModalOpen(false);
    dispatch(getBoardByID(column.boardId));
  };
  const columnId = column._id;
  const boardId = column.boardId;

  const deleteCol = () => dispatch(deleteColumn({ columnId, boardId }));

  return (
    <div className={s.columnWrapper}>
      <div className={s.container}>
        <h4 className={s.columnTitle}>{column.title}</h4>
        <div className={s.btnWrapper}>
          <button onClick={openEditModal} className={s.columnBtn}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#pencil`}></use>
            </svg>
          </button>
          <button onClick={deleteCol} className={s.columnBtn}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#trash`}></use>
            </svg>
          </button>
        </div>
      </div>
      <CardsList column={column}></CardsList>
      <CardButton
        btnText={'Add another card'}
        onClick={openAddCardModal}
      ></CardButton>
      <GeneralModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Column"
      >
        <EditColumn onClose={closeEditModal} column={column} />
      </GeneralModal>

      <GeneralModal
        isOpen={isAddCardModalOpen}
        onRequestClose={closeAddCardModal}
        contentLabel="Add another card"
      >
        <PopUpAddCard onClose={closeAddCardModal} column={column} />
      </GeneralModal>
    </div>
  );
};

export default TaskColumn;

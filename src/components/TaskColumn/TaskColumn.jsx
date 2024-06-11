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

const TaskColumn = ({ column }) => {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    dispatch(getBoardByID(column.boardId));
  };
  const columnId = column._id;
  const boardId = column.boardId;

  const deleteCol = () => dispatch(deleteColumn({ columnId, boardId }));

  console.log(deleteCol);

  return (
    <>
      <div className={s.container}>
        <h4 className={s.columnTitle}>{column.title}</h4>
        <div className={s.btnWrapper}>
          <button onClick={openModal} className={s.columnBtn}>
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
      <CardButton btnText={'Add another card'}></CardButton>
      <GeneralModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Column"
      >
        <EditColumn onClose={closeModal} columnId={columnId} />
      </GeneralModal>
    </>
  );
};

export default TaskColumn;

<svg width={20} height={20} className={s.icon}>
  <use href={`${sprite}#filter`}></use>
</svg>;

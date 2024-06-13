import s from './Card.module.css';
import sprite from '../../images/sprite/sprite-icon.svg';

import GeneralModal from '../GeneralModal/GeneralModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBoardByID } from '../../redux/boards/operations';
import PopUpEditCard from '../PopUps/EditCard/EditCard';
import { deleteCard } from '../../redux/cards/operations';

const Card = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalEditOpen, setModaEditlIsOpen] = useState(false);
  const [isModalMoveOpen, setModalMoveIsOpen] = useState(false);
  const openEditModal = () => setModaEditlIsOpen(true);

  const closeEditModal = () => {
    setModaEditlIsOpen(false);
    dispatch(getBoardByID(task.boardId));
  };

  const openMoveModal = () => setModalMoveIsOpen(true);
  const closeMoveModal = () => {
    setModalMoveIsOpen(false);
    dispatch(getBoardByID(task.boardId));
  };

  const backgroundColor = `#${task.color}`;
  const getPriority = color => {
    switch (color.toUpperCase()) {
      case 'B9B9B9':
        return 'without';
      case 'E09CB5':
        return 'medium';
      case '8FA1D0':
        return 'low';
      case 'BEDBB0':
        return 'high';
      default:
        return 'unknown';
    }
  };
  const priority = getPriority(task.color);
  const taskId = task._id;
  const columnId = task.columnId;
  const boardId = task.boardId;

  const deleteTask = () => dispatch(deleteCard({ taskId, columnId, boardId }));

  return (
    <div className={s.container}>
      <div className={s.contentWrapper}>
        <h3 className={s.cardTitle}>{task.title}</h3>
        <p className={s.taskDescr}>{task.description}</p>
      </div>
      <div className={s.cardBottomnContent}>
        <div className={s.cardextraWrapper}>
          <div className={s.exraItem}>
            <p className={s.extraItemTitle}>Priority</p>
            <div className={s.priorityWrapper}>
              <span
                className={s.extraPriority}
                style={{ backgroundColor: backgroundColor }}
              ></span>
              <span className={s.extraItemContent}>{priority}</span>
            </div>
          </div>
          <div className={s.exraItem}>
            <p className={s.extraItemTitle}>Deadline</p>
            <p className={s.extraItemContent}>{task.deadline}</p>
          </div>
        </div>
        <div className={s.cardBtnWrapper}>
          <button className={s.cardBtn}>
            <svg
              width={16}
              height={16}
              className={s.icon}
              onClick={openMoveModal}
            >
              <use href={`${sprite}#broken-right`}></use>
            </svg>
          </button>
          <button className={s.cardBtn} onClick={openEditModal}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#pencil`}></use>
            </svg>
          </button>
          <button className={s.cardBtn} onClick={deleteTask}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#trash`}></use>
            </svg>
          </button>
        </div>
      </div>

      <GeneralModal
        isOpen={isModalEditOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Task"
      >
        <PopUpEditCard card={task} onClose={closeEditModal}></PopUpEditCard>
      </GeneralModal>
      <GeneralModal
        isOpen={isModalMoveOpen}
        onRequestClose={closeMoveModal}
        contentLabel="Edit Task"
      >
        <PopUpEditCard card={task} onClose={closeMoveModal}></PopUpEditCard>
      </GeneralModal>
    </div>
  );
};

export default Card;

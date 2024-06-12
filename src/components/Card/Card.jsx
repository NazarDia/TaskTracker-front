import s from './Card.module.css';
import sprite from '../../images/sprite/sprite-icon.svg';
import GeneralModal from '../../components/GeneralModal/GeneralModal';
import EditCard from '../PopUps/EditCard/EditCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBoardByID } from '../../redux/boards/operations';
import PopUpEditCard from '../PopUps/EditCard/EditCard';
import { deleteCard } from '../../redux/cards/operations';

const Card = ({ task }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = task => {
    setSelectedCard(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalIsOpen(false);
    dispatch(getBoardByID(task.boardId));
  };

  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
              <span className={s.extraItemContent}>{task.color}</span>
            </div>
          </div>
          <div className={s.exraItem}>
            <p className={s.extraItemTitle}>Deadline</p>
            <p className={s.extraItemContent}>{task.deadline}</p>
          </div>
        </div>
        <div className={s.cardBtnWrapper}>
          <button className={s.cardBtn}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#broken-right`}></use>
            </svg>
          </button>
          <button className={s.cardBtn} onClick={() => openModal(task)}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#pencil`}></use>
            </svg>
          </button>
          <GeneralModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Card"
          >
            {selectedCard && (
              <EditCard card={selectedCard} onClose={closeModal} />
            )}
          </GeneralModal>
          <button className={s.cardBtn}>
            <svg width={16} height={16} className={s.icon}>
              <use href={`${sprite}#trash`}></use>
            </svg>
          </button>
        </div>
      </div>

      <GeneralModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Task"
      >
        <PopUpEditCard card={task} onClose={closeModal}></PopUpEditCard>
      </GeneralModal>
    </div>
  );
};

export default Card;

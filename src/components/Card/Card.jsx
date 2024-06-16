import s from './Card.module.css';
import sprite from '../../images/sprite/sprite-icon.svg';

import GeneralModal from '../GeneralModal/GeneralModal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBoardByID } from '../../redux/boards/operations';
import PopUpEditCard from '../PopUps/EditCard/EditCard';
import { deleteCard } from '../../redux/cards/operations';
import MoveCard from '../PopUps/MoveCard/MoveCard';
import { getAllColumns } from '../../redux/columns/operations';

const Card = ({ task, index }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timeout);
  }, [index]);

  const [isModalEditOpen, setModaEditlIsOpen] = useState(false);

  const openEditModal = () => setModaEditlIsOpen(true);
  const closeEditModal = () => {
    setModaEditlIsOpen(false);
    dispatch(getBoardByID(task.boardId));
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    dispatch(getAllColumns());
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
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

  const hoverStyle = {
    boxShadow: `2px 6px 8px ${backgroundColor}`,
    transform: 'scale(101%)',
  };

  const toDeadLine = date => {
    const deadline = new Date(date);
    const now = new Date();
    const timeDifference = deadline - now;
    const daysLeft = timeDifference / (1000 * 3600 * 24);

    return daysLeft;
  };

  return (
    <div
      className={`${s.container} ${isVisible ? s.visible : ''} ${
        s.hoverEffect
      }`}
      style={{ borderLeftColor: backgroundColor }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
        e.currentTarget.style.transform = hoverStyle.transform;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.transform = '';
      }}
    >
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
          {toDeadLine(task.deadline) <= 1 && (
            <div className={s.cardBtn}>
              <svg width={16} height={16} className={`${s.icon} ${s.cardBell}`}>
                <use href={`${sprite}#bell`}></use>
              </svg>
            </div>
          )}
          <button className={s.cardBtn} onClick={toggleDropdown}>
            <svg width={16} height={16} className={s.icon}>
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
        {isDropdownOpen && (
          <div className={s.dropdownWrapper}>
            <MoveCard card={task} onClose={closeDropdown} />
          </div>
        )}
      </div>

      <GeneralModal
        isOpen={isModalEditOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Task"
      >
        <PopUpEditCard card={task} onClose={closeEditModal}></PopUpEditCard>
      </GeneralModal>
    </div>
  );
};

export default Card;

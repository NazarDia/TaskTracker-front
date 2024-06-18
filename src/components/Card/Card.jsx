import s from './Card.module.css';
import sprite from '../../images/sprite/sprite-icon.svg';

import GeneralModal from '../GeneralModal/GeneralModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardByID } from '../../redux/boards/operations';
import PopUpEditCard from '../PopUps/EditCard/EditCard';
import { deleteCard } from '../../redux/cards/operations';
import MoveCard from '../PopUps/MoveCard/MoveCard';
import { getAllColumns } from '../../redux/columns/operations';
import { selectCurrentBoard } from '../../redux/boards/selectors';

const Card = ({ task }) => {
  const dispatch = useDispatch();

  const currentBoard = useSelector(selectCurrentBoard);
  const columnsLength = currentBoard.columns.length;

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
  const closeLeaveDropdown = () => {
    setDropdownOpen(false);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    dispatch(getBoardByID(task.boardId));
  };

  const getPriority = label => {
    switch (label) {
      case 'without priority':
        return 'B9B9B9';
      case 'medium':
        return 'E09CB5';
      case 'low':
        return '8FA1D0';
      case 'high':
        return 'BEDBB0';
      default:
        return 'without priority';
    }
  };
  const priority = getPriority(task.label);
  const backgroundColor = `#${priority}`;

  const taskId = task._id;
  const columnId = task.columnId;
  const boardId = task.boardId;

  const deleteTask = () => dispatch(deleteCard({ taskId, columnId, boardId }));

  const hoverStyle = {
    boxShadow: `0px 1px 4px ${backgroundColor}`,
    transform: 'scale(101%)',
  };

  const toDeadLine = date => {
    const deadline = new Date(date);
    const now = new Date();
    const timeDifference = deadline - now;
    const daysLeft = timeDifference / (1000 * 3600 * 24);

    return daysLeft;
  };

  const [showFullText, setShowFullText] = useState(false);
  const handleClick = () => {
    setShowFullText(!showFullText);
  };
  const handleTextOverflow = text => {
    const shouldTextBeHidden = text.length >= 88;

    if (shouldTextBeHidden) {
      return `${text.slice(0, 88)}...`;
    } else {
      return text;
    }
  };

  return (
    <div
      className={`${s.container} ${s.hoverEffect}`}
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

        <p className={s.taskDescr} onClick={handleClick}>
          {showFullText
            ? task.description
            : handleTextOverflow(task.description)}
        </p>
      </div>
      <div className={s.cardBottomnContent} onMouseLeave={closeLeaveDropdown}>
        <div className={s.cardextraWrapper}>
          <div className={s.exraItem}>
            <p className={s.extraItemTitle}>Priority</p>
            <div className={s.priorityWrapper}>
              <span
                className={s.extraPriority}
                style={{ backgroundColor: backgroundColor }}
              ></span>
              <span className={s.extraItemContent}>{task.label}</span>
            </div>
          </div>
          <div className={s.exraItem}>
            <p className={s.extraItemTitle}>Deadline</p>
            <p className={s.extraItemContent}>{task.deadline}</p>
          </div>
        </div>
        <div className={s.cardBtnWrapper}>
          {toDeadLine(task.deadline) <= 1 && (
            <div className={`${s.cardBtn} ${s.cardBellWrapper}`}>
              <svg width={16} height={16} className={`${s.icon} ${s.cardBell}`}>
                <use href={`${sprite}#bell`}></use>
              </svg>
              <span className={s.bellSpan}></span>
            </div>
          )}
          {columnsLength >= 2 && (
            <button className={s.cardBtn} onClick={toggleDropdown}>
              <svg width={16} height={16} className={s.icon}>
                <use href={`${sprite}#broken-right`}></use>
              </svg>
            </button>
          )}
          {isDropdownOpen && <MoveCard card={task} onClose={closeDropdown} />}
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
    </div>
  );
};

export default Card;

import s from './ColumnStatus.module.css';
import AddColumn from '../PopUps/AddColumn/AddColumn';
import { useState } from 'react';
import GeneralModal from '../GeneralModal/GeneralModal';
import { useSelector } from 'react-redux';
import { selectOneBoard } from '../../redux/boards/selectors';
import { CardButton } from '../PopUps/CardButton/CardButton';

const ColumnStatus = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const currentBoard = useSelector(selectOneBoard);

  return (
    <div className={s.container}>
      <CardButton
        onClick={openModal}
        btnText={'Add another column'}
      ></CardButton>
      <GeneralModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add another column"
      >
        <AddColumn boardId={currentBoard._id} closeModal={closeModal} />
      </GeneralModal>
    </div>
  );
};

export default ColumnStatus;

import { useState } from 'react';

import GeneralModal from '../GeneralModal/GeneralModal';
import NewBoard from '../PopUps/NewBoard/NewBoard';

import sprite from '../../images/sprite/sprite-icon.svg';
import s from './SideBarCreateBoard.module.css';

export default function SideBarCreateBoard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={s.container}>
      <p className={s.text}>Create a new board</p>
      <button className={s.btn} onClick={openModal}>
        <svg width={20} height={20} stroke="var(--sidebar-btn-icon)">
          <use href={`${sprite}#icon-plus`}></use>
        </svg>
      </button>

      <GeneralModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="New board"
      >
        <NewBoard closeModal={closeModal} />
      </GeneralModal>
    </div>
  );
}

import { useState } from 'react';

import GeneralModal from '../GeneralModal/GeneralModal';
import NeedHelpModal from '../PopUps/NeedHelpModal/NeedHelpModal';

import sprite from '../../images/sprite/sprite-icon.svg';
import s from './NeedHelp.module.css';

export default function NeedHelp() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={s.container}>
      <div className={s.img}></div>
      <p className={s.text}>
        If you need help with <span>TaskPro</span>, check out our support
        resources or reach out to our customer support team.
      </p>
      <button className={s.btn} onClick={openModal}>
        <svg width={20} height={20} className={s.icon}>
          <use href={`${sprite}#need-help`}></use>
        </svg>
        <p>Need help?</p>
      </button>

      <GeneralModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Need help"
      >
        <NeedHelpModal closeModal={closeModal} />
      </GeneralModal>
    </div>
  );
}

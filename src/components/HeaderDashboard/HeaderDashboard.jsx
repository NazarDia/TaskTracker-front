import s from './HeaderDashboard.module.css';
import sprite from '../../images/sprite/sprite-icon.svg';

import GeneralModal from '../GeneralModal/GeneralModal';
import Filters from '../PopUps/Filters/Filters';
import { useState } from 'react';

const HeaderDashboard = ({ activeBoard }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className={s.headerWrapper}>
      <p className={s.boardTitle}>{activeBoard ? activeBoard.title : ''}</p>
      <div className={s.filterWrapper} onClick={openModal}>
        <svg width={20} height={20} className={s.icon}>
          <use href={`${sprite}#filter`}></use>
        </svg>
        <p className={s.filtersPar}>Filters</p>
      </div>
      <GeneralModal
        isOpen={isFilterModalOpen}
        onRequestClose={closeModal}
        contentLabel="Filters"
      >
        <Filters onRequestClose={closeModal} />
      </GeneralModal>
    </div>
  );
};

export default HeaderDashboard;

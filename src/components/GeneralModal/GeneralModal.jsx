import Modal from 'react-modal';

import sprite from '../../images/sprite/sprite-icon.svg';
import s from './GeneralModal.module.css';

Modal.setAppElement('#root');

export default function GeneralModal({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <button className={s.closeButton} onClick={onRequestClose}>
        <svg width={18} height={18} stroke="#161616">
          <use href={`${sprite}#close`}></use>
        </svg>
      </button>

      <div className={s.content}>{children}</div>
    </Modal>
  );
}

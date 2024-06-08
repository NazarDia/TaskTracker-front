import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import NewBoard from "./NewBoard";
import { IoClose } from "react-icons/io5";
import styles from "./ModalNewBoard.module.css";

export default function ModalNewBoard({ openNewBoardModal }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    const handleKeyDown = (evt) => {
      if (evt.code === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    openNewBoardModal();
  };

  return (
    <Modal
      isOpen={isOpen} 
      onRequestClose={closeModal}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
       <button onClick={closeModal} className={styles.closeBtn}>
        <IoClose className={styles.closeSvg}/>
      </button>
      <h2 className={styles.title}>New board</h2>
      <div className={styles.formContainer}>
        <NewBoard closeModal={closeModal}/>
      </div>
    </Modal>
  );
}

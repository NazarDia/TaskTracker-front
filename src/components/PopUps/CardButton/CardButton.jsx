import styles from './CardButton.module.css';
import { FiPlus } from 'react-icons/fi';

export const CardButton = ({ btnText, onClick }) => {
  return (
    <button type="submit" className={styles.addBtn} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <FiPlus className={styles.svg} />
      </div>
      <span className={styles.btnTextWrap}>{btnText}</span>
    </button>
  );
};

import styles from "./CardButton.module.css"; 
import { FiPlus } from "react-icons/fi";

export const CardButton = ({ btnText }) => {
  return (
    <button type="submit" className={styles.addBtn}>
      <div className={styles.iconWrapper}>
        <FiPlus className={styles.svg} />
      </div>
      <span className={styles.btnTextWrap}>{btnText}</span>
    </button>
  );
};

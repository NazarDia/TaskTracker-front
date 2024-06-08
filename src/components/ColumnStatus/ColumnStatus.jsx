import s from './ColumnStatus.module.css';
import AddColumn from '../PopUps/AddColumn/AddColumn';
import { useState } from 'react';

const ColumnStatus = () => {
  const [isAddColumnVisible, setIsAddColumnVisible] = useState(false);

  const handleButtonClick = () => {
    setIsAddColumnVisible(false);
  };
  return (
    <div className={s.container}>
      <div className={s.icons}>
        <button onClick={handleButtonClick}>Add Column</button>
      </div>
      <p className={s.statusPar}>Add another column</p>
      {isAddColumnVisible && <AddColumn />}
    </div>
  );
};

export default ColumnStatus;

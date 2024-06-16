import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import s from './CardsList.module.css';
import { selectFilteredCards } from '../../redux/filters/selector';

const CardsList = ({ column }) => {
  // const currentPriority = useSelector(selectFilteredCards);

  console.log(column);

  return (
    <div className={s.container}>
      <ul className={s.columnList}>
        {
          <li key={column._id} className={s.listItem}>
            <Card task={column} />
          </li>
        }
      </ul>
    </div>
  );
};

export default CardsList;

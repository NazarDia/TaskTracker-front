import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import s from './CardsList.module.css';
import { selectPriorityFilter } from '../../redux/filters/selector';

const CardsList = ({ column }) => {
  const currentPriority = useSelector(selectPriorityFilter);

  console.log(currentPriority);
  console.log(column);
  const tasks = column.tasks;
  return (
    <div className={s.container}>
      <ul className={s.columnList}>
        {tasks.map((task, index) => (
          <li key={task._id} className={s.listItem}>
            <Card task={task} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardsList;

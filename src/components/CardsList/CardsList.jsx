import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectPriorityFilter } from '../../redux/filters/selector';
import Card from '../Card/Card';
import s from './CardsList.module.css';

const CardsList = ({ column }) => {
  const currentPriority = useSelector(selectPriorityFilter);

  const filteredTasksByPriority = useMemo(() => {
    if (currentPriority === 'all') return column.tasks;
    const normalizedColor = currentPriority.toLowerCase();

    const columnTasks = column.tasks.filter(el => el.label === normalizedColor);
    return columnTasks;
  }, [column, currentPriority]);

  return (
    <ul className={s.cardList}>
      {filteredTasksByPriority.map((task, index) => (
        <li key={task._id} className={s.listItem}>
          <Card task={task} index={index} />
        </li>
      ))}
    </ul>
  );
};

export default CardsList;

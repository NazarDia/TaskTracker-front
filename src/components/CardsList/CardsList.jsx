import { useMemo } from 'react';
import Card from '../Card/Card';
import s from './CardsList.module.css';
import { useSelector } from 'react-redux';

const CardsList = ({ column }) => {
  const currentPriority = useSelector(selectPriorityFilter);

  const filteredTasksByPriority = useMemo(() => {
    if (currentPriority === 'all') return column.tasks;
    const normalizedColor = currentPriority.toUpperCase().slice(1);

    const columnTasks = column.tasks.filter(el => el.color === normalizedColor);
    return columnTasks;
  }, [column, currentPriority]);

  return (
    <div className={s.container}>
      <ul className={s.columnList}>
        {filteredTasksByPriority.map((task, index) => (
          <li key={task._id} className={s.listItem}>
            <Card task={task} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardsList;

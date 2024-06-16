import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import s from './CardsList.module.css';
import { selectPriorityFilter } from '../../redux/filters/selector';
import { useMemo } from 'react';

const CardsList = ({ column }) => {
  const currentPriority = useSelector(selectPriorityFilter);

  const filteredTasksByPriority = useMemo(() => {
    if (currentPriority === 'all') return column.tasks;
    const normalizedColor = currentPriority.toUpperCase().slice(1);

    const columnTasks = column.tasks.filter(el => el.color === normalizedColor);
    return columnTasks;
  }, [column, currentPriority]);
  // const tasksArr = tasks
  //   .map(task => {
  //     if (currentPriority === 'ALL') {
  //       return task;
  //     }
  //     return task.color === currentPriority ? task : null;
  //   })
  //   .filter(task => task !== null);
  // console.log(tasksArr);
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

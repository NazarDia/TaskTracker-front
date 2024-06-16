import Card from '../Card/Card';
import s from './CardsList.module.css';

const CardsList = ({ column }) => {
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

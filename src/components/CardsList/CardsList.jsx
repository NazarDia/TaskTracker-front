import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import s from './CardsList.module.css';
import { selectFilteredCards } from '../../redux/filters/selector';

const CardsList = ({ column }) => {
  const currentPriority = useSelector(selectFilteredCards);
  const tasks = column.tasks;
  // console.log(currentPriority);
  // console.log(column.tasks);

  return (
    <div className={s.container}>
      <ul className={s.columnList}>
        {tasks.map(task => (
          <li key={task._id} className={s.listItem}>
            <Card task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardsList;

// const CardsList = ({ column }) => {
//   const tasks = useSelector(selectFilteredCards);
//   console.log(tasks);

//   return (
//     <div className={s.container}>
//       <ul className={s.columnList}>
//         {tasks.map(task => (
//           <li key={task._id} className={s.listItem}>
//             <Card task={task} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CardsList;

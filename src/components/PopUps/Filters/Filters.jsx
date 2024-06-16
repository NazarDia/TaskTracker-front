import { useDispatch, useSelector } from 'react-redux';
import { setPriorityFilter } from '../../../redux/filters/slice';
import { selectPriorityFilter } from '../../../redux/filters/selector';
import s from './Filters.module.css';

const Filters = ({ onRequestClose }) => {
  const dispatch = useDispatch();
  const currentPriority = useSelector(selectPriorityFilter);

  console.log(currentPriority);

  const handlePriorityChange = priority => {
    dispatch(setPriorityFilter(priority));
    onRequestClose();
  };

  const handleShowAll = () => {
    dispatch(setPriorityFilter('all'));
    onRequestClose();
  };
  return (
    <div className={s.filtersModal}>
      <h3 className={s.title}>Filters</h3>
      <button className={s.showAllButton} onClick={handleShowAll}>
        Show all
      </button>
      <div className={s.priorityFilter}>
        <p>Label color</p>
        <div>
          <label className={s.high}>
            <input
              type="radio"
              name="priority"
              value="#8fa1d0"
              checked={currentPriority === '#8fa1d0'}
              onChange={() => handlePriorityChange('#8fa1d0')}
            />
            High
          </label>
          <label className={s.medium}>
            <input
              type="radio"
              name="priority"
              value="#e09cb5"
              checked={currentPriority === '#e09cb5'}
              onChange={() => handlePriorityChange('#e09cb5')}
            />
            Medium
          </label>
          <label className={s.low}>
            <input
              type="radio"
              name="priority"
              value="#bedbb0"
              checked={currentPriority === '#bedbb0'}
              onChange={() => handlePriorityChange('#bedbb0')}
            />
            Low
          </label>
          <label className={s.none}>
            <input
              type="radio"
              name="priority"
              value="none"
              checked={currentPriority === 'none'}
              onChange={() => handlePriorityChange('none')}
            />
            Without priority
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;

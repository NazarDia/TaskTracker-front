import { useDispatch, useSelector } from 'react-redux';
import { setPriorityFilter } from '../../../redux/filters/slice';
import { selectPriorityFilter } from '../../../redux/filters/selector';
import s from './Filters.module.css';

const Filters = ({ onRequestClose }) => {
  const dispatch = useDispatch();
  const currentPriority = useSelector(selectPriorityFilter);

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
              value="low"
              checked={currentPriority === 'low'}
              onChange={() => handlePriorityChange('low')}
            />
            Low
          </label>
          <label className={s.medium}>
            <input
              type="radio"
              name="priority"
              value="medium"
              checked={currentPriority === 'medium'}
              onChange={() => handlePriorityChange('medium')}
            />
            Medium
          </label>
          <label className={s.low}>
            <input
              type="radio"
              name="priority"
              value="heit"
              checked={currentPriority === 'high'}
              onChange={() => handlePriorityChange('high')}
            />
            High
          </label>
          <label className={s.none}>
            <input
              type="radio"
              name="priority"
              value="without priority"
              checked={currentPriority === 'without priority'}
              onChange={() => handlePriorityChange('without priority')}
            />
            Without priority
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;

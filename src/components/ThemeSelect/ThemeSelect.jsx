import s from './ThemeSelect.module.css';
import icon from '../../images/sprite/sprite-icon.svg';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/auth/operations';
import { useUserData } from '../../hooks/useUserData';

const ThemeSelect = ({ option = [], placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userTheme } = useUserData();

  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = evt => {
      if (isOpen && ref.current && !ref.current.contains(evt.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  const handlerIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handlerSelectedOption = ({ target }) => {
    const newTheme = target.textContent.toLowerCase();
    if (newTheme === userTheme) return;

    dispatch(changeTheme({ userTheme: newTheme }));

    setIsOpen(false);
  };

  return (
    <div className={s.select} ref={ref}>
      <button className={s.select_btn} onClick={handlerIsOpen}>
        {/* {!selectedOption
            ? placeholder && typeof placeholder === 'string'
              ? placeholder
              : 'Select'
            : selectedOption} */}
        {placeholder}

        <svg width={16} height={16}>
          <use href={`${icon}#chevron-down`}></use>
        </svg>
      </button>
      {isOpen && (
        <ul className={s.select_content}>
          {option.map((el, index) => (
            <li key={index}>
              <button
                className={`${s.select_item} 
                ${el.toLowerCase() === userTheme ? s.selected_item : ''}  `}
                onClick={handlerSelectedOption}
              >
                {el}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSelect;
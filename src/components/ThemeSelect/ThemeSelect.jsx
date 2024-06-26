import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/auth/operations';
import s from './ThemeSelect.module.css';
import icon from '../../images/sprite/sprite-icon.svg';

const ThemeSelect = ({ option = [], placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userTheme = useSelector(state => state.auth.user.theme);

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
    const newTheme = target.textContent;
    if (newTheme === userTheme) return;
    dispatch(changeTheme({ theme: newTheme }));
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    setIsOpen(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', userTheme);
  }, [userTheme]);

  return (
    <div className={s.select} ref={ref}>
      <button className={s.select_btn} onClick={handlerIsOpen}>
        {placeholder}
        <svg width="16" height="16" className={s.svg}>
          <use href={`${icon}#chevron-down`}></use>
        </svg>
      </button>
      {isOpen && (
        <ul className={s.select_content}>
          {option.map((el, index) => (
            <li key={index}>
              <button
                className={`${s.select_item} 
                ${el === userTheme ? s.selected_item : ''}`}
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

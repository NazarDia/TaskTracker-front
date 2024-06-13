import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import sprite from '../../images/sprite/sprite-icon.svg';

import s from './LogoutBtn.module.css';

export default function LogoutBtn() {
  const dispatch = useDispatch();

  return (
    <button
      className={s.logoutBtn}
      type="button"
      onClick={() => dispatch(logout())}
    >
      <svg width={32} height={32}>
        <use href={`${sprite}#log-out`}></use>
      </svg>
      <p>Log out</p>
    </button>
  );
}

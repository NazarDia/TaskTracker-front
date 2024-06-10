import { useUserData } from '../../hooks/useUserData';
import s from '../UserInfo/UserInfo.module.css';
import icon from '../../images/sprite/sprite-icon.svg';

const UserInfo = ({ onClick }) => {
  const user = useUserData();

  return (
    <div className={s.userInfoContainer}>
      <p className={s.profile}>{user.name}</p>

      <button className={s.profile_btn} onClick={onClick}>
        <svg height={29} width={32}>
          <use href={`${icon}#icon-user-ico`}></use>
        </svg>
      </button>
    </div>
  );
};

export default UserInfo;

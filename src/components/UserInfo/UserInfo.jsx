import { useUserData } from '../../hooks/useUserData';
import s from '../UserInfo/UserInfo.module.css';
import icon from '../../images/sprite/sprite-icon.svg';

const UserInfo = ({ handlerClick }) => {
  const user = useUserData();

  return (
    <div>
      <span className={s.profile}>{user.name}</span>

      <svg height={29} width={32}>
        <use href={`${icon}#icon-user-ico`}></use>
        onClick={handlerClick}
      </svg>
    </div>
  );
};

export default UserInfo;

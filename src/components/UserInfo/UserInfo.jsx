import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/auth/selectors';
import s from '../UserInfo/UserInfo.module.css';
// import icon from '../../images/sprite/icons.svg';

const UserInfo = ({ onEditProfile }) => {
  const user = useSelector(selectUserData);

  return (
    <div className={s.userInfoContainer}>
      <button className={s.userName}>{user.name}</button>
      <svg height={68} width={68}>
        {/* <use href={`${icon}#icon-user`}></use> */}
        onClick={onEditProfile}
      </svg>
    </div>
  );
};

export default UserInfo;

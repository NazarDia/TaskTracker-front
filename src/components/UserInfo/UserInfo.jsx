import { useUserData } from '../../hooks/useUserData';
import { useTheme } from '../../hooks/useTheme';
import s from '../UserInfo/UserInfo.module.css';

const defaultAvatars = {
  Light:
    'https://res.cloudinary.com/dshslvnpv/image/upload/v1718476246/avatar/jhzzokkqmyggxvkhr0rk.png',
  Violet:
    'https://res.cloudinary.com/dshslvnpv/image/upload/v1718476246/avatar/evq1fop5y2g61v4qmrdb.png',
  Dark: 'https://res.cloudinary.com/dshslvnpv/image/upload/v1718476246/avatar/uktinzlwlux9jedzsz6s.png',
};

const UserInfo = ({ onClick }) => {
  const user = useUserData();
  const theme = useTheme(); // Отримання поточної теми

  const avatarURL =
    user.avatarURL || defaultAvatars[theme] || defaultAvatars['Light']; // Вибір дефолтного аватара за темою

  return (
    <div className={s.userInfoContainer}>
      <p className={s.profile}>{user.name}</p>
      <button className={s.profile_btn} onClick={onClick}>
        <img src={avatarURL} alt="User Avatar" height={32} width={32} />
      </button>
    </div>
  );
};

export default UserInfo;

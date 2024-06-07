import Theme from '../PopUps/Theme/Theme';
import UserInfo from '../UserInfo/UserInfo';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.profile_container}>
          <Theme />
          <UserInfo />
        </div>
      </div>
    </header>
  );
};

export default Header;

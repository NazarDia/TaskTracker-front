import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.profile_container}></div>
      </div>
    </header>
  );
};

export default Header;

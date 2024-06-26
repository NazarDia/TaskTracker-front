import { useState } from 'react';
import s from './Header.module.css';
import icon from '../../images/sprite/sprite-icon.svg';
import UserInfo from '../../components/UserInfo/UserInfo';
import ThemeSelect from '../ThemeSelect/ThemeSelect';
import GeneralModal from '../GeneralModal/GeneralModal';
import EditProfile from '../../components/PopUps/EditProfile/EditProfile';

const Header = ({ handlerMenu }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handlerModalIsOpen = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <button className={s.menu_btn} onClick={handlerMenu}>
          <svg className={s.header_iconMenu}>
            <use href={`${icon}#icon-menu`}></use>
          </svg>
        </button>
        <div className={s.profile_container}>
          <ThemeSelect
            placeholder="Theme"
            option={['Light', 'Dark', 'Violet']}
          />
          <UserInfo onClick={handlerModalIsOpen} />
        </div>
      </div>
      <GeneralModal
        isOpen={modalIsOpen}
        onRequestClose={handlerModalIsOpen}
        contentLabel="Edit Profile"
      >
        <EditProfile onClose={handlerModalIsOpen} />
      </GeneralModal>
    </header>
  );
};

export default Header;

import Logo from '../Logo/Logo';
import BoardList from '../BoardList/BoardList';
import NeedHelp from '../NeedHelp/NeedHelp';
import LogoutBtn from '../LogoutBtn/LogoutBtn';

import s from './SideBar.module.css';

export default function SideBar({ onClose }) {
  return (
    <div className={s.container}>
      <div>
        <Logo />
        <BoardList onClose={onClose} />
      </div>
      <div>
        <NeedHelp />
        <LogoutBtn />
      </div>
    </div>
  );
}

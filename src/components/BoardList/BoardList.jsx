import SideBarCreateBoard from '../SideBarCreateBoard/SideBarCreateBoard';
import SidebarBoardList from '../SidebarBoardList/SidebarBoardList';
import s from './BoardList.module.css';

export default function BoardList() {
  return (
    <div className={s.container}>
      <h2 className={s.title}>My boards</h2>
      <SideBarCreateBoard />
      <SidebarBoardList />
    </div>
  );
}

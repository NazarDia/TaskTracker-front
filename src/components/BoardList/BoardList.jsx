import SideBarCreateBoard from '../SideBarCreateBoard/SideBarCreateBoard';
import s from './BoardList.module.css';

export default function BoardList() {
  return (
    <div className={s.container}>
      <h2 className={s.title}>My boards</h2>
      <SideBarCreateBoard />
      <div className={s.boardList}>BoardList...</div>
    </div>
  );
}

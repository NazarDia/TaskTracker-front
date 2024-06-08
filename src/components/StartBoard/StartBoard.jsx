import s from './StartBoard.module.css';
const StartBoard = () => {
  return (
    <div className={s.startWrapper}>
      <div className={s.textInner}>
        Before starting your project, it is essential to create a board to
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </div>
    </div>
  );
};

export default StartBoard;

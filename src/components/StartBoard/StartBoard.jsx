import s from './StartBoard.module.css';

const StartBoard = () => {
  return (
    <div className={s.startWrapper}>
      <div className={s.textInner}>
        Before starting your project, it is essential&#8194;
        <span className={s.link}>to create a board</span>
        &#8194;to visualize and track all the necessary tasks and milestones.
        This board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </div>
    </div>
  );
};

export default StartBoard;

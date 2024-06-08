import s from './HeaderDashboard.module.css';
const HeaderDashboard = () => {
  return (
    <div className={s.headerWrapper}>
      <p className={s.baordTitle}>Board Name</p>
      <div className={s.filterWrapper}>
        <p className={s.filtersPar}>Filters</p>
      </div>
    </div>
  );
};

export default HeaderDashboard;

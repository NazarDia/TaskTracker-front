import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import s from './ScreensPage.module.css';

const ScreensPage = () => {
  return (
    <main className={s.container}>
      <HeaderDashboard></HeaderDashboard>
      <MainDashboard></MainDashboard>
    </main>
  );
};

export default ScreensPage;

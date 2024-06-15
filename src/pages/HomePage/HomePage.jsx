import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchBoards } from '../../redux/boards/operations';
import { selectIsLoading, selectError } from '../../redux/boards/selectors';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/Error';

import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import ScreensPage from '../../components/ScreensPage/ScreensPage';

import s from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectError);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleMenuToggle = () => {
    setIsSidebarOpen(prev => !prev);
    document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={s.container}>
      <div className={`${s.sidebar} ${isSidebarOpen ? s.sidebarOpen : ''}`}>
        <SideBar onClose={handleCloseSidebar} />
      </div>

      {isSidebarOpen && (
        <div className={s.overlay} onClick={handleCloseSidebar}></div>
      )}

      <div className={s.mainContent}>
        <Header handlerMenu={handleMenuToggle} />

        <div>
          <div className={s.loadError}>
            {isLoading && <Loader />}
            {errorMessage && <ErrorMessage />}
          </div>

          {!isLoading && !errorMessage && <ScreensPage />}
        </div>
      </div>
    </div>
  );
}

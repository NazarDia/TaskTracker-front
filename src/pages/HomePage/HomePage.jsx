import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBoards } from '../../redux/boards/operations';
import { selectIsLoading, selectError } from '../../redux/boards/selectors';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/Error';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/SideBar/SideBar';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';

import s from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.mainContent}>
        <Header />

        <div className={s.loaderError}>
          {isLoading && <Loader />}
          {errorMessage && <ErrorMessage />}
        </div>

        {!isLoading && !errorMessage && <HeaderDashboard />}
      </div>
    </div>
  );
}

///////////////////////////////////////////////////////////////////

// export default function HomePage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleMenuClick = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className={s.container}>
//       <Header openMenu={handleMenuClick} />
//       {isSidebarOpen && <Sidebar />}
//       <main>
//         {/* Add your main page content here */}
//         <h1>Welcome to HomePage</h1>
//       </main>
//     </div>
//   );
// }

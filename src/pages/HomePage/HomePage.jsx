// import s from './HomePage.module.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/SideBar/SideBar';
import { useState } from 'react';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Header openMenu={handleMenuClick} />
      {isSidebarOpen && <Sidebar />}
      <main>
        {/* Add your main page content here */}
        <h1>Welcome to HomePage</h1>
      </main>
    </div>
  );
};

export default HomePage;

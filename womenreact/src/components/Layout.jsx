import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { downloadUtils } from '../utils/downloadUtils';
import './Layout.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDownload = (action) => {
    downloadUtils[action]?.();
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onDownload={handleDownload}
      />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
import React, { useState, useEffect } from 'react';
import { MessageSquare, Bell, User, Sun, Search, Menu } from "lucide-react";
import "../Styles/Header.css";

function Header({ handleOpenMessage, handleOpenNotification, toggleSidebar }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='header-container'>
      <div className='header-search'>
        {isSmallScreen && <Menu onClick={toggleSidebar}  className='menu' size={28} style={{ marginRight: '20px', cursor: 'pointer' }} />}
        <input type='text' placeholder='search' />
        <Search className='search' size={20} />
      </div>
      <div className='header-icons'>
        <Sun size={24} style={{ cursor: 'pointer' }} />
        <MessageSquare size={24} onClick={handleOpenMessage} style={{ cursor: 'pointer' }} />
        <Bell size={24} onClick={handleOpenNotification} style={{ cursor: 'pointer' }} />
        <User size={24} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}

export default Header;

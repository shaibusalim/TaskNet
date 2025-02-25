import React, { useState } from "react";
import Header from "../../pages/Header";
import Sidebar from "./Sidebar";
import "../../Styles/Layout.css";
import Message from "../../pages/Message";
import Notifcation from "../../pages/Notifcation";

function PosterLayout({ children }) {
  const [openMessage, setOpenMessage] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const handleOpenMessage = () => {
    setOpenMessage(!openMessage);
  };

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-main">
      <Notifcation openNotification={openNotification} />
      <Message openMessage={openMessage} />
      <div className={`layout-side ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      <div className={`layout-content ${isSidebarOpen ? "shifted" : ""}`}>
        <Header
          handleOpenNotification={handleOpenNotification}
          handleOpenMessage={handleOpenMessage}
          toggleSidebar={toggleSidebar} // Pass toggle function to Header
        />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default PosterLayout;
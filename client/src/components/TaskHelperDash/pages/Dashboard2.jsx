import React from 'react';
import '../styles/Dashboard.css';
import PieChat from '../../utilis/PieChat';
import { FaNewspaper, FaTasks, FaHandsHelping, FaUsers } from 'react-icons/fa';

function Dashboard2 () {
  // Updated sample data for the cards related to posters
  const cardData = [
    { 
      title: 'Total Posters', 
      value: '1,234', 
      growth: '+5%', 
      icon: <FaNewspaper size={30} color="#fff" /> 
    },
    { 
      title: 'Total Tasks', 
      value: '456', 
      growth: '+8%', 
      icon: <FaTasks size={30} color="#fff" /> 
    },
    { 
      title: 'Total Helpers', 
      value: '78', 
      growth: '+15%', 
      icon: <FaHandsHelping size={30} color="#fff" /> 
    },
    { 
      title: 'Total Users', 
      value: '2,345', 
      growth: '+3%', 
      icon: <FaUsers size={30} color="#fff" /> 
    },
  ];

  return (
    <div className='poster-dashboard-main'>
      <div className='poster-dashboard-header'>
        <h1>DASHBOARD</h1>
        <h2>Welcome to your dashboard</h2>
      </div>
      <div className='poster-dashboard-content'>
        {/* Cards Section */}
        <div className='poster-dashboard-card'>
          {cardData.map((card, index) => (
            <div
              key={index}
              className='card p-6 flex flex-col justify-center items-center bg-gray-800 rounded-lg shadow-lg'
            >
              {/* Icon Section */}
              <div className='icon mb-2'>{card.icon}</div>
              <h3 className='text-lg font-semibold text-gray-300'>{card.title}</h3>
              <p className='text-2xl font-bold text-white mt-2'>{card.value}</p>
              <p className='text-sm text-green-400 mt-1'>{card.growth}</p>
            </div>
          ))}
        </div>

        {/* Pie Chart Section */}
        <div className='poster-dashboard-piechat'>
          <div className='poster-section1 p-6 bg-gray-800 rounded-lg shadow-lg'>
            <h3 className='text-xl font-semibold text-white mb-4'>Recent Activities</h3>
            <ul className='text-gray-300'>
            <li className='mb-2'>✅ New poster published: "Summer Sale Announced"</li>
              <li className='mb-2'>🔄 Poster updated: "Holiday Schedule Changes"</li>
              <li className='mb-2'>❌ Poster removed: "Old Announcement"</li>
              <li className='mb-2'>✅ New poster published: "Community Event Reminder"</li>
            </ul>
          </div>
          <div className='poster-pie p-6 bg-gray-800 rounded-lg shadow-lg'>
            <PieChat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard2;

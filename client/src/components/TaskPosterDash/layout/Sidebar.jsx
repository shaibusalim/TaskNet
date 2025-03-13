import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    LayoutDashboard, 
    PlusCircle, 
    ListChecks, 
    Briefcase, 
    CreditCard, 
    Settings, 
    HelpCircle,
    Calendar,
    X
  } from "lucide-react";
  import { Link } from 'react-router-dom';
  import "../../Styles/Sidebar.css"
  import Image from "../../../assets/images/adm.png"
  import Logo from "../../../assets/images/logo3.png"

function Sidebar({isSidebarOpen}) {

    const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data); // Set user details in state
        } else {
          toast.error(data.message || 'Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('An error occurred. Please try again.');
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <aside className={`${isSidebarOpen? 'open-sidebar': ''}`}>
        <div className='aside-header'>
            <div className='aside-header-icon'>
                <div>
                    <img 
                    src={Logo} 
                    style={{ width: '50px', height: '50px', marginRight: '10px' }} 
                        />
                <span style={{fontSize: '2rem', fontWeight: 'bolder'}}>Task<span style={{color: '#4C2C96', fontWeight: 'bolder'}}>NeT</span></span>
                </div>
                   
                   <X size={28} style={{color: 'red', display: 'none'}} className='x'/>
                
            </div>
            <div className='aside-user-profile'>
                <div className='avatar'>
                     <img
            src={ 'https://via.placeholder.com/150'} // Default profile picture
            alt="Profile"
            
             
           
          />
                </div>
                <div>
                <h2>{user.fullName}</h2>
                <label>{user.bio || 'No bio available.'}</label>
                </div>
               
            </div>
            <div className='aside-menu'>
                <div className='aside-menu-top'>
                <ul >
                             <li className="flex items-center space-x-2">
                                <Link to="/poster" className="flex items-center space-x-2">
                                    <LayoutDashboard size={24} />
                                    <span>Dashboard</span>
                                </Link>
                  
                             </li>
                             <li className="flex items-center space-x-2">
                                <Link to="/poster/createTask" className="flex items-center space-x-2">
                                    <PlusCircle size={24} />
                                    <span>Create New Task</span>
                                </Link>
                                
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link to="/poster/myTask" className="flex items-center space-x-2">
                                    <ListChecks size={24} />
                                    <span>My Task</span>
                                </Link>
                                
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link to="/poster/application" className="flex items-center space-x-2">
                                    <Briefcase size={24} />
                                    <span>Applications</span>
                                </Link>
                               
                            </li>
                             <li className="flex items-center space-x-2">
                                <Link to="/poster/payment" className="flex items-center space-x-2">
                                    <CreditCard size={24} />
                                    <span>Payments</span>
                                </Link>
                              
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link to="/poster/calender" className="flex items-center space-x-2">
                                    <Calendar size={24} />
                                    <span>Calendar</span>
                                </Link>
                              
                            </li>
                            
                    </ul>
                </div>
                <div className='aside-menu-bottom'>
                    <ul>
                        <li className="flex items-center space-x-2">
                            <Link to="/poster/account"className="flex items-center space-x-2">
                                <Settings size={24} />
                                <span>Account Settings</span>
                            </Link>
                              
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link to="/poster/help" className="flex items-center space-x-2">
                                        <HelpCircle size={24} />
                                        <span>Help / Support</span>
                                </Link>
                                
                             </li>
                    </ul>
               
                </div>
                      
            </div>
        </div>
    </aside>
  )
}

export default Sidebar
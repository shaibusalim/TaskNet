import React from 'react'
import { 
    LayoutDashboard, 
    PlusCircle, 
    ListChecks, 
    CreditCard, 
    Settings, 
    HelpCircle,
    Calendar
  } from "lucide-react";
  import { Link } from 'react-router-dom';
  import "../../Styles/Sidebar.css"
  import Image from "../../../assets/images/adm.png"
  import Logo from "../../../assets/images/logo3.png"

function Sidebar() {
  return (
    <aside>
        <div className='aside-header'>
            <div className='aside-header-icon'>
                <div>
                    <img 
                    src={Logo} 
                    style={{ width: '50px', height: '50px', marginRight: '10px' }} 
                        />
                <span style={{fontSize: '2rem', fontWeight: 'bolder'}}>Task<span style={{color: '#4C2C96', fontWeight: 'bolder'}}>NeT</span></span>
                </div>
                   
                
            </div>
            <div className='aside-user-profile'>
                <div className='avatar'
                style={
                    {
                        backgroundImage: `url(${Image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }
                }
                >
                </div>
                <div>
                <h2>Tony Stark</h2>
                <label>He is the man</label>
                </div>
               
            </div>
            <div className='aside-menu'>
                <div className='aside-menu-top'>
                <ul >
                             <li className="flex items-center space-x-2">
                                <Link to="/helper" className="flex items-center space-x-2">
                                    <LayoutDashboard size={24} />
                                    <span>Dashboard</span>
                                </Link>
                  
                             </li>
                             <li className="flex items-center space-x-2">
                                <Link to="/helper/availableTask" className="flex items-center space-x-2">
                                    <PlusCircle size={24} />
                                    <span>Available Task</span>
                                </Link>
                                
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link to="/helper/myTask" className="flex items-center space-x-2">
                                    <ListChecks size={24} />
                                    <span>My Task</span>
                                </Link>
                                
                            </li>
                           
                             <li className="flex items-center space-x-2">
                                <Link to="/helper/payment" className="flex items-center space-x-2">
                                    <CreditCard size={24} />
                                    <span>Payments</span>
                                </Link>
                              
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link to="/helper/calender" className="flex items-center space-x-2">
                                    <Calendar size={24} />
                                    <span>Calendar</span>
                                </Link>
                              
                            </li>
                            
                    </ul>
                </div>
                <div className='aside-menu-bottom'>
                    <ul>
                        <li className="flex items-center space-x-2">
                            <Link to="/helper/account"className="flex items-center space-x-2">
                                <Settings size={24} />
                                <span>Account Settings</span>
                            </Link>
                              
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link to="/helper/help" className="flex items-center space-x-2">
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
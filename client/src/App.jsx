import React from 'react'
import PosterLayout from './components/TaskPosterDash/layout/PosterLayout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Dashboard from './components/TaskPosterDash/pages/Dashboard';
import Dashboard2 from './components/TaskHelperDash/pages/Dashboard2';
import CreateTask from './components/TaskPosterDash/pages/CreateTask';
import MyTask from './components/TaskPosterDash/pages/MyTask';
import Application from './components/TaskPosterDash/pages/Application';
import Payment from './components/TaskPosterDash/pages/Payment';
import Account from './components/pages/Account';
import Help from './components/pages/Help';
import Calender from './components/utilis/Calender';
import HelperLayout from './components/TaskHelperDash/layout/HelperLayout';
import AvailableTask from './components/TaskHelperDash/pages/AvailableTask';
import HelperTask from './components/TaskHelperDash/pages/HelperTask';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';


function App() {
  return (
   <div className='app'>
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
          <Route 
              path='/poster/*'
              element={
                  <PosterLayout>
                      <Routes>
                        <Route path='/' element={<Dashboard />}/>
                        <Route path='/createTask' element={<CreateTask />}/>
                        <Route path='/myTask' element={<MyTask />}/>
                        <Route path='/application' element={<Application />}/>
                        <Route path='/payment' element={<Payment />}/>
                        <Route path='/account' element={<Account />}/>
                        <Route path='/help' element={<Help />}/>
                        <Route path='/calender' element={<Calender />}/>
                      </Routes>
                  </PosterLayout>
              }
          />

          <Route
            path='/helper/*'
            element={
              <HelperLayout>
                  <Routes>
                    <Route path='/' element={<Dashboard2 />}/>
                    <Route path='/availableTask' element={<AvailableTask/>}/>
                    <Route path='/mytask' element={<HelperTask/>}/>
                    <Route path='/payment' element={<Payment />}/>
                    <Route path='/calender' element={<Calender />}/>
                    <Route path='/account' element={<Account />}/>
                  </Routes>
              </HelperLayout>
            }
          
          />
      </Routes>
    </Router>
          
   </div>
  
    
  )
}

export default App

import React from 'react'
import '../styles/MyTask.css'
import {tasks} from '../../utilis/Tasks';





function AvailableTask() {
  return (
<div className='helper-task-container'>
   <div className='div1'>
    <h2>My Task Board</h2>
        <span>this is actually annoying</span>
   </div>
     <div className='div2'>
        <div className='helper-task-content'>
                    <div className='helper-task-header'>
                     
                                <span>
                                    Filter:
                                </span>
                                  
                                <select>
                                    <option>By Date</option>

                                </select>
                              
                                <select>
                                    <option>By Status</option>
                                </select>
                               
                                <select>
                                    <option>By Priority</option>
                                </select>
                        
                    </div>
                    <div className='helper-task-cards'>
                                     {tasks.map((task) => (
                                    <div className="helper-task-card" key={task.id}>
                                    <div className="card-task-name">
                                        <h3>{task.taskNumber}</h3>
                                        <p>{task.date}</p>
                                    </div>
                                    <p className="helper-task-details">
                                        {task.details.split('. ').map((sentence, index) => (
                                        <React.Fragment key={index}>
                                            {sentence}.
                                            <br />
                                        </React.Fragment>
                                        ))}
                                    </p>
                                    <p className="helper-task-time p">
                                        Due: <span>{task.due}</span>
                                    </p>
                                    <p className="helper-task-amount p">
                                        Payment: <span>{task.payment}</span>
                                    </p>
                                    <p className="helper-task-loc p">
                                        Location: <span>{task.location}</span>
                                    </p>
                                    <p className="helper-task-image">
                                        <img src={task.image} alt={task.taskNumber}
                                            style={{width: '400px', height: '250px'}}
                                        />
                                    </p>
                                    <div className="helper-card-bottom">
                                        <p className="helper-card-pri">{task.priority}</p>
                                        <p className="helper-card-pro">{task.progress}</p>
                                        <button>...</button>
                                    </div>
                                    </div>
                                ))}

                    </div>
            </div>
          
     </div>
           
    </div>
  )
}

export default AvailableTask
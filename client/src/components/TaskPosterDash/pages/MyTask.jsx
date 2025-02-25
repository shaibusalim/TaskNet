import React from 'react';
import '../styles/MyTask.css';
import { Search } from 'lucide-react';
import PriorityBars from './PriorityBars';
import AssignUserAccordion from './AssignUserAccordion';
import { tasks } from '../../utilis/Tasks';

function MyTask() {
  // Function to get priority class
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Highest Priority':
        return 'priority-highest';
      case 'High Priority':
        return 'priority-high';
      case 'Normal Priority':
        return 'priority-normal';
      case 'Low Priority':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="poster-task-container">
      <div className="div1">
        <h2>My Task Board</h2>
        <span>this is actually annoying</span>
      </div>
      <div className="div2">
        <div className="poster-task-content">
          <div className="poster-task-header">
            <span>Filter:</span>
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
          <div className="poster-task-cards">
            {tasks.map((task) => (
              <div className="poster-task-card" key={task.id}>
                <div className="card-task-name">
                  <h3>{task.taskNumber}</h3>
                  <p>{task.date}</p>
                </div>
                <p className="poster-task-details">
                  {task.details.split('. ').map((sentence, index) => (
                    <React.Fragment key={index}>
                      {sentence}.
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <p className="poster-task-time p">
                  Due: <span>{task.due}</span>
                </p>
                <p className="poster-task-amount p">
                  Payment: <span>{task.payment}</span>
                </p>
                <p className="poster-task-loc p">
                  Location: <span>{task.location}</span>
                </p>
                <p className="poster-task-image">
                  <img src={task.image} alt={task.taskNumber} style={{width: '400px', height: '200px'}} />
                </p>
                <div className="poster-card-bottom">
                  <p className={`poster-card-pri ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </p>
                  <p className="poster-card-pro">{task.progress}</p>
                  <button>...</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="poster-task-side-content">
          <div className="poster-task-side-search">
            <h3>Search Box</h3>
            <div>
              <input type="text" placeholder="Search here" />
              <Search />
            </div>
          </div>
          <div className="poster-task-side-status">
            <PriorityBars />
            <AssignUserAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTask;
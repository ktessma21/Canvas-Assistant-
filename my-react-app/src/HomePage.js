import React, { useState } from 'react';
import './style.css'; // Import the common CSS

function HomePage({ userName }) {
  const [isExpanded, setIsExpanded] = useState(false); // State to handle the expandable to-do list
  const [toDoList, setToDoList] = useState([
    'Finish assignment for CS101',
    'Attend project meeting',
    'Submit lab report',
    'Review notes for Friday’s quiz',
  ]); // Example to-do list items

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReload = () => {
    window.location.reload();   // TODO 1: probably this is not what i want to reload so come and fix it. 
  };

  const handleCalendarClick = (calendarType) => {
    // Placeholder function to handle calendar export (Google or Outlook)
    alert(`Exporting to ${calendarType} Calendar...`);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>LMS Assistance</h1>
        <button onClick={handleReload} className="reload-button">Reload</button>
      </header>

      <main>
        <h2 className="user-name">{userName}</h2>

        <div className="this-week">
          <h3 onClick={handleToggleExpand} className="expandable-header">
            This Week {isExpanded ? '▲' : '▼'}
          </h3>

          {isExpanded && (
            <ul className="to-do-list">
              {toDoList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="calendar-icons">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_Calendar_icon_%282020%29.svg"
            alt="Google Calendar"
            className="calendar-icon"
            onClick={() => handleCalendarClick('Google')}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Microsoft_Outlook_2018.svg/1200px-Microsoft_Outlook_2018.svg.png"
            alt="Outlook Calendar"
            className="calendar-icon"
            onClick={() => handleCalendarClick('Outlook')}
          />
        </div>
      </main>
    </div>
  );
}

export default HomePage;

import React from 'react';
import './index.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycle={4}
      />
    </div>
  );
}

export default App;

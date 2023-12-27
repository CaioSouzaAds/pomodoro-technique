import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface PomodoroTimerProps {
  defaultPomodoTime: number;
}

export function PomodoroTimer(props: PomodoroTimerProps) {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime}></Timer>
      <Button text="teste" onClick={() => alert('teste')}></Button>
    </div>
  );
}

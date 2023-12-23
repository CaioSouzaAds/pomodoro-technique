import React from 'react';
import { useInterval } from '../hooks/use-interval';

interface PomodoroTimerProps {
  defaultPomodoTime: number;
}

export function PomodoroTimer(props: PomodoroTimerProps) {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return <div>Olá mundo! {mainTime}</div>;
}

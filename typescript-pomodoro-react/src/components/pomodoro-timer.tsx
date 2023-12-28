import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { secondsToTime } from '../utils/seconds-to-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWork: HTMLAudioElement = new Audio(bellStart);
const audioStopWorking: HTMLAudioElement = new Audio(bellFinish);

interface PomodoroTimerProps {
  pomodoTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycle: number;
}

export function PomodoroTimer(props: PomodoroTimerProps) {
  const [mainTime, setMainTime] = useState(props.pomodoTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManeger, setCyclesQtdManger] = useState(
    new Array(props.cycle - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoTime);
    audioStartWork.play();
  }, [setTimeCounting, setWorking, setResting, setMainTime, props.pomodoTime]);

  const configureRest = useCallback(
    (Long: boolean) => {
      setResting(true);
      setTimeCounting(true);
      setWorking(false);

      if (Long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }

      audioStartWork.play();
    },
    [
      setResting,
      setTimeCounting,
      setWorking,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManeger.length > 0) {
      configureRest(false);
      cyclesQtdManeger.pop();
    } else if (working && cyclesQtdManeger.length <= 0) {
      configureRest(true);
      setCyclesQtdManger(new Array(props.cycle - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManeger,
    configureRest,
    numberOfPomodoros,
    setCyclesQtdManger,
    completedCycles,
    configureWork,
    props.cycle,
  ]);

  const handlePlayPauseClick = () => {
    setTimeCounting(!timeCounting);
    audioStopWorking.play();
  };

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer mainTime={mainTime}></Timer>
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="Resting" onClick={() => configureRest(false)}></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={handlePlayPauseClick}
        ></Button>
      </div>

      <div className="details">
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
        <p></p>
      </div>
    </div>
  );
}

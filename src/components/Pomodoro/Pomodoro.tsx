import { useState, useEffect } from 'react';
import useTimer from '@utils/useTimer/useTimer';
import style from './Pomodoro.module.css';
import { timerValue, timerStatus, timerStatusTxt } from '@enums';
import AppBar from '@mui/material/AppBar';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import IconButton from '@mui/material/IconButton';
import StopIcon from '@mui/icons-material/Stop';
import { formatTime } from '@utils/format/format';

const Pomodoro = () => {
  const [nbWorkPhase, setNbWorkPhase] = useState<number>(0);
  const [currentPhaseType, setCurrentPhaseType] = useState<timerStatus>(timerStatus.WORK);

  const callbackTimerEnd = () => {
    if (currentPhaseType !== timerStatus.WORK) {
      setCurrentPhaseType(timerStatus.WORK)
      updateTimer(timerValue[timerStatus.WORK])
    } else {
      const newNbWorkPhase = nbWorkPhase + 1
      setNbWorkPhase(newNbWorkPhase);

      const pauseType = newNbWorkPhase % 4 === 0 ? timerStatus.LONG_PAUSE : timerStatus.SHORT_PAUSE
      setCurrentPhaseType(pauseType);
      updateTimer(timerValue[pauseType]);
    }

    new Notification(`Pomodoro: ${timerStatusTxt[currentPhaseType]} terminé`)

  };


  const { timer, isTimerPlay, playTimer, cancelTimer, updateTimer } = useTimer({
    duration: timerValue[currentPhaseType],
    callback: callbackTimerEnd
  });

  useEffect(() => {
    if (Notification) Notification.requestPermission();
  })

  return (
    <AppBar color="transparent" position="relative" sx={{ backdropFilter: "blur(20px)" }}>
      <div className={style.wrapper}>
        <div className={style.infoWrapper}>
          <div className={style.playerButton}>
            {isTimerPlay ?
              <IconButton aria-label="stop_timer" onClick={cancelTimer}>
                <StopIcon color="primary" />
              </IconButton>
              :
              <IconButton aria-label="play_timer" onClick={playTimer}>
                <PlayCircleOutlineIcon color="primary" />
              </IconButton>
            }
            <p>{timerStatusTxt[currentPhaseType]}</p>
          </div>
          <div className={style.time}>{formatTime(timer, 'mm:ss')}</div>
          <div className={style.focus}>Total Focus: {formatTime(nbWorkPhase * timerValue.WORK)}</div>
        </div>
        <div className={style.progressBar} style={{ width: `${100 - timer * 100 / timerValue[currentPhaseType]}%` }} />
      </div>
    </AppBar>
  )
}

export default Pomodoro;

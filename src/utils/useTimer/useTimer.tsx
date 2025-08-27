import { useEffect, useRef, useState } from 'react'

type TimerParams = {
    duration: number,
    callback?: () => void
}

type TimerResult = {
    timer: number,
    isTimerPlay: boolean,
    playTimer: () => void,
    cancelTimer: () => void,
    updateTimer: (time: number) => void
}

const useTimer = ({ duration, callback }: TimerParams): TimerResult => {
    const [timer, setTimer] = useState(duration);
    const [isTimerPlay, setIsTimerPlay] = useState(false);
    const interval = useRef<NodeJS.Timeout | null>(null);

    const clearRefInterval = () => {
        setIsTimerPlay(false);
        if (interval.current) clearInterval(interval.current)
    }

    const updateTimer = (time: number) => {
        clearRefInterval();
        setTimer(time)
    };

    const playTimer = () => {
        clearRefInterval();
        setIsTimerPlay(true);
        interval.current = setInterval(() => {
            setTimer((time) => time - 1);
        }, 1000)
    }

    const cancelTimer = () => {
        clearRefInterval();
        setTimer(duration);
    }

    useEffect(() => {
        if (timer <= 0) {
            clearRefInterval();
            if (callback) callback();
        }
    }, [timer, callback])

    useEffect(() => {
        return clearRefInterval();
    }, [])


    return {
        timer,
        isTimerPlay,
        playTimer,
        cancelTimer,
        updateTimer
    }
}

export default useTimer
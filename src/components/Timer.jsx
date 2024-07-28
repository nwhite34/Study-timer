// src/components/Timer.jsx
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import celebrationAnimation from '../assets/celebrate-an.json'; // Corrected path
import BatteryBar from './BatteryBar';

const Timer = ({ duration, onEnd, resetKey }) => {
  const [time, setTime] = useState(duration);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setTime(duration); // Reset the timer when duration or resetKey changes
    setShowAnimation(false);
  }, [duration, resetKey]);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      setShowAnimation(true);
      onEnd();
    }
  }, [time, onEnd]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const calculatePercentage = () => {
    return ((duration - time) / duration) * 100;
  };

  return (
    <div className="text-center w-full">
      {!showAnimation ? (
        <>
          <div className="text-3xl mb-4 text-black ">{formatTime(time)}</div>
          <BatteryBar percentage={calculatePercentage()} />
        </>
      ) : (
        <div className="relative flex flex-col items-center">
          <Lottie animationData={celebrationAnimation} style={{ width: 300, height: 300 }} />
          <div className="absolute flex flex-col items-center justify-center h-full w-full top-0 left-0">
            <h1 className="text-4xl font-bold text-black shadow-lg">Congratulations!</h1>
            <p className="mt-4 text-xl text-black shadow-lg">You have finished your session, take a break!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;

// src/pages/SessionPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Timer from '../components/Timer';

const SessionPage = () => {
  const { state } = useLocation();
  const { duration } = state;
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [totalDuration, setTotalDuration] = useState(duration);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Added reset key
  const navigate = useNavigate();

  const handleEnd = async () => {
    setIsSessionCompleted(true);
    const sessionData = {
      userId: auth.currentUser.uid,
      duration: totalDuration,
      timestamp: new Date()
    };
    console.log('Saving session data:', sessionData);

    try {
      const sessionRef = await addDoc(collection(db, 'sessions'), sessionData);
      console.log('Session saved with ID:', sessionRef.id);
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  const extendTime = (extraTime) => {
    setCurrentDuration((prevDuration) => prevDuration + extraTime);
    setTotalDuration((prevTotalDuration) => prevTotalDuration + extraTime);
  };

  const resetTimer = () => {
    setCurrentDuration(duration);
    setTotalDuration(duration);
    setIsSessionCompleted(false);
    setResetKey(prevKey => prevKey + 1); // Change the reset key to force re-render
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center h-screen w-full max-w-md space-y-4">
        <Timer duration={currentDuration} onEnd={handleEnd} resetKey={resetKey} />
        {!isSessionCompleted && (
          <button
            onClick={() => extendTime(30 * 60)}
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Extend Time by 30 Minutes
          </button>
        )}
        <button
          onClick={resetTimer}
          className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
        <button
          onClick={goBack}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default SessionPage;

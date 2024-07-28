import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const SessionHistory = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        fetchSessions(currentUser.uid);
      } else {
        navigate('/');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Fetch study sessions from Firestore
  const fetchSessions = async (userId) => {
    try {
      const sessionsRef = collection(db, 'sessions');
      const q = query(sessionsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const sessionsData = querySnapshot.docs.map((doc) => doc.data());
      console.log('Fetched sessions:', sessionsData);
      setSessions(sessionsData);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black w-screen px-4">
      <div className="w-full max-w-xs p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={goBack}
          className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go Back
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-900 mt-4">Session History</h2>
        <ul className="space-y-2">
          {sessions.map((session, index) => (
            <li
              key={index}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              {new Date(session.timestamp.toDate()).toLocaleString()} - {session.duration / 60} minutes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SessionHistory;

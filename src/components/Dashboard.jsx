import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ContributionGraph from '../components/ContributionGraph';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchSessions(currentUser.uid);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchSessions = async (userId) => {
    try {
      const sessionsRef = collection(db, 'sessions');
      const q = query(sessionsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const sessionsData = querySnapshot.docs.map((doc) => doc.data());
      setSessions(sessionsData);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const startSession = (duration) => {
    navigate('/session', { state: { duration } });
  };

  const calculateTotalStudyTime = () => {
    return sessions.reduce((acc, session) => acc + session.duration, 0);
  };

  const formatTotalStudyTime = () => {
    const totalMinutes = calculateTotalStudyTime() / 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const calculateOverallProgress = () => {
    const totalStudyTime = calculateTotalStudyTime();
    const totalPossibleTime = sessions.length * 6 * 60 * 60;
    return (totalStudyTime / totalPossibleTime) * 100;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-screen p-4 sm:p-6 md:p-8">
      {user && (
        <div className="w-full max-w-xs space-y-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Welcome, {user.email}
          </h2>

          <button
            onClick={handleSignOut}
            className="w-full py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign Out
          </button>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => startSession(60)}
              className="col-span-1 py-2 text-center text-white bg-black rounded-lg focus:outline-none hover:bg-gray-800"
            >
              1M
            </button>
            <button
              onClick={() => startSession(90 * 60)}
              className="col-span-1 py-2 text-center text-white bg-black rounded-lg focus:outline-none hover:bg-gray-800"
            >
              90M
            </button>
            <button
              onClick={() => startSession(60 * 60)}
              className="col-span-1 py-2 text-center text-white bg-black rounded-lg focus:outline-none hover:bg-gray-800"
            >
              1H
            </button>
            <button
              onClick={() => startSession(4 * 60 * 60)}
              className="col-span-1 py-2 text-center text-white bg-black rounded-lg focus:outline-none hover:bg-gray-800"
            >
              4H
            </button>
            <button
              onClick={() => startSession(6 * 60 * 60)}
              className="col-span-1 py-2 text-center text-white bg-black rounded-lg focus:outline-none hover:bg-gray-800"
            >
              6H
            </button>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900">Overall Progress</h3>
            <div className="w-full bg-gray-300 h-4 rounded mb-4">
              <div
                className="bg-green-500 h-4 rounded"
                style={{ width: `${calculateOverallProgress()}%` }}
              ></div>
            </div>
            <p className="text-gray-700">Total Study Time: {formatTotalStudyTime()}</p>
            <div className="flex justify-center mt-4">
              <ContributionGraph sessions={sessions} />
            </div>
          </div>

          <button
            onClick={() => navigate('/session-history')}
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Session History
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

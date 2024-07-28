import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      navigate('/dashboard');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signUpUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError('');
      navigate('/dashboard');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setError('Email is already in use.');
        break;
      case 'auth/invalid-email':
        setError('Invalid email address.');
        break;
      case 'auth/weak-password':
        setError('Password is too weak.');
        break;
      case 'auth/user-not-found':
        setError('User not found. Please sign up.');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password.');
        break;
      default:
        setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white w-screen px-4">
      <div className="w-full max-w-xs p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Study Timer</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
          />

          {isSignUp ? (
            <button
              onClick={signUpUser}
              className="w-full py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={loginUser}
              className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          )}

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full py-2 mt-4 text-gray-600 rounded-lg hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

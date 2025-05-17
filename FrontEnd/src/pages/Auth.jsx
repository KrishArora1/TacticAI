import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig'; // Import Firestore
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore imports

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Controls login/signup toggle
  const [isSecondStep, setIsSecondStep] = useState(false); // Second step flag
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyUID, setCompanyUID] = useState('');
  const [companyPosition, setCompanyPosition] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email and password confirmation for sign-up only
    if (!isLogin) {
      if (email !== confirmEmail) {
        setError('Emails do not match');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    try {
      if (isLogin) {
        // Login with Firebase email and password
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Proceed to second step (collect additional info)
        setIsSecondStep(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = auth.currentUser;

      // Store additional company information in Firestore
      await setDoc(doc(db, 'pharmaceuticalCompanies', user.uid), {
        companyName,
        companyUID,
        companyPosition,
        email,
      });

      console.log('Signup with additional info successful');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* First Step - Authentication */}
        {!isSecondStep ? (
          <form className="mt-8 space-y-6" onSubmit={handleStep1Submit}>
            <input type="hidden" name="remember" defaultValue="true" />

            {/* Email Field */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Confirm Email and Password (Only for Sign Up) */}
            {!isLogin && (
              <>
                {/* Confirm Email */}
                <div>
                  <label htmlFor="confirm-email" className="sr-only">Confirm Email</label>
                  <input
                    id="confirm-email"
                    name="confirmEmail"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                    placeholder="Confirm Email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>

            {/* Toggle between Sign In and Sign Up */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin((prev) => !prev)}
                className="text-violet-600 hover:text-violet-700 text-sm"
              >
                {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'}
              </button>
            </div>
          </form>
        ) : (
          // Second Step - Collect Company Information
          <form className="mt-8 space-y-6" onSubmit={handleStep2Submit}>
            <input type="hidden" name="remember" defaultValue="true" />

            {/* Company Information */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="company-name" className="sr-only">Company Name</label>
                <input
                  id="company-name"
                  name="companyName"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="company-uid" className="sr-only">Company UID</label>
                <input
                  id="company-uid"
                  name="companyUID"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                  placeholder="Company UID"
                  value={companyUID}
                  onChange={(e) => setCompanyUID(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="company-position" className="sr-only">Company Position</label>
                <input
                  id="company-position"
                  name="companyPosition"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                  placeholder="Position"
                  value={companyPosition}
                  onChange={(e) => setCompanyPosition(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Complete Signup
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
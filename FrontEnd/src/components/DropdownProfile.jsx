import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebaseConfig'; // Make sure the Firebase app is initialized
import Transition from '../utils/Transition';

import UserAvatar from '../images/user-avatar-32.png';

// Get the current user's ID
const auth = getAuth(); // Correct auth initialization
const db = getFirestore(app);

function DropdownProfile({
  align
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyPosition, setCompanyPosition] = useState('');

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Fetch company name and position from Firestore
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid; // This is the unique user ID from Firebase Authentication
          const userDocRef = doc(db, 'pharmaceuticalCompanies', userId); // Access the user's document in Firestore
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCompanyName(userData.companyName || 'No company');
            setCompanyPosition(userData.companyPosition || 'No position');
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No user is signed in');
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCompanyData();
  }, []); // Empty dependency array ensures it runs once on mount

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
            {companyName || 'Loading...'}
          </span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div className="font-medium text-gray-800 dark:text-gray-100">{companyName || 'Loading...'}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">{companyPosition || 'Loading...'}</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                to="/signin"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
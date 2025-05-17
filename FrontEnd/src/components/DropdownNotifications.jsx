import React, { useState, useEffect } from 'react';
import Transition from '../utils/Transition';

function DropdownNotifications() {
  const [modalOpen, setModalOpen] = useState(false);

  // close modal on escape key
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      <div className="relative inline-flex">
        <button
          className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ${modalOpen && 'bg-gray-200 dark:bg-gray-800'}`}
          onClick={() => setModalOpen(true)}
          aria-label="Open LiveKit"
        >
          <svg
            className="fill-current text-gray-500/80 dark:text-gray-400/80"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0a7 7 0 0 0-7 7c0 1.202.308 2.33.84 3.316l-.789 2.368a1 1 0 0 0 1.265 1.265l2.595-.865a1 1 0 0 0-.632-1.898l-.698.233.3-.9a1 1 0 0 0-.104-.85A4.97 4.97 0 0 1 2 7a5 5 0 0 1 5-5 4.99 4.99 0 0 1 4.093 2.135 1 1 0 1 0 1.638-1.148A6.99 6.99 0 0 0 7 0Z" />
            <path d="M11 6a5 5 0 0 0 0 10c.807 0 1.567-.194 2.24-.533l1.444.482a1 1 0 0 0 1.265-1.265l-.482-1.444A4.962 4.962 0 0 0 16 11a5 5 0 0 0-5-5Zm-3 5a3 3 0 0 1 6 0c0 .588-.171 1.134-.466 1.6a1 1 0 0 0-.115.82 1 1 0 0 0-.82.114A2.973 2.973 0 0 1 11 14a3 3 0 0 1-3-3Z" />
          </svg>
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 dark:border-gray-900 rounded-full"></div>
        </button>
      </div>

      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        {/* Modal backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        ></div>
        {/* Modal content */}
        <div className="relative bg-white dark:bg-gray-800 w-[900px] h-[600px] rounded-lg shadow-lg overflow-hidden">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            onClick={() => setModalOpen(false)}
          >
            <span className="sr-only">Close</span>
            <svg className="w-4 h-4 fill-current">
              <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
            </svg>
          </button>
          <iframe
            src="https://kitt.livekit.io"
            className="w-full h-full border-0"
            allow="camera; microphone; display-capture; fullscreen"
          />
        </div>
      </Transition>
    </>
  );
}

export default DropdownNotifications;
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiUpload } from 'react-icons/hi'; // Upload icon from react-icons
import Transition from '../utils/Transition';

function ModalUpload({
  id,
  modalOpen,
  setModalOpen
}) {

  const modalContent = useRef(null);
  const fileInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen && fileInput.current.focus();
  }, [modalOpen]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file);
      // Handle the upload logic here
    }
  };

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900/30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700/60 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg"
        >
          {/* Upload drop area */}
          <form className="border-b border-gray-200 dark:border-gray-700/60 py-4 px-2">
            <div
              className="w-full h-48 md:h-72 border-2 border-dashed border-gray-400 dark:border-gray-600 flex justify-center items-center cursor-pointer relative bg-gray-100 dark:bg-gray-700"
              onClick={() => fileInput.current.click()} // Trigger file selection when the area is clicked
            >
              <input
                id="file-upload"
                type="file"
                ref={fileInput}
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <HiUpload className="text-gray-500 dark:text-gray-300 text-4xl" />
              <p className="text-gray-500 dark:text-gray-300 mt-2">Drag and drop or click to select a file</p>
            </div>
          </form>
          {/* Instructions or messages */}
          <div className="py-4 px-2 text-center">
            <p className="text-gray-800 dark:text-gray-100">Select a file to upload</p>
          </div>
          {/* Close button */}
          <div className="py-4 px-2 flex justify-end">
            <button
              onClick={() => setModalOpen(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalUpload;
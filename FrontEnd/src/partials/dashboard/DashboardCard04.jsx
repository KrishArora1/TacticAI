import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../../firebaseConfig'; // Ensure Firebase app is initialized

// Initialize Firestore and Authentication
const auth = getAuth();
const db = getFirestore(app);

function DashboardCard04() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [sportsData, setSportsData] = useState(null); // State to store sports-related data
  const [isLoading, setIsLoading] = useState(false); // To track the loading state
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch modal visibility state from localStorage
  useEffect(() => {
    const modalState = localStorage.getItem('showModal');
    if (modalState === 'true') {
      setShowModal(true);
    }
  }, []);

  // Fetch messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      const user = auth.currentUser;
      if (user) {
        const messagesRef = collection(db, `Tactics/${user.uid}/UserInputs`);
        const q = query(messagesRef, orderBy('timestamp', 'desc')); // Order by timestamp
  
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const msgs = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              tactic: data.tactic,  // Get the tactic
              timestamp: data.timestamp,
            };
          });
          setMessages(msgs);
        });
  
        // Cleanup listener on unmount
        return () => unsubscribe();
      }
    };
  
    fetchMessages();
  }, []);

  // Combined function to fetch sports data and handle Firestore interaction
const handleAction = async () => {
  const user = auth.currentUser;

  if (user && input.trim() !== '') {
    try {
      setIsLoading(true); // Start loading

      // Send the input to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: input }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("API call successful. Sports data: ", data);
        setSportsData(data); // Store the fetched data in state
        setShowModal(true); // Show the modal with the video
        localStorage.setItem('showModal', 'true'); // Store modal visibility state in localStorage

        // Create a message object with the output from Flask API
        const newMessage = {
          tactic: `TacticAI: ${data.output || 'No plays found'}`,  // Add the message or output
          timestamp: new Date(new Date().getTime() + 20000),
        };

        // Firestore: Save user input and sports data as messages in Tactics collection
        const tacticsRef = collection(db, `Tactics/${user.uid}/UserInputs`);
        const docRef = await addDoc(tacticsRef, newMessage);
        console.log("Message saved with ID: ", docRef.id); // Log the document ID
      } else {
        console.error("Error from Flask API: ", data.error);
        alert("Error from Flask API: " + data.error);
      }

      // Firestore: Save user input inside Tactics collection as well
      const tacticsRef = collection(db, `Tactics/${user.uid}/UserInputs`);
      const docRef = await addDoc(tacticsRef, {
        tactic: input,  // Store user input
        timestamp: new Date(),
      });
      console.log("User input saved with ID: ", docRef.id);  // Log the document ID

      // Clear the input after sending
      setInput('');
    } catch (error) {
      console.error("Error running script or adding document: ", error);
      alert("Error running the script or saving to Firestore.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  } else {
    console.log("User is not logged in or input is empty.");
  }
};
  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem('showModal', 'false');
    window.location.reload();
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chat with TacticAI</h2>
      </header>
  
      {/* Display past messages like a chat app */}
      <div className="p-5 overflow-y-auto max-h-65"> {/* Set max-height and scrolling */}
  {messages.length > 0 ? (
    messages.map((msg, index) => (
      <div
        key={index}
        className={`mb-3 p-3 rounded-lg ${
  msg.tactic && msg.tactic.startsWith('TacticAI') // Check if it starts with 'TacticAI'
    ? 'bg-violet-900 dark:bg-violet-600 text-white' // Apply violet color
    : 'bg-blue-900 dark:bg-blue-600 text-white' // Apply gray color otherwise
}`}
      >
        <p>{msg.tactic}</p> {/* Display the tactic */}
        <small className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(msg.timestamp.seconds * 1000).toLocaleString()}
        </small>
      </div>
    ))
  ) : (
    <p className="text-gray-500 dark:text-gray-400">Get started with a Generated Play.</p>
  )}
</div>
  
      {/* Show loading state if data is being fetched */}
{/* Show loading state if data is being fetched */}
{isLoading && (
  <div className="mb-3 mt-5 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 max-w-md mx-auto">
    <div className="flex items-center space-x-3">
      <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse flicker"></div>
      <div className="text-sm font-sans">Hmm... I'm Thinking</div>
    </div>
  </div>
)}

      {/* Search Bar with Submit Button */}
      <div className="mt-auto p-6">
        <div className="flex items-center border rounded-md dark:bg-gray-700 dark:border-gray-600">
          <input
            type="text"
            placeholder="Describe your play..."
            className="w-full p-2 bg-transparent outline-none dark:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default Enter key behavior
                handleAction(); // Call the combined function
              }
            }}
          />
          <button
            className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
            onClick={handleAction} // Call the combined function on click
          >
            ➤
          </button>
        </div>
      </div>

      {/* Modal to display video */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-4xl w-full backdrop-blur-lg bg-opacity-40 border border-gray-300 dark:border-gray-700">
            <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">TacticAI</h2>
            <div className="flex justify-center mb-6">
              <iframe
                width="800"
                height="450"
                src="https://tacticaivideos.s3.us-east-2.amazonaws.com/video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardCard04;
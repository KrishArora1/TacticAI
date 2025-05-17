import React from 'react';
import Tooltip from '../../components/Tooltip';

function DashboardCardVideo() {
  // Video URL (Replace with your desired video link)
  const videoUrl = "https://tacticaivideos.s3.us-east-2.amazonaws.com/video"; 
  
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Generated Play</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Embedded video content</div>
        </Tooltip>
      </header>
      <div className="p-5">
        <video controls width="100%" className="rounded-lg">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default DashboardCardVideo;

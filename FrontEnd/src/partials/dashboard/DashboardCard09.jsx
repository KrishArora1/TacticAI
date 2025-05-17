import React from 'react';
import Tooltip from '../../components/Tooltip';
import RadarChart from '../../charts/RadarChart';

function DashboardCard09({ selectedPlayer }) {
  const defaultStats = {
    labels: ['Speed', 'Strength', 'Throwing', 'Agility', 'Defense', 'Tackling'],
    datasets: [
      {
        label: 'Select a player',
        data: [0, 0, 0, 0, 0, 0], // Default empty stats
        backgroundColor: 'rgba(200, 200, 200, 0.2)',
        borderColor: 'rgba(200, 200, 200, 1)',
        pointBackgroundColor: 'rgba(200, 200, 200, 1)',
      },
    ],
  };

  // Update to use attributes instead of stats
  const chartData = selectedPlayer
    ? {
        labels: ['Speed', 'Strength', 'Throwing', 'Agility', 'Defense', 'Tackling'],
        datasets: [
          {
            label: selectedPlayer.name,
            data: selectedPlayer.attributes, // Changed from stats to attributes
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      }
    : defaultStats;

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Player Stats</h2>
        <Tooltip className="ml-2" size="lg">
          <div className="text-sm">Comparison of key attributes</div>
        </Tooltip>
      </header>
      <div className="px-5 py-3">
        <div className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {selectedPlayer ? `Radar chart for ${selectedPlayer.name}` : 'Select a player'}
        </div>
      </div>
      <div className="grow flex justify-center items-center p-4">
        <RadarChart data={chartData} width={400} height={400} />
      </div>
    </div>
  );
}

export default DashboardCard09;
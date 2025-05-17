import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { getCssVariable } from '../../utils/Utils';

function DashboardCard06() {

  const chartData = {
    labels: ['Wins', 'Losses', 'Ties'],
    datasets: [
      {
        label: 'Team Record',
        data: [
          12, 4, 0
        ],
        backgroundColor: [
          getCssVariable('--color-green-500'),
          getCssVariable('--color-red-500'),
          getCssVariable('--color-yellow-800'),
        ],
        hoverBackgroundColor: [
          getCssVariable('--color-green-600'),
          getCssVariable('--color-red-600'),
          getCssVariable('--color-yellow-900'),
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Team Record</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <div className="relative">
        <DoughnutChart data={chartData} width={389} height={260} />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Move text up by 50 pixels */}
          <span className="text-4xl font-bold text-gray-800 dark:text-gray-100" style={{ transform: 'translateY(-30px)' }}>
            12-4
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard06;

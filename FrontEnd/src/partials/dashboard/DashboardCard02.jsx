import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';

function DashboardCard01() {

  const chartData = {
    labels: [
      '12-01-2022', '01-01-2023', '02-01-2023', '03-01-2023', '04-01-2023', '05-01-2023',
      '06-01-2023', '07-01-2023', '08-01-2023', '09-01-2023', '10-01-2023', '11-01-2023',
      '12-01-2023', '01-01-2024', '02-01-2024', '03-01-2024', '04-01-2024', '05-01-2024',
      '06-01-2024', '07-01-2024', '08-01-2024', '09-01-2024', '10-01-2024', '11-01-2024',
      '12-01-2024', '01-01-2025',
    ],
    datasets: [
      // Indigo line
      {
        data: [295.63, 306.28, 207.34, 293.08, 313.66, 221.36, 334.43, 191.59, 280.66, 294.38, 213.11, 278.98, 230.2, 331.28, 300.59, 214.84, 351.0, 303.39, 309.38, 290.34, 233.53, 162.17, 293.35, 264.82, 211.27, 285.53],
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0) },
            { stop: 1, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0.2) }
          ]);
        },            
        borderColor: getCssVariable('--color-violet-500'),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-violet-500'),
        pointHoverBackgroundColor: getCssVariable('--color-violet-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Passing Yards</h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Passing Yards Per Game</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">269.7</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+6%</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => context.parsed.y
              }
            }
          }
        }} />
      </div>
    </div>
  );
}

export default DashboardCard01;
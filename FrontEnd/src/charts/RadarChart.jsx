import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ data, width, height }) => {
  return <Radar data={data} options={{ responsive: true, maintainAspectRatio: false }} width={width} height={height} />;
};

export default RadarChart;
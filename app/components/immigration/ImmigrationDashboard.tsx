"use client";

import { useState } from 'react';
import ImmigrationOverview from './ImmigrationOverview';
import VisaBreakdown from './VisaBreakdown';
import AsylumStats from './AsylumStats';
import MapChart from '../charts/MapChart';
import LineChart from '../charts/LineChart';
import AsylumApplications from './AsylumApplications';
import RegionalBreakdown from '../charts/RegionalBreakdown';

const ImmigrationDashboard = () => {
  const [timeRange, setTimeRange] = useState('1Y');

  const chartData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Immigration Rate',
        data: [245000, 225000, 239000, 312000, 745000],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
      }
    ]
  };

  const mapData = [
    { id: "england", value: 682000 },
    { id: "scotland", value: 95000 },
    { id: "wales", value: 55000 },
    { id: "northern_ireland", value: 35000 }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
      {/* Time Range Selector */}
      <div className="col-span-full flex justify-end space-x-2">
        {['1Y', '5Y', '10Y', 'MAX'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded ${
              timeRange === range
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      <div className="col-span-full">
        <ImmigrationOverview />
      </div>


      {/* Immigration Trends Chart */}
      <div className="col-span-full xl:col-span-4 dashboard-card">
        <h3 className="text-xl font-bold mb-4">Immigration Trends</h3>
        <div className="h-96">
          <LineChart data={chartData} />
        </div>
      </div>

      {/* Detailed Breakdowns */}
      <div className="col-span-full">
        <VisaBreakdown />
      </div>

      {/* Regional Map */}
      <div className="col-span-full dashboard-card">
        <h3 className="text-xl font-bold mb-4">Regional Distribution</h3>
        <div className="h-[600px]">
          <MapChart data={mapData} />
        </div>
      </div>

      {/* Asylum Statistics */}
      <div className="col-span-full">
        <AsylumStats />
      </div>

      <div className="col-span-full">
        <AsylumApplications />
      </div>

      <div className="col-span-full">
        <RegionalBreakdown />
      </div>
    </div>
  );
};

export default ImmigrationDashboard; 
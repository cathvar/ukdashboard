"use client";

import StatsCards from './components/StatsCards';
import { useState } from 'react';
import './globals.css';
import ImmigrationDashboard from './components/immigration/ImmigrationDashboard';
import GDPGrowthChart from './components/charts/GDPGrowthChart';
import DebtToGDPChart from './components/charts/DebtToGDPChart';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-dashboard-light">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-dashboard-dark text-white shadow-xl transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-center">UK Economy</h2>
          <nav className="space-y-4">
            {['Overview', 'Public Debt', 'GDP', 'Market Data'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors
                hover:bg-accent-blue hover:bg-opacity-20 group"
              >
                <span className="group-hover:text-accent-blue">{item}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div 
        className={`${sidebarOpen ? 'ml-64' : 'ml-0'} 
        transition-all duration-300 ease-in-out min-h-screen`}
      >
        {/* Top navbar */}
        <div className="sticky top-0 z-20 bg-white shadow-md">
          <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </span>
              <button className="px-6 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-700 
                transition-colors duration-200 shadow-md hover:shadow-lg">
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 max-w-7xl mx-auto space-y-8">
          {/* Overview Section */}
          <section id="overview" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
            <StatsCards />
          </section>

          {/* Charts Section */}
          <section id="charts" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-card p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">GDP Growth Trend</h3>
              <div className="h-[400px] w-full">
                <GDPGrowthChart />
              </div>
            </div>
            <div className="dashboard-card p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Debt to GDP Ratio</h3>
              <div className="h-[400px] w-full">
                <DebtToGDPChart />
              </div>
            </div>
          </section>

          {/* Data Table Section */}
          <section id="data-table" className="dashboard-card overflow-hidden">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Historical Data</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GDP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Debt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interest Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024 Q{4-i}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£2.33T</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£2.58T</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4.5%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Immigration Dashboard Section */}
          <section className="p-6">
            <h2 className="text-2xl font-bold mb-6">Immigration Statistics</h2>
            <ImmigrationDashboard />
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t mt-8">
          <div className="max-w-7xl mx-auto py-6 px-4 text-center text-sm text-gray-600">
            <p>Data sources: ONS, Bank of England, Financial Times</p>
            <p className="mt-1">© 2024 UK Economic Dashboard</p>
          </div>
        </footer>
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from 'react';

const StatsCards = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/data/ons-data.json')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error loading stats:', error));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* ... rest of your component ... */}
    </div>
  );
};

export default StatsCards; 
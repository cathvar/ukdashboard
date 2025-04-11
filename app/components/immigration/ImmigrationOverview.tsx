"use client";

const ImmigrationOverview = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Main Migration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="dashboard-card">
          <h3 className="stat-label">Net Migration</h3>
          <p className="stat-value">672,000</p>
          <div className="flex items-center mt-1">
            <span className="stat-change stat-change-positive">↑ 24%</span>
            <span className="text-gray-500 text-sm ml-2">Year to June 2023</span>
          </div>
        </div>
        {/* ... existing cards ... */}
      </div>

      {/* Regional Distribution */}
      <div className="dashboard-card">
        <h3 className="text-xl font-bold mb-4">Regional Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Top 5 Regions by Immigration</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>London</span>
                <span className="font-semibold">35.2%</span>
              </li>
              <li className="flex justify-between">
                <span>South East</span>
                <span className="font-semibold">12.8%</span>
              </li>
              <li className="flex justify-between">
                <span>North West</span>
                <span className="font-semibold">8.7%</span>
              </li>
              <li className="flex justify-between">
                <span>West Midlands</span>
                <span className="font-semibold">7.9%</span>
              </li>
              <li className="flex justify-between">
                <span>East of England</span>
                <span className="font-semibold">7.4%</span>
              </li>
            </ul>
          </div>
          <div className="h-64 bg-gray-100 rounded">
            {/* We'll add a choropleth map of the UK here */}
            Map placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmigrationOverview; 
interface RegionalData {
  id: string;
  value: number;
  change?: string;
}

const RegionalBreakdown = () => {
  const data: RegionalData[] = [
    { id: "England", value: 682000, change: "+15.2%" },
    { id: "Scotland", value: 95000, change: "+8.7%" },
    { id: "Wales", value: 55000, change: "+5.3%" },
    { id: "Northern Ireland", value: 35000, change: "+4.1%" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Immigration by Nation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((region) => (
          <div 
            key={region.id}
            className="p-4 border rounded-lg bg-gray-50"
          >
            <h4 className="text-sm text-gray-600">{region.id}</h4>
            <div className="mt-1 flex items-end justify-between">
              <span className="text-2xl font-bold">
                {region.value.toLocaleString()}
              </span>
              {region.change && (
                <span className={`text-sm ${
                  region.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {region.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Total UK: {data.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
      </p>
    </div>
  );
};

export default RegionalBreakdown; 
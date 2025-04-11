const AsylumApplications = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Asylum Applications</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nationality</th>
              <th className="px-6 py-3 text-right">Applications</th>
              <th className="px-6 py-3 text-right">Year-on-Year Change</th>
            </tr>
          </thead>
          <tbody>
            {/* ... table content ... */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsylumApplications; 
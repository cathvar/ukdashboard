"use client";

const visaData = [
  {
    nationality: "India",
    total: 278576,
    breakdown: {
      work: 138561,
      student: 89243,
      family: 32451,
      other: 18321
    }
  },
  {
    nationality: "China",
    total: 143265,
    breakdown: {
      work: 41232,
      student: 76543,
      family: 15678,
      other: 9812
    }
  },
  {
    nationality: "Nigeria",
    total: 98732,
    breakdown: {
      work: 34521,
      student: 45678,
      family: 12321,
      other: 6212
    }
  },
  {
    nationality: "United States",
    total: 89654,
    breakdown: {
      work: 45678,
      student: 25432,
      family: 12543,
      other: 6001
    }
  },
  {
    nationality: "Pakistan",
    total: 76543,
    breakdown: {
      work: 23456,
      student: 34567,
      family: 13245,
      other: 5275
    }
  },
  {
    nationality: "Philippines",
    total: 65432,
    breakdown: {
      work: 34567,
      student: 15678,
      family: 10987,
      other: 4200
    }
  },
  {
    nationality: "Australia",
    total: 54321,
    breakdown: {
      work: 28765,
      student: 15432,
      family: 6543,
      other: 3581
    }
  },
  {
    nationality: "South Africa",
    total: 43210,
    breakdown: {
      work: 21543,
      student: 12345,
      family: 5432,
      other: 3890
    }
  }
];

const VisaBreakdown = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Visa Applications by Nationality</h3>
        <p className="text-sm text-gray-500">Top countries by visa type</p>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nationality</th>
              <th className="px-6 py-3 text-right">Work</th>
              <th className="px-6 py-3 text-right">Student</th>
              <th className="px-6 py-3 text-right">Family</th>
              <th className="px-6 py-3 text-right">Other</th>
              <th className="px-6 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {visaData.map((row) => (
              <tr key={row.nationality} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{row.nationality}</td>
                <td className="px-6 py-4 text-right">
                  {row.breakdown.work.toLocaleString()}
                  <span className="text-xs text-gray-500 ml-1">
                    ({((row.breakdown.work / row.total) * 100).toFixed(1)}%)
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {row.breakdown.student.toLocaleString()}
                  <span className="text-xs text-gray-500 ml-1">
                    ({((row.breakdown.student / row.total) * 100).toFixed(1)}%)
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {row.breakdown.family.toLocaleString()}
                  <span className="text-xs text-gray-500 ml-1">
                    ({((row.breakdown.family / row.total) * 100).toFixed(1)}%)
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {row.breakdown.other.toLocaleString()}
                  <span className="text-xs text-gray-500 ml-1">
                    ({((row.breakdown.other / row.total) * 100).toFixed(1)}%)
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold">
                  {row.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisaBreakdown; 
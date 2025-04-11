"use client";

import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';

interface GDPData {
  date: string;
  value: number;
  geography: string;
  geography_name: string;
  growthrate: number;
}

type SortField = keyof GDPData;
type SortDirection = 'asc' | 'desc';

export default function GDPDataset() {
  const [data, setData] = useState<GDPData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedRegion, setSelectedRegion] = useState('K02000001'); // Default to UK

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/gdp-data.csv');
        const csvText = await response.text();
        
        Papa.parse<GDPData>(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data);
          },
          error: (error: { message: string }) => {
            setError(`CSV parsing error: ${error.message}`);
          }
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  // Get unique regions for filter dropdown
  const regions = useMemo(() => {
    const uniqueRegions = new Set(data.map(row => row.geography));
    return Array.from(uniqueRegions).map(code => ({
      code,
      name: data.find(row => row.geography === code)?.geography_name || code
    }));
  }, [data]);

  // Sort and filter data
  const filteredAndSortedData = useMemo(() => {
    return data
      .filter(row => row.geography === selectedRegion)
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (sortField === 'value' || sortField === 'growthrate') {
          return sortDirection === 'asc' 
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }
        
        return sortDirection === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
  }, [data, selectedRegion, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {data.length > 0 && (
        <>
          <div className="mb-4">
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(({ code, name }) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th 
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('date')}
                  >
                    Time Period {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('value')}
                  >
                    GDP Value {sortField === 'value' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('growthrate')}
                  >
                    Growth Rate {sortField === 'growthrate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((row, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{Number(row.value).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{Number(row.growthrate).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
} 
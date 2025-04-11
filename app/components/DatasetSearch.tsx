"use client";

import { useState } from 'react';
import { debounce } from 'lodash';

interface Dataset {
  id: string;
  title: string;
  description: string;
  links: {
    latest_version: {
      href: string;
    };
  };
}

export default function DatasetSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDatasets = debounce(async (term: string) => {
    if (!term) {
      setDatasets([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.beta.ons.gov.uk/v1/datasets?q=${encodeURIComponent(term)}`);
      if (!response.ok) throw new Error('Failed to fetch datasets');
      
      const data = await response.json();
      setDatasets(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setDatasets([]);
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search ONS datasets (e.g., GDP, inflation, trade)..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchDatasets(e.target.value);
          }}
        />
      </div>

      {loading && (
        <div className="text-gray-600 p-4">Searching datasets...</div>
      )}
      
      {error && (
        <div className="text-red-500 p-4">Error: {error}</div>
      )}

      <div className="space-y-4">
        {datasets.map((dataset) => (
          <div key={dataset.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-bold text-lg mb-2">{dataset.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{dataset.description}</p>
            <div className="flex gap-2">
              <a 
                href={dataset.links.latest_version.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
              >
                View Dataset →
              </a>
            </div>
          </div>
        ))}
      </div>

      {searchTerm && !loading && datasets.length === 0 && !error && (
        <div className="text-gray-600 p-4">
          No datasets found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
} 
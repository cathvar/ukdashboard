"use client";

import { useState, useEffect } from 'react';

interface DatasetItem {
  id: string;
  title: string;
  value: number | string;
  date?: string;
}

interface Dataset {
  id: string;
  title: string;
  links: {
    latest_version: {
      href: string;
    };
  };
}

interface Props {
  dataset: Dataset;
  onRemove: () => void;
}

export default function DatasetDisplay({ dataset, onRemove }: Props) {
  const [data, setData] = useState<DatasetItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataset.links.latest_version.href);
        if (!response.ok) throw new Error('Failed to fetch dataset');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dataset');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataset]);

  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">{dataset.title}</h3>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>

      {loading && <div>Loading dataset...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {data && (
        <pre className="text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
} 
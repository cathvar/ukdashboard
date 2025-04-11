import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartTooltipContext {
  parsed: {
    y: number;
  };
}

const DebtToGDPChart = () => {
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Debt to GDP Ratio (%)',
        data: [85.2, 102.6, 95.9, 99.2, 98.4, 97.8],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'UK Public Sector Debt to GDP Ratio'
      },
      tooltip: {
        callbacks: {
          label: (context: ChartTooltipContext) => `Ratio: ${context.parsed.y}%`
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Ratio (%)'
        },
        suggestedMin: 80,
        suggestedMax: 105,
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Current Ratio:</span>
          <span className="ml-2 text-red-600">97.8%</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Year Change:</span>
          <span className="ml-2 text-green-600">-0.6%</span>
        </div>
      </div>
    </div>
  );
};

export default DebtToGDPChart; 
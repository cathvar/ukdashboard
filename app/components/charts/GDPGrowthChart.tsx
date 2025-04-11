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

interface TooltipContext {
  parsed: {
    y: number;
  };
}

const GDPGrowthChart = () => {
  const data = {
    labels: ['2019 Q1', 'Q2', 'Q3', 'Q4', '2020 Q1', 'Q2', 'Q3', 'Q4', '2021 Q1', 'Q2', 'Q3', 'Q4', '2022 Q1', 'Q2', 'Q3', 'Q4', '2023 Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'GDP Growth Rate (%)',
        data: [0.6, 0.1, 0.5, 0.0, -2.7, -19.4, 17.6, 1.3, -1.2, 5.6, 0.9, 1.1, 0.7, 0.2, -0.1, 0.1, 0.3, 0.2, 0.3, 0.1],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
        text: 'UK GDP Quarterly Growth Rate',
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipContext) => `Growth: ${context.parsed.y}%`
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Growth Rate (%)'
        },
        suggestedMin: -20,
        suggestedMax: 20,
      },
      x: {
        title: {
          display: true,
          text: 'Quarter'
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
          <span className="font-medium">Latest Quarter:</span>
          <span className="ml-2 text-blue-600">0.1%</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Year-on-Year:</span>
          <span className="ml-2 text-blue-600">0.6%</span>
        </div>
      </div>
    </div>
  );
};

export default GDPGrowthChart; 
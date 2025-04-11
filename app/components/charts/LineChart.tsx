import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }>;
}

interface LineChartProps {
  data?: ChartData;
  options?: Record<string, unknown>;
}

interface ChartTooltipContext {
  parsed: {
    y: number;
  };
}

const LineChart = ({ data, options = {} }: LineChartProps) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: ChartTooltipContext) => `Value: ${context.parsed.y}`
        }
      }
    },
  };

  // Provide default empty data if none is provided
  const defaultData = {
    labels: [],
    datasets: [{
      label: 'No Data',
      data: [],
      borderColor: '#cccccc',
      backgroundColor: '#cccccc',
    }]
  };

  return <Line data={data || defaultData} options={{ ...defaultOptions, ...options }} />;
};

export default LineChart; 
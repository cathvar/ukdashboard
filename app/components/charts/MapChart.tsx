// Remove these unused imports
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import ukGeography from './ukGeoData';

interface MapChartProps {
  data?: Array<{
    id: string;
    value: number;
  }>;
}

const MapChart = ({ data = [
  { id: "england", value: 682000 },
  { id: "scotland", value: 95000 },
  { id: "wales", value: 55000 },
  { id: "northern_ireland", value: 35000 }
] }: MapChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Regional Distribution</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map(item => (
          <div key={item.id} className="text-center p-4 border rounded-lg bg-gray-50">
            <div className="font-medium capitalize">
              {item.id.replace(/_/g, ' ')}
            </div>
            <div className="text-2xl font-bold mt-1">
              {item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapChart; 
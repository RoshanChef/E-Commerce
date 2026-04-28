import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Analytics() {
  const margin = { right: 24 };

  const xLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 3200, 2800, 9100, 3600, 3900];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 4100, 3700, 4200, 4600, 5000];

  return (
    <div className="bg-gray-50 p-2 rounded-2xl flex gap-2">

      <div className="flex flex-col gap-2 mb-8">

        {/* Revenue Card */}
        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm transition">
          <div className="h-[4px] bg-green-500 w-12 rounded-full mb-4"></div>

          <h2 className="text-lg">Total Revenue</h2>
          <div className="text-3xl font-bold text-gray-900 mt-1">$45,230</div>

          <div className="flex justify-between gap-2 mt-5">

            {/* Year */}
            <div className="text-center">
              <div className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-2 rounded-md">
                <p>+33%</p>
                <MiniBars color="bg-green-700" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Last Year</p>
            </div>

            {/* Month */}
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-2 rounded-md">
                <p>+33%</p>
                <MiniBars color="bg-yellow-700" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Last Month</p>
            </div>

            {/* Week */}
            <div className="text-center">
              <div className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-2 rounded-md">
                <p>-33%</p>
                <MiniBars color="bg-red-700" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Last Week</p>
            </div>

          </div>
        </div>

        {/* Volume Card */}
        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm transition">
          <div className="h-[4px] bg-indigo-500 w-12 rounded-full mb-4"></div>

          <h2 className="text-lg">Total Volume</h2>
          <div className="text-3xl font-bold text-gray-900 mt-1">1,230 Units</div>

          <div className="flex justify-between mt-5">

            <div className="text-center">
              <div className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-2 rounded-md">
                <p>+12%</p>
                <MiniBars color="bg-green-700" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Last Year</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-2 rounded-md">
                <p>+12%</p>
                <MiniBars color="bg-yellow-700" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Last Month</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-2 rounded-md">
                <p>-12%</p>
                <MiniBars color="bg-red-700" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Week</p>
            </div>

          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Analytics Overview
        </h2>

        <Box sx={{ width: '100%', height: 320 }}>
          <LineChart
            series={[
              { data: pData, label: 'sales', color: '#2F2FE4' },
              { data: uData, label: 'revenue', color: "#FFA02E" },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            yAxis={[{ width: 50 }]}
            margin={margin}
          />
        </Box>
      </div>

    </div >
  );
}

const MiniBars = ({ color }) => {
  return (
    <div className="flex items-center gap-[2px] mt-2">
      {new Array(11).fill(0).map((_, idx) => {
        const isHighlight = idx === 4 || idx === 5;

        return (
          <div
            key={idx}
            className={`w-[2.5px] ${isHighlight
              ? `${color} h-${idx - 2}`
              : 'bg-gray-300 h-2'
              }`}
          />
        );
      })}
    </div>
  );
};
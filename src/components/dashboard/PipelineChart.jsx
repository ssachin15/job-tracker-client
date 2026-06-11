import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

const STATUS_COLORS = {
  saved:     '#737373',
  applied:   '#3b82f6',
  interview: '#eab308',
  offer:     '#22c55e',
  rejected:  '#ef4444',
  withdrawn: '#525252',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
        <p className="text-gray-900 font-medium capitalize">{payload[0].payload.status}</p>
        <p className="text-gray-500">{payload[0].value} applications</p>
      </div>
    );
  }
  return null;
};

function PipelineChart({ breakdown }) {
  const data = Object.entries(breakdown).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="card">
      <h3 className="mb-6">Application pipeline</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={32}>
          <XAxis
            dataKey="status"
            tick={{ fill: '#737373', fontSize: 12, textAnchor: 'middle' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
          />
          <YAxis
            tick={{ fill: '#737373', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.status}
                fill={STATUS_COLORS[entry.status] || '#6366f1'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4">
        {data.map(({ status, count }) => (
          <div key={status} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: STATUS_COLORS[status] }}
            />
            <span className="text-gray-500 text-xs capitalize">
              {status} ({count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PipelineChart;
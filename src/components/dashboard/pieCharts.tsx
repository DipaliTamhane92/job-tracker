import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Job } from '../../types/job';

const COLORS = { Applied: '#3b82f6', Interview: '#8b5cf6', Offer: '#10b981', Rejected: '#ef4444' };

export const JobPieChart = ({ jobs }: { jobs: Job[] }) => {
  const data = [
    { name: 'Applied', value: jobs.filter(j => j.status === 'applied').length },
    { name: 'Interview', value: jobs.filter(j => j.status === 'interview').length },
    { name: 'Offer', value: jobs.filter(j => j.status === 'offer').length },
    { name: 'Rejected', value: jobs.filter(j => j.status === 'rejected').length },
  ].filter(d => d.value > 0);

  return (
    <div className="chart-container" style={{ height: 300, background: '#fff', padding: '15px', borderRadius: '8px' }}>
      <h4>Status Breakdown (%)</h4>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
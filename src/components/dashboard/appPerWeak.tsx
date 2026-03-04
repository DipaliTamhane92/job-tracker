import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import type { Job } from '../../types/job';

interface Props {
  jobs: Job[];
}

const ApplicationsPerWeekChart = ({ jobs }: Props) => {
  
  const getWeekStart = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = date.getDate() - day; // Back to Sunday
    const sunday = new Date(date.setDate(diff));
    return sunday.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const weeklyMap = jobs.reduce((acc: Record<string, number>, job) => {
    const weekStart = getWeekStart(job.date);
    acc[weekStart] = (acc[weekStart] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(weeklyMap)
    .map((week) => ({
      weekStart: week,
      name: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: weeklyMap[week],
    }))
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart));

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', color: '#1f2937' }}>
        Applications Per Week
      </h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />
            <YAxis 
              allowDecimals={false} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#111827' }}
            />
            <Bar 
              dataKey="count" 
              fill="#6366f1" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.count > 15 ? '#4f46e5' : '#818cf8'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ApplicationsPerWeekChart;
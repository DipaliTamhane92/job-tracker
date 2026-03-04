//import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
//import { getAllJobs } from '../../db';
import type { Job } from '../../types/job';

interface Props {
  jobs: Job[];
}

const DashboarChart = ({ jobs }: Props) => {
  // 1. Process data by Role
  const roleMap = jobs.reduce((acc: Record<string, number>, job) => {
    const role = job.role || 'Other';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  // 2. Format for Recharts
  const chartData = Object.keys(roleMap)
    .map((role) => ({
      name: role,
      count: roleMap[role],
    }))
    .sort((a, b) => b.count - a.count); // Sort highest to lowest

  // Modern professional color palette
  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e'];

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', color: '#1f2937' }}>Applications by Role</h3>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            layout="vertical" // Side-ways bars look better for long role names
            data={chartData} 
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
            <XAxis type="number" hide /> 
            <YAxis 
              dataKey="name" 
              type="category" 
              width={120} 
              axisLine={false} 
              tickLine={false}
              style={{ fontSize: '12px', fontWeight: 500 }}
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={25}>
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboarChart;
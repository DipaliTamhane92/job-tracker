import type { Job } from '../../types/job';
//import "../../styles/jobCard.css";

interface Props {
  jobs: Job[];
}

const StatsGrid = ({ jobs }: Props) => {
  // 1. Calculations
  const total = jobs.length;
  const interviews = jobs.filter(j => j.status === 'interview').length;
  const offers = jobs.filter(j => j.status === 'offer').length;
  
  // Conversion Rate (Interviews / Total Apps)
  const conversionRate = total > 0 ? ((interviews / total) * 100).toFixed(1) : 0;

  // 2. Card Data
  const stats = [
    { label: 'Total Applications', value: total, theme: 'indigo'},
    { label: 'Interviews Scheduled', value: interviews, theme: 'blue' },
    { label: 'Offers Received', value: offers, theme: 'emerald' },
    { label: 'Conversion Rate', value: `${conversionRate}%`, theme: 'orange' },
  ];

  // const themeMap: Record<string, string> = {
  //   indigo: "bg-indigo-500 shadow-indigo-100",
  //   blue: "bg-blue-500 shadow-blue-100",
  //   emerald: "bg-emerald-500 shadow-emerald-100",
  //   orange: "bg-orange-500 shadow-orange-100"
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="group relative bg-white border border-slate-200/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1">
          <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-${stat.theme}-500 shadow-[0_2px_10px_rgba(0,0,0,0.1)]`} />
            <div className='flex flex-col'>
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                {stat.label}
              </span>
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </span>
            </div>
            <div className={`absolute bottom-2 right-2 w-12 h-12 rounded-full bg-${stat.theme}-50/50 -z-0 group-hover:scale-110 transition-transform`} />
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
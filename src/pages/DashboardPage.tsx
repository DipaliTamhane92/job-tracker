import DashboarChart from "../components/dashboard/charts";
import { JobPieChart } from "../components/dashboard/pieCharts";
import type { Job } from '../types/job';
import ApplicationsPerWeekChart from "../components/dashboard/appPerWeak";
import StatsGrid from "../components/dashboard/statsCards";

interface DashboardProps {
  jobs: Job[];
}

const DashboardPage = ({ jobs }: DashboardProps) => {
   return(
     <>
        <div className="p-8 max-w-[1400px] mx-auto">
            <header className="mb-10">
               <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Performance Dashboard</h2>
               <p className="text-slate-500 mt-1 font-medium">Tracking your 2026 job search progress</p>
            </header>
            <StatsGrid jobs={jobs} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
               <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                  <h3 className="font-bold text-slate-700 mb-4">Applications by Role</h3>
                  <DashboarChart jobs={jobs} />
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                  <h3 className="font-bold text-slate-700 mb-4">Status Breakdown (%)</h3>
                 <JobPieChart jobs={jobs} />
               </div> 
            </div>
            <div className="grid grid-cols-1">
               <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                  <h3 className="font-bold text-slate-700 mb-4">Weekly Applications (%)</h3>
                 <ApplicationsPerWeekChart jobs={jobs} />
               </div> 
            </div>
        </div>
     </>
   )
}

export default DashboardPage;
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/layout";

import DashboardPage from "../pages/DashboardPage";
import JobPage from "../pages/JobsPage";
import AddJobPage from "../pages/AddJobPage";
import EditJobPage from "../pages/EditJobPage";
import SettingPage from "../pages/Settings";
import { getAllJobs } from "../db";
import type { Job } from "../types/job";
import { useCallback, useEffect, useState } from "react";
//import JobListPage from "../pages/JobListPage";

//<Route path="/jobs" element={ <JobPage/> } /> <Route path="/jobs" element={<JobListPage />} />

const AppRoutes = () => {

    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const refreshData = useCallback(
        async () => {
            try{
                const data = await getAllJobs();
                setTimeout(() => {
                    setJobs(data);
                }, 0);
               // setJobs(data);
            } catch(error) {
                console.error("Failed to fetch jobs:", error);
            }      
    }, []);
    
    // useEffect(() => {
    //     refreshData();
    // }, [refreshData]);

    useEffect(() => {
        let isMounted = true;
        refreshData().then(() => {
            if (!isMounted) return;
        });
        return () => { isMounted = false; };
    }, [refreshData]);

   return(
     
       <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={ <Navigate to="/dashboard" replace /> } />
              <Route path="/dashboard" element={ <DashboardPage /> } />
              <Route path="/jobs" element={ <JobPage jobs={ jobs } onEdit = {(job) => setSelectedJob(job)} refresh= {refreshData} /> } />
              <Route path="/jobs/add" element={ <AddJobPage selectedJob={selectedJob} refresh= {refreshData} clearSelection = {() => setSelectedJob(null)} /> } />
              <Route path="/jobs/:id/edit" element={ <EditJobPage /> } />
              <Route path="/settings" element={ <SettingPage /> } />
              
          </Route>
       </Routes>
    
   );
}

export default AppRoutes;
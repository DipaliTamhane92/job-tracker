import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/layout";

import DashboardPage from "../pages/DashboardPage";
import JobPage from "../pages/JobsPage";
import AddJobPage from "../pages/AddJobPage";
import EditJobPage from "../pages/EditJobPage";
import SettingPage from "../pages/Settings";

const AppRoutes = () => {
   return(
     
       <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={ <Navigate to="/dashboard" replace /> } />
              <Route path="/dashboard" element={ <DashboardPage /> } />
              <Route path="/jobs" element={ <JobPage/> } />
              <Route path="/jobs/add" element={ <AddJobPage /> } />
              <Route path="/jobs/:id/edit" element={ <EditJobPage /> } />
              <Route path="/settings" element={ <SettingPage /> } />
          </Route>
       </Routes>
    
   );
}

export default AppRoutes;
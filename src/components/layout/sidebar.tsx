import { NavLink } from "react-router-dom";

const SideBar = () => {
   return(
     <>
        <aside className="sidebar">
            <h2 className="logo">JobTrack</h2>
            <nav className="nav-links">
                <NavLink to="/dashboard" className="nav-item">
                    Dashboard
                </NavLink>
                <NavLink to="/jobs" className="nav-item">
                    Jobs
                </NavLink>
                <NavLink to="/jobs/add" className="nav-item">
                    Add Jobs
                </NavLink>
                <NavLink to="/settings" className="nav-item">
                    Settings
                </NavLink>
            </nav>
        </aside>
     </>
   );
}

export default SideBar;
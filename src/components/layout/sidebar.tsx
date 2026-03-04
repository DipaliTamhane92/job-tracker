import { NavLink } from "react-router-dom";
//import "../../styles/sidebar.css";

const SideBar = () => {
   return(
     <>
        <aside className="hidden md:flex w-64 bg-[#0f172a] text-slate-300 p-6 flex-col border-r border-white/5 h-screen sticky top-0">
            {/* <h2 className="mb-10 text-xl font-bold">JobTrack</h2> */}
            <div className="flex items-center gap-3 px-2 mb-10 text-white">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
                <span className="text-white italic">JT</span>
                </div>
                <span className="text-xl font-black tracking-tight">JobTrack</span>
            </div>
            <nav className="space-y-1.5">
                <NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all font-semibold text-sm">
                    Dashboard
                </NavLink>
                <NavLink to="/jobs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all text-sm font-medium">
                    Jobs
                </NavLink>
                {/* <NavLink to="/jobs/add" className="nav-item">
                    Add Jobs
                </NavLink> */}
                <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all text-sm font-medium">
                    Settings
                </NavLink>
            </nav>
        </aside>
     </>
   );
}

export default SideBar;
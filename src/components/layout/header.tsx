//import { useLocation } from "react-router-dom";
//import "../../styles/header.css";

const Header = () => {
   // const location = useLocation();

    // const getTitle = () => {
    //     if(location.pathname.includes("dashboard")) return "Dashboard";
    //     if(location.pathname.includes("jobs/add")) return "Add Job";
    //     if(location.pathname.includes("jobs") && location.pathname.includes("edit")) return "Edit Job";
    //     if(location.pathname.includes("jobs")) return "Jobs";
    //     if(location.pathname.includes("settings")) return "Settings";
    //     return "";
    // }
   return(
     <>
       {/* <header>
          <h1>{getTitle()}</h1>
          <button className="theme-btn">🌙</button>
       </header> */}
        <header className="h-16 bg-white/80 backdrop-blur-md sticky top-0 z-20 px-8 flex justify-between items-center border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm font-medium">Overview</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold text-sm">Performance</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors">
              <span className="text-xs">🔔</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-1" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-md">
              JD
            </div>
          </div>
        </header>
        {/* <h1>{getTitle()}</h1> */}
     </>
   )
}

export default Header
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    const getTitle = () => {
        if(location.pathname.includes("dashboard")) return "Dashboard";
        if(location.pathname.includes("jobs/add")) return "Add Job";
        if(location.pathname.includes("jobs") && location.pathname.includes("edit")) return "Edit Job";
        if(location.pathname.includes("jobs")) return "Jobs";
        if(location.pathname.includes("settings")) return "Settings";
        return "";
    }
   return(
     <>
       <header>
          <h1>{getTitle()}</h1>
          <button className="theme-btn">🌙</button>
       </header>
     </>
   )
}

export default Header
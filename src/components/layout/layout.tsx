import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import Header from "./header";
import "../../styles/layout.css";

const Layout = () => {
   return(
     <>
        <div className="app-container">
            <SideBar />
            <div className="main-section">
                <Header />
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
     </>
   )
}

export default Layout;
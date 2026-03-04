import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import Header from "./header";
//import "../../styles/layout.css";

const Layout = () => {
   return(
     <>
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="p-6 flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
     </>
   )
}

export default Layout;
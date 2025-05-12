import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./mainLayout.css";

const MainLayout = () => {
  return (
    <div className="app relative flex min-h-screen">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10 min-h-full w-full bg-gray-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="content flex-1 flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

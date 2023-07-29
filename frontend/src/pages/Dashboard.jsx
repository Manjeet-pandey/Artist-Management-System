import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="outlet-container">
          <Outlet /> {/* This will render child routes */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

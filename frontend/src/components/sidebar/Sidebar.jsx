import { Link, useNavigate } from "react-router-dom";
import { PiGear } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Artist from "../../assets/images/artist.png";
export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex flex-col min-h-screen  bg-gray-100 border-r p-4">
      <div className="text-2xl font-bold mb-4">Logo</div>
      <div className="flex-grow">
        <ul className="list-none p-0">
          <li className="mb-4">
            <Link
              to="/dashboard/users"
              className="flex items-center text-black py-2 px-4 rounded-lg"
            >
              <FiUser className="mr-2" /> Users
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard/artists"
              className="flex items-center text-black py-2 px-4 rounded-lg"
            >
              <img src={Artist} alt="Artist" className="w-4 h-4 mr-2" />
              Artists
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className=" w-full flex items-center text-black py-2 px-4 rounded-lg"
        >
          <PiGear className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

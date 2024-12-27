import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { FaRegUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../Authcontext/Context";


const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // Don't render sidebar if not authenticated

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user instead of token
    setUser(null);
    window.location.href = "/login";
  };
  const menuItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      onClick: () => navigate("/home"),
    },
    {
      title: "Profile",
      icon: <FaRegUser />,
      onClick: () => navigate("/profile"),
    },
    { title: "Setting", icon: <FaCog />, onClick: () => navigate("/settings") },
    { title: "Logout", icon: <FaSignOutAlt />, onClick: handleLogout },
  ];

  return (
    <div
      className={`h-screen bg-purple-800 flex flex-col p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } relative transition-all duration-500 ease-in-out`}
    >
      <BsArrowLeftShort
        className={`text-4xl text-violet-800 bg-blue-400 rounded-full absolute -right-5 top-9 border-dark-purple cursor-pointer transition-transform duration-300 ${
          open ? "" : "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />

      <div className="flex items-center">
        <AiFillEnvironment
          className={`text-3xl bg-amber-300 rounded cursor-pointer duration-300 flex-shrink-0 mr-2 ${
            !open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          <strong>Shinobis..</strong>
        </h1>
      </div>

      <div
        className={`flex items-center bg-zinc-500 rounded-md p-2 mt-6 ${
          open ? "w-full" : "w-12"
        } transition-all duration-300`}
      >
        <BsSearch className="text-white text-lg" />
        <input
          type="text"
          placeholder="Search"
          className={`bg-transparent text-white ml-2 border-none outline-none ${
            !open && "hidden"
          }`}
        />
      </div>

      <ul className="mt-[40px]">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={item.onClick}
            className="flex items-center text-white p-2 hover:bg-violet-600 rounded-md cursor-pointer gap-x-4 mb-5"
          >
            <span className="text-2xl">{item.icon}</span>
            <span
              className={`text-lg font-medium duration-300 ${
                !open && "scale-0"
              }`}
            >
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

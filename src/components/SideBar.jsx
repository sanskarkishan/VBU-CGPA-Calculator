import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { SiBt } from "react-icons/si";

export const SideBar = ({ isOpen, toggle }) => {
  const location = useLocation();

  const navItems = [
    { path: "/btech", icon: <SiBt />, label: "BTech" },
    { path: "/diplomaToBtech", icon: <SiBt />, label: "Diploma to BTech" },
    
  ];

  return (
    <div
      className={`h-full bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out
      ${isOpen ? "w-70" : "w-20"} flex flex-col pt-5 relative`}
    >
      
      <button
        onClick={toggle}
        className="absolute top-5 right-[-16px] bg-blue-600 text-white p-2 rounded-full shadow-md z-50
             ring-2 ring-blue-300 hover:ring-4 hover:ring-blue-400 transition duration-300 hover:cursor-pointer"
      >
        {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>

      
      <h1
        className={`text-2xl font-bold px-4 mb-6 whitespace-nowrap transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        VBU CGPA Calculator
      </h1>

      
      <ul className="flex flex-col gap-2 text-lg font-semibold pl-3">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <li
              className={`flex items-center px-4 py-2 mr-4 rounded-3xl transition duration-200 cursor-pointer ${
                location.pathname === item.path
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`ml-2 transition-all duration-300 whitespace-nowrap ${
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {item.label}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

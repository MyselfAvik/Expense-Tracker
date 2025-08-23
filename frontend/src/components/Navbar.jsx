import React from "react";
import { useApp } from "../context/Context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { logout, isLoggedIn } = useApp();
  return (
    <div className="h-16 w-full sticky top-0 bg-white shadow-lg z-50 px-2">
      <div className="max-w-6xl h-full w-full flex justify-between items-center mx-auto">
        <span className="text-violet-700 font-semibold text-2xl">
          Expense Tracker
        </span>
        <div>
          {isLoggedIn ? (
            <div>
              <button
                onClick={logout}
                className="relative cursor-pointer px-6 py-3 text-2xl font-semibold bg-white rounded-xl group"
              >
                Logout
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
          ) : (
            <div className="flex sm:gap-6">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `relative cursor-pointer px-3 sm:px-6 py-3 text-2xl font-semibold  transition-colors duration-300 group ${
                    isActive
                      ? "border-b-4 border-violet-700 text-violet-700 hidden"
                      : "text-gray-700"
                  }`
                }
              >
                Login
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `relative cursor-pointer px-3 sm:px-6 py-3 text-2xl font-semibold transition-colors duration-300 group ${
                    isActive
                      ? "hidden"
                      : "text-gray-700"
                  }`
                }
              >
                Register
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

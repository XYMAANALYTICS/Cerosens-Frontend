import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedRouteStore from "../../store/protectedRouteStore";
import useLogout from "../../hooks/useLogout";
import { IoPersonCircleOutline } from "react-icons/io5";

import iconMap from "../../utils/iconMap";
import imageMap from "../../utils/imageMap";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const userRole = useProtectedRouteStore((s) => s.userRole);
  const userName = useProtectedRouteStore((s) => s.userName);
  const [isAdminHovered, setIsAdminHovered] = useState(false);

  const location = useLocation();
  const activePath = location.pathname;

  // prettier-ignore
  const routeMap = [
    { route: "/admin", label: "Admin", icon: <iconMap.MdAdminPanelSettings /> },
    { route: "/", label: "Dashboard", icon: <iconMap.IoSpeedometer /> },
    { route: "/reports", label: "Reports", icon: <iconMap.FaFileExcel /> },
    { route: "/analytics", label: "Analytics", icon: <iconMap.FaChartLine /> },
    { route: "/settings", label: "Settings", icon: <iconMap.FaGear /> },
  ];


  return (
    <div className="w-full h-[100%] shadow bg-[#20212c] border-white/40">
      <div className="h-full w-full flex justify-between p-2">
        <img
          src={imageMap.xymaWhite}
          alt="xymaLogo"
          className="max-w-[100px]"
        />
        <div className="flex items-center justify-center font-bold text-white">
          Thickness Measurement Device
        </div>
        <div className="flex items-center gap-4 heading-txt-color">
          {routeMap.map(({ route, label, icon }) => {
            if (route === "/admin" && userRole !== "superAdmin") return null;
            // Special case for Admin with dropdown
            if (route === "/admin" && userRole === "superAdmin") {
              return (
                <div
                  key={route}
                  className="relative text-[8px] md:text-[10px] 2xl:text-[12px]"
                  onMouseEnter={() => setIsAdminHovered(true)}
                  onMouseLeave={() => setIsAdminHovered(false)}
                >
                  <button
                    className={`hover-effect flex items-center gap-1 hover:from-[#4F8CFF] to-[#2F6BFF]  ${
                    activePath === route || activePath === "/admin/configure" || activePath === "/admin/Ascan" || activePath ==="/admin/access-db"
                      ? "bg-white/30 text-[#38CE3C] border p-1 border-[#38CE3C] rounded-lg  transition-all duration-300"
                      : "text-gray-200 hover:bg-white/20 hover:text-[#38CE3C] rounded-lg p-1 "
                  }`}
                    onClick={() => navigate(route)}
                  >
                   {icon} {label} 
                  </button>

                  {isAdminHovered && (
                    <div className="absolute top-full left-0  w-40 bg-gradient-to-r from-[#252536] to-[#181824] text-white rounded shadow-lg z-50">
                      <button
                        className="block w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-[#8a8a8d] to-[#252536] hover:text-[#38CE3C]"
                        onClick={() => navigate("/admin/configure")}
                      >
                        Configure
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-[#8a8a8d] to-[#252536] hover:text-[#38CE3C]"
                        onClick={() => navigate("/admin/Ascan")}
                      >
                        Ascan
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-[#8a8a8d] to-[#252536] hover:text-[#38CE3C]"
                        onClick={() => navigate("/admin/access-db")}
                      >
                        Access DB
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-[#8a8a8d] to-[#252536] hover:text-[#38CE3C]"
                        onClick={() => navigate("/admin/other-option")}
                      >
                        Other Option
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={route}
                className={`
                  relative flex items-center gap-1 font-bold px-3 py-1 rounded-lg text-[8px] md:text-[10px] 2xl:text-[12px]
                  transition-all duration-300
                  ${
                    activePath === route
                      ? "bg-white/30 text-[#38CE3C] border border-[#38CE3C]"
                      : "text-gray-200 hover:bg-white/20 hover:text-[#38CE3C]"
                  }
                `}
                onClick={() => navigate(route)}
              >
               {icon}  {label} 
              </button>
            );
          })}
          <div className="relative z-50 py-1 px-3 rounded-full text-white backdrop-blur-md shadow-md flex items-center justify-center gap-1 group cursor-pointer">
            <IoPersonCircleOutline className="text-[130%]" />

            {/* Tooltip */}
            <div
              className="
      absolute top-full mt-2 left-1/2 -translate-x-1/2 
      bg-[#2a2a38] text-white text-sm px-3 py-1 rounded-lg 
      opacity-0 group-hover:opacity-100 
      transition-all duration-300 
      whitespace-nowrap
      shadow-lg border border-white/20
      z-50
    "
            >
              {userName}
            </div>
          </div>

          <button
            className=" hover-effect flex items-center justify-center gap-1  p-1 rounded-2xl bg-red-400"
            onClick={logout}
          >
            <iconMap.ImExit className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

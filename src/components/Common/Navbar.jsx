import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedRouteStore from "../../store/protectedRouteStore";
import useLogout from "../../hooks/useLogout";
import { IoPersonCircleOutline } from "react-icons/io5";

import iconMap from "../../utils/iconMap";
import imageMap from "../../utils/imageMap";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const userRole = useProtectedRouteStore((s) => s.userRole);
  const userName = useProtectedRouteStore((s) => s.userName);
  const [isAdminHovered, setIsAdminHovered] = useState(false);

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
        <img src={imageMap.xymaWhite} alt="xymaLogo" className="max-w-[100px]" />
        <div className="flex items-center justify-center font-bold text-white">
          Thickness Measurement Device
        </div>
        <div className="flex items-center gap-4 heading-txt-color">
          <div className="py-1 px-3 rounded-full text-white bg-white/20 backdrop-blur-md shadow-md border border-white/50 flex items-center justify-center gap-1">
            <IoPersonCircleOutline className="text-[130%]"/>
            {userName}
          </div>
          {routeMap.map(({ route, label, icon }) => {
            if (route === "/admin" && userRole !== "superAdmin") return null;
            // Special case for Admin with dropdown
            if (route === "/admin" && userRole === "superAdmin") {
              return (
                <div
                  key={route}
                  className="relative"
                  onMouseEnter={() => setIsAdminHovered(true)}
                  onMouseLeave={() => setIsAdminHovered(false)}
                >
                  <button
                    className="hover-effect flex items-center gap-1 text-white hover:from-[#4F8CFF] to-[#2F6BFF]"
                    onClick={() => navigate(route)}
                  >
                    {label} {icon}
                  </button>

                  {isAdminHovered && (
                    <div className="absolute top-full left-0  w-40 bg-gradient-to-r from-[#252536] to-[#181824] text-white rounded shadow-lg z-20">
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
                className="
  relative flex items-center gap-1 font-bold px-3 py-1 rounded-lg
  transition-all duration-300
  hover:bg-white/20
  hover:backdrop-blur-md
  hover:shadow-md
  hover:border hover:[#38CE3C]
  hover:text-[#38CE3C]
text-gray-200"
                onClick={() => navigate(route)}
              >
                {label} {icon}
              </button>
            );
          })}

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

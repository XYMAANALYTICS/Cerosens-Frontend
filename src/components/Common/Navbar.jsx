import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedRouteStore from "../../store/protectedRouteStore";
import useLogout from "../../hooks/useLogout";

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
    <div className="w-full h-[100%] navbar-bg shadow">
      <div className="h-full w-full flex justify-between p-2">
        <img
          src={imageMap.xymaBlue}
          alt="xymaLogo"
          className="max-w-[100px]"
        />
        <div className="flex items-center justify-center font-bold">Thickness Measurement Device</div>
        <div className="flex items-center gap-4 heading-txt-color">
          <div className="py-1 px-3 rounded-full bbb btn-bg text-white">{userName}</div>
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
                    className="hover-effect flex items-center gap-1 hover:text-[#692df5ee]"
                    onClick={() => navigate(route)}
                  >
                    {label} {icon}
                  </button>

                  {isAdminHovered && (
                    <div className="absolute top-full left-0  w-40 bg-[#692df5ee] text-white rounded shadow-lg z-20">
                      <button 
                        className="block w-full px-4 py-2 text-left hover:bg-[#9b72faee]"
                        onClick={() => navigate("/admin/configure")}
                      >
                        Configure
                      </button>
                       <button 
                        className="block w-full px-4 py-2 text-left hover:bg-[#9b72faee]"
                        onClick={() => navigate("/admin/Ascan")}
                      >
                        Ascan
                      </button>
                      <button 
                        className="block w-full px-4 py-2 text-left hover:bg-[#9b72faee]"
                        onClick={() => navigate("/admin/access-db")}
                      >
                        Access DB
                      </button>
                      <button 
                        className="block w-full px-4 py-2 text-left hover:bg-[#9b72faee]"
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
                className="hover-effect flex items-center gap-1 hover:text-[#692df5ee] hover:border-b font-bold"
                onClick={() => navigate(route)}
              >
                {label} {icon}
              </button>
            );
          })}

          <button
            className="underline hover-effect flex items-center gap-1"
            onClick={logout}
          >
            Logout <iconMap.ImExit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

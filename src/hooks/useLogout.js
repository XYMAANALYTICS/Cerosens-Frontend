import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInterceptor";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.delete("/logout", {
        data: {
          refreshToken: localStorage.getItem("refreshToken"),
          accessToken: localStorage.getItem("accessToken"),
        },
        withCredentials: true,
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("handleLogout error catched!", error);
    }
  };

  return logout;
};

export default useLogout;

import { create } from "zustand";
import axiosInstance from "../lib/axiosInterceptor";

const useProtectedRouteStore = create((set) => ({
  isAuthenticated: false,
  loading: true,
  userRole: null,
  userName: null,
  userEmail: null,
  acceptedTC: false,

  verifyAccessToken: async () => {
    try {
      const response = await axiosInstance.get("/verifyToken");

      if (response.status === 200) {
        set({
          isAuthenticated: true,
          userRole: response.data.role,
          userName: response.data.name,
          userEmail: response.data.email,
        });

        set({ acceptedTC: response.data.acceptedTC === "yes" });
      }
    } catch (error) {
      console.error("Protected route error catched!", error);
      set({ isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProtectedRouteStore;

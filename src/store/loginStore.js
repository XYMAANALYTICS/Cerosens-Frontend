import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const useLoginStore = create((set, get) => ({
  username: "",
  password: "",
  viewPassword: false,
  forgotPasswordUI: false,
  forgotUsername: "",
  loading: false,

  setState: (partial) => set(partial),

  userLogin: async () => {
    const { username, password } = get();
    try {
      const response = await axios.post(`${API_URL}/userLogin`, {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("loggedInTime", response.data.loggedInTime);

        set({ username: "", password: "" });
        return response.data.role;
      }
    } catch (error) {
      toast.error("Login failed!");
      console.error("userLogin error catched!", error);
    }
  },

  handleForgotPassword: async () => {
    const { forgotUsername } = get();

    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/forgotPassword`, {
        userName: forgotUsername,
      });

      if (response.status === 200) {
        toast.success("Request received!");
      }
    } catch (error) {
      if (error.response?.data?.message === "Invalid User!") {
        toast.error("Invalid User!");
      } else {
        toast.error("Request Failed!");
      }
      console.error("Error from handleForgotPassword", error);
    } finally {
      set({ forgotUsername: "", loading: false });
    }
  },
}));

export default useLoginStore;

import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInterceptor";

const useSettingsStore = create((set, get) => ({
  passwordPopup: false,
  requestFor: "",
  oldPassword: "",
  newPassword: "",

  setState: (partial) => set(partial),

  setSettingsData: async (userEmail, userName) => {
    const { requestFor, oldPassword, newPassword } = get();
    try {
      const response = await axiosInstance.post("/setSettingsData", {
        requestFor,
        userEmail,
        oldPassword,
        newPassword,
        userName,
      });

      if (response.status === 200) {
        //  response for verify password
        if (requestFor === "verify") {
          toast.info(response.data.message);
          // old password is valid
          if (response.data.isValid) {
            set({ requestFor: "reset" });
          }
        }
        // responses other than password verify
        else {
          toast.success(response.data.message);
          set({ passwordPopup: false });
        }
        set({ oldPassword: "", newPassword: "" });
      }
    } catch (error) {
      console.error("setSettingsData error catched!", error);
    }
  },

  resetState: () => {
    set({
      passwordPopup: false,
      requestFor: "",
      oldPassword: "",
      newPassword: "",
    });
  },
}));

export default useSettingsStore;

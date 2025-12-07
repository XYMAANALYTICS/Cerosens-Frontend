import { create } from "zustand";
import axiosInstance from "../lib/axiosInterceptor";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const useAdminStore = create((set, get) => ({
  // get user data
  users: [],
  userActivity: [],
  filterUser: "",
  filterActivity: "",

  // form state
  Name: "",
  Email: "",
  Password: "",
  Role: "user",

  confirmationPopup: false,
  requestFor: "",
  userId: "",
  selectedUser: "",
  newPassword: "",

  //Api Status
  Status: "",
  UserProjectName: "",
  RoleAccess: "User",

  count: 1,
  usercount: 1,

  //Add project
  ProjectName: "",

  //Add user
  Username: "",
  UserID: "",
  Password: "",

  //Project particular user Devices:
  ProjectDevices: [],

  UsertableList: [],

  //settings page
  Pulse_width: "",
  Amplitude: "",
  Mode: "",
  Filter: "",
  Gain: "",
  start: "",

  //Ascan settings:
  Ascan_btn: "",
  Ascan: false,
  Ascan_Datas: [],
  x_axis: [],
  ProcessName: "",
  SaveTags: false,
  markers: [],
  lineData: [{ labels: [], datasets: [] }],
  zoomKey: 0,
  AscanLog: false,
  //ascan start stop positions
  start: "",

  SubChildSidebar: "1",

  setState: (partial) => set(partial),

  // get admin data
  getAdminData: async () => {
    const { filterUser, filterActivity } = get();
    try {
      const response = await axiosInstance.get("/getAdminData", {
        params: {
          filterUser,
          filterActivity,
        },
      });
      if (response.status === 200) {
        set({
          users: response.data.users,
          userActivity: response.data.userActivity,
        });
      }
    } catch (error) {
      console.error("getAdminData error catched!");
    }
  },

  // register users
  addCredential: async () => {
    const { Name, Email, Password, Role, getAdminData } = get();
    try {
      const response = await axios.post(`${API_URL}/userSignup`, {
        Email,
        Password,
        Role,
        Name,
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        set({ Name: "", Email: "", Password: "", Role: "user" });
        getAdminData();
      }
    } catch (error) {
      console.error("addCredential error catched!", error);
      toast.error("Server Error!");
    }
  },

  //   set admin data
  setAdminData: async () => {
    const { requestFor, userId, newPassword, getAdminData } = get();
    try {
      const response = await axiosInstance.post("/setAdminData", {
        requestFor,
        userId,
        newPassword,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        set({
          requestFor: "",
          userId: "",
          selectedUser: "",
          newPassword: "",
          confirmationPopup: false,
        });
        getAdminData();
      }
    } catch (error) {
      console.error("setAdminData error catched!", error);
      toast.error("Server Error!");
    }
  },

  //set Project details
  setProjectDetails: async () => {
    const {
      ProjectName,
      count,
      usercount,
      Username,
      UserID,
      Password,
      ProjectDevices,
      Status,
      UserProjectName,
      RoleAccess,
    } = get();
    try {
      // console.log(ProjectDevices);
      if (Status === "Project") {
        const res = await axiosInstance.get("/AddParameters", {
          params: {
            Status,
            ProjectName,
            NOS: count,
            NOU: usercount,
            ProjectDevices: ProjectDevices.join(","),
          },
        });
        if (res.status === 200) {
          console.log("yes success");
        }
      } else if (Status === "UserAdd") {
        const res = await axiosInstance.get("/AddParameters", {
          params: {
            Status,
            UserID,
            Username,
            Password,
            UserProjectName,
            RoleAccess,
            ProjectDevices,
          },
        });
        if (res.status === 200) {
          console.log("yes success");
        }
      } else if (Status === "GetDetails") {
        const res = await axiosInstance.get("/AddParameters", {
          params: {
            Status,
          },
        });
        if (res.status === 200) {
          const resdata = res.data.data;
          set({
            UsertableList: resdata,
          });
        }
      }
    } catch (error) {
      console.error("Error datas", error);
    }
  },

  //set Project details
  setSettingsDetails: async (msg) => {
    const {
      Pulse_width,
      Amplitude,
      Mode,
      Filter,
      Gain,
      start,
      UserProjectName,
    } = get();
    try {
      if (msg === "GetSettings") {
        const res = await axiosInstance.get("/Add-Device-Setting", {
          params: {
            msg,
            Pulse_width,
            Amplitude,
            Mode,
            Filter,
            Gain,
            start,
            UserProjectName,
          },
        });

        if (res.status === 200) {
          toast.success("Successfully Saved..")
        }
      } else if (msg === "GetSettingsDatas") {
        const res = await axiosInstance.get("/Add-Device-Setting", {
          params: {
            msg,
            UserProjectName,
          },
        });

        if (res.status === 200) {
          const response_data = res.data.data;
          // console.log("response_data=",res.data.ascan_Status)
          set({
            Pulse_width: response_data.Pulse_width,
            Amplitude: response_data.Amplitude,
            Mode: response_data.Mode,
            Filter: response_data.Filter,
            Gain: response_data.Gain,
            start: response_data.start,
            // Ascan: res.data.ascan_Status,
          });
        }
      }
    } catch (error) {
      console.error("Error datas", error);
    }
  },

  setPeak: async (msg) => {
    const { ProcessName, markers } = get();
    console.log("ProcessName=", ProcessName);
    console.log("markers=", markers)
    try {
      const apires = await axiosInstance.get("/AssignPeak", {
        params: {
          ProcessName: ProcessName,
          markers: JSON.stringify(markers)
        }
      });
      console.log("response from the apires", apires)

    } catch (error) {
      console.error("Error datas", error)
    }
  },


  setAscan: async (msg) => {
    const { UserProjectName, ProcessName, markers, AscanLog, Ascan, SaveTags } =
      get();
    // console.log("messages=",msg);
    try {
      if (msg === "StartAscan") {
        try {
          const res = await axiosInstance.get("/SetAscan", {
            params: {
              msg,
              UserProjectName,
              ProcessName: `${UserProjectName}:${ProcessName}`,
            },
          });
          set({
            Ascan: true,
          })
        } catch (error) {
          if (error.response && error.response.status === 400) {
            console.log("Ascan Process name already exists...");
            toast.error("The process name is already in use and remains incomplete.");
          } else {
            console.log("Other error:", error);
          }
        }

      } else if (msg === "GetAscan") {
        console.log("Ascan Api being Called...")
        const res = await axiosInstance.get("/SetAscan", {
          params: {
            msg,
            UserProjectName,
            ProcessName,
            AscanLog,
          },
        });
        if (res) {
          let lineOptions = "";
          const response = res.data.ascan;
          const xaxis = res.data.x_axis;
          const hasAtSymbol = false
          const Processtag = res.data.process_tags.markers;
          if (Processtag) {
            lineOptions = JSON.parse(Processtag).map((data) => ({
              x: data?.x ?? 0,
              y: data?.y ?? 0,
              label: data?.label ?? "",
              value: data?.value ?? "",
            }));
          }

          if (hasAtSymbol) {
            set({
              Ascan: false,
              markers: lineOptions,
              start: res.data.process_tags.start,
            });
          }
          set({
            Ascan_Datas: response,
            x_axis: xaxis,
            markers: lineOptions,
            start: res.data.process_tags.start,
          });
        }
      } else if (msg === "StoreTags") {
        if (SaveTags === true) {
          const res = await axiosInstance.get("/SetAscan", {
            params: {
              msg,
              markers: JSON.stringify(markers), // ✅ stringify array
              ProcessName,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error datas", error);
    }
  },


  resetState: () =>
    set({
      AscanLog: false,
      users: [],
      userActivity: [],
      filterUser: "",
      filterActivity: "",
      Name: "",
      Email: "",
      Password: "",
      Role: "user",
      confirmationPopup: false,
      requestFor: "",
      userId: "",
      selectedUser: "",
      newPassword: "",
      ProjectDevices: [],
      ProjectName: "",
      Ascan: "",
      ProcessName: "",
      SaveTags: false,
      Ascan_Datas: [],
      UserProjectName: "",
      lineData: [],
      Pulse_width: "",
      Amplitude: "",
      Filter: "",
      Gain: "",
      start: "",
    }),
}));

export default useAdminStore;

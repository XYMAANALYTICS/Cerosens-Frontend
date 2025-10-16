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
  Frequency: "",
  Filter: "",
  Gain: "",
  Msps: "",
  start: "",
  Stop: "",

  //Ascan settings:
  Ascan_btn: "",
  Ascan: false,
  Ascan_Datas:[],
  ProcessName:"",
  SaveTags:false,
  markers:[],
  lineData:[{ labels: [], datasets: [] }],

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
      Frequency,
      Filter,
      Gain,
      Msps,
      start,
      UserProjectName,
      Stop,
    } = get();
    try {
      if (msg === "GetSettings") {
        const res = await axiosInstance.get("/Add-Device-Setting", {
          params: {
            msg,
            Pulse_width,
            Amplitude,
            Frequency,
            Filter,
            Gain,
            Msps,
            start,
            UserProjectName,
            Stop,
          },
        });

        if (res.status === 200) {
          console.log("yes success");
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
            Frequency: response_data.Frequency,
            Filter: response_data.Filter,
            Gain: response_data.Gain,
            Msps: response_data.Msps,
            start: response_data.start,
            Stop: response_data.Stop,
            // Ascan: res.data.ascan_Status,
          });
        }
      }
    } catch (error) {
      console.error("Error datas", error);
    }
  },

  setAscan: async (msg) => {
    const { UserProjectName,ProcessName,markers,Ascan_Datas } = get();
    // console.log("messages=",msg);
    try {
      if (msg === "StartAscan") {
        await axiosInstance.get("/SetAscan", {
          params: {
            msg,
            UserProjectName,
            ProcessName:`${UserProjectName}:${ProcessName}`,
          },
        });
      }else if(msg ==="GetAscan"){
        // console.log("Ascan Api being Called...")
        const res =  await axiosInstance.get("/SetAscan", {
          params: {
            msg,
            UserProjectName,
            ProcessName,
          },
        });
        if(res){
          const response = res.data.ascan;
          const hasAtSymbol = response.some(item => item.As.includes('@'));
          // console.log("Contains @:", hasAtSymbol);
          console.log("Ascan_Datas=",Ascan_Datas)
          if(hasAtSymbol){
            set({
              Ascan:false
            })
          }
          set({
            Ascan_Datas:response,
          })
        }
      }else if(msg === "StoreTags"){
          console.log("=======yess======",markers)
      }
    } catch (error) {
      console.error("Error datas", error);
    }
  },

  resetState: () =>
    set({
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
      ProcessName:"",
      SaveTags:false,
      Ascan_Datas:[],
      UserProjectName: "",
      lineData:[],
    }),
}));

export default useAdminStore;

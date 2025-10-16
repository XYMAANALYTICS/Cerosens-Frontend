import { create } from "zustand";
import axiosInstance from "../lib/axiosInterceptor";

const useDataStore = create((set) => ({
  data: [],
  lastData: {},
  activityStatus: "",
  ProjectName: [],
  DeviceList: [],
  UserDeviceist: [],
  NoU: "",
  NoS: "",
  GetAscanList:[],

  getData: async () => {
    try {
      const response = await axiosInstance.get("/getData");
      if (response.status === 200) {
        set({
          data: response.data.data,
          lastData: response.data.lastData,
          activityStatus: response.data.activityStatus,
        });
      }
    } catch (error) {
      console.error("getData error catched!", error);
    }
  },

  getprojectdata: async (msg) => {
    try {
      let res;

      if (!msg) {
        res = await axiosInstance.get("/AddParameters", {
          params: {
            Status: "GetProject",
          },
        });
        if (res.status === 200) {
          const projectname = res.data.data;
          const devicelist = res.data.devicelist;
          const datas = projectname.map((item) => item.ProjectName);
          set({
            ProjectName: datas,
            DeviceList: devicelist,
          });
        }
      } else if (
        typeof msg === "string" &&
        msg.startsWith("GetProjectDevice")
      ) {
        // console.log("yes inside the divsss...")
        res = await axiosInstance.get("/AddParameters", {
          params: {
            Status: msg,
          },
        });
        if (res.status === 200) {
          const devicelist = res.data.devicelist;
          set({
            UserDeviceist: devicelist,
          });
        }
      }
    } catch (error) {
      console.error("getProject error!", error);
    }
  },
  getAscandata: async () => {
    try{
      const response = await axiosInstance.get("/getAscan");
      if (response.status === 200) {
        set({
          data: response.data.data,
          lastData: response.data.lastData,
          activityStatus: response.data.activityStatus,
        });
      }
    }catch(error){
      console.error("getAscan error!", error);
    }
  },
   getAscanList: async () => {
    try{
      const response = await axiosInstance.get("/getAscanList");
      if (response.status === 200) {
        set({
          GetAscanList: response.data.data,
        });
      }
    }catch(error){
      console.error("getAscan error!", error);
    }
  },

  

  resetState: () => set({ data: [],  UserDeviceist: [], GetAscanList:[]}),
}));

export default useDataStore;

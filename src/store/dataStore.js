import { create } from "zustand";
import axiosInstance from "../lib/axiosInterceptor";
import { toast } from "react-toastify";

const useDataStore = create((set, get) => ({
  data: [],
  lastData: {},
  activityStatus: "",
  ProjectName: [],
  DeviceList: [],
  UserDeviceist: [],
  NoU: "",
  NoS: "",
  GetAscanList: [],
  GetAscanLogList: [],
  RespectiveDevice: [],
  SelectedDevice: "",
  SelectedLimit: "",
  Tof_from_date: new Date(),
  Tof_To_date: new Date(),
  TofData: [],
  TofTotalCount: 0,
  TofCurrentPage: 1,
  TofTotalPages: 0,
  AllTofdata: [],

  windowStop: "",
  windowStart: "",
  thresholdNeg: "",
  thresholdPos: "",

  window2Stop: "",
  window2Start: "",
  w2thresholdNeg: "",
  w2thresholdPos: "",

  setState: (partial) => set(partial),

  getData: async () => {
    try {
      const device = localStorage.getItem("Device");
      const Limits = localStorage.getItem("Limit");

      const response = await axiosInstance.get("/getData", {
        params: {
          Devices: device.toString(),
          Limit: Limits
        }
      });
      if (response.status === 200) {
        set({
          data: response.data.data,
          lastData: response.data.lastData,
          activityStatus: response.data.activityStatus,
          SelectedLimit: Limits,
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
    try {
      const response = await axiosInstance.get("/getAscan");
      if (response.status === 200) {
        set({
          data: response.data.data,
          lastData: response.data.lastData,
          activityStatus: response.data.activityStatus,
        });
      }
    } catch (error) {
      console.error("getAscan error!", error);
    }
  },
  getRespectiveDeviceList: async () => {
    try {
      const device_name = localStorage.getItem("Device");

      const getdevicelist = await axiosInstance.get('/getDeviceList');
      if (getdevicelist.status === 200) {
        const device = getdevicelist.data.data;
        set({
          RespectiveDevice: device.NoS,
          SelectedDevice: device_name
        })
      } else {
        console.log("Error code happend...")
      }

    } catch (error) {

    }
  },
  getAscanList: async () => {
    try {
      const response = await axiosInstance.get("/getAscanList");
      // console.log("GetAscanList=", response.data.data)
      if (response.status === 200) {
        set({
          GetAscanList: response.data.data,
        });
      }
    } catch (error) {
      console.error("getAscan error!", error);
    }
  },

  getAscanLogList: async () => {
    try {
      const response = await axiosInstance.get("/getAscanLogList");
      // console.log("GetAscanList=", response.data.data)
      if (response.status === 200) {
        set({
          GetAscanLogList: response.data.data,
        });
      }
    } catch (error) {
      console.error("getAscan error!", error);
    }
  },

  downloadTofCSV: async (msg) => {
    const { Tof_from_date, Tof_To_date, AllTofdata } = get();

    if (!Tof_from_date || !Tof_To_date) {
      toast.error("Please select From Date and To Date");
      return;
    }

    try {
      const res = await axiosInstance.post("/getTofdata", {
        Device: "XY001",
        Fromdate: Tof_from_date,
        Todate: Tof_To_date,
        page: 1,
        limit: 1000000   // fetch all rows
      });

      const data = res.data.data;
      if (!data || data.length === 0) {
        toast.error("No records found");
        return;
      }
      if (msg === "2") {
        console.log("alldata=",data)
        set({ AllTofdata: data });
      } else {

        // Convert JSON → CSV
        const header = Object.keys(data[0]).join(",");
        const rows = data.map(obj =>
          Object.values(obj).join(",")
        );

        const csvContent = [header, ...rows].join("\n");

        // Trigger download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "TofData.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }



    } catch (e) {
      console.log(e);
      toast.error("Failed to download CSV");
    }
  },

  getTofDate: async (page = 1, limit = 20) => {
    const { Tof_To_date, Tof_from_date, SelectedDevice } = get();

    try {
      if (!Tof_from_date || !Tof_To_date) {
        alert("Please select both From Date and To Date.");
        return;
      }

      const response = await axiosInstance.post("/getTofdata", {
        Device: SelectedDevice,
        Fromdate: Tof_from_date,
        Todate: Tof_To_date,
        page,
        limit
      });

      console.log("From Date:", Tof_from_date);
      console.log("To Date:", Tof_To_date);

      // Save results to store
      set({
        TofData: response.data.data,
        TofTotalCount: response.data.totalCount,
        TofCurrentPage: response.data.currentPage,
        TofTotalPages: response.data.totalPages,
      });

    } catch (error) {
      console.log("TOF fetch error:", error);
    }
  },
  setWindowValue: async (msg) => {
    const { windowStop, windowStart, thresholdNeg, thresholdPos, window2Stop, window2Start, w2thresholdNeg, w2thresholdPos } = get()
    try {
      if (msg === 1) {
        const response = await axiosInstance.post("/setWindows", {
          msg: msg,
          DeviceId: "XY001",
          window1_start: windowStart,
          window1_stop: windowStop,
          w1T_pos: thresholdPos,
          W1T_Neg: thresholdNeg,
          window2_start: window2Start,
          window2_stop: window2Stop,
          w2T_pos: w2thresholdPos,
          W2T_Neg: w2thresholdNeg,
        });

        if(response.status === 200){
          toast.success("Peak settings Saved..")
        }
      } else if (msg === 2) {
        const response = await axiosInstance.post("/setWindows", {
          msg: msg,
          DeviceId: "XY001"
        })
        set({
          windowStart: response.data.data.window1_start,
          windowStop: response.data.data.window1_stop,
          thresholdPos: response.data.data.w1T_pos,
          thresholdNeg: response.data.data.W1T_Neg,
          window2Start: response.data.data.window2_start,
          window2Stop: response.data.data.window2_stop,
          w2thresholdPos: response.data.data.w1T_pos,
          w2thresholdNeg: response.data.data.W2T_Neg,
        })
        // console.log("response data=", response.data)

      }

    } catch (error) {
      console.log("error", error)
    }
  },


  resetState: () => set({ data: [], UserDeviceist: [], AllTofdata: [], GetAscanList: [], GetAscanLogList: [] }),
}));

export default useDataStore;

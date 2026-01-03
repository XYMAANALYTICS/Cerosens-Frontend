import { create } from "zustand";
import axiosInstance from "../lib/axiosInterceptor";

const useReportsStore = create((set, get) => ({
  selectedReportType: "dateWise",
  fromDate: "",
  toDate: "",
  count: 100,
  groupBy: "hour",
  analyticsData: [],
  selectedfromdate: "",
  selectedtodate: "",
  setState: (partial) => set(partial),

  getReports: async (userEmail, userName, fromReports) => {
    const { selectedReportType, fromDate, toDate, count, groupBy } = get();
    try {
      console.log("from page inside store", fromReports);
      const response = await axiosInstance.get("/getReports", {
        params: {
          reportType: selectedReportType,
          fromDate,
          toDate,
          count,
          groupBy,
          fromReports,
          userEmail,
          userName,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("getReports error catched!", error);
    }
  },

 getAscan: async () => {
  const { selectedfromdate, selectedtodate } = get();

  try {
    const res = await axiosInstance.get("getAll_Ascan", {
      params: {
        fromDate: selectedfromdate,
        todate: selectedtodate,
      },
      responseType: "blob", // IMPORTANT
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ascan_Report.zip");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("getAscan report error", error);
  }
},


  resetState: () =>
    set({
      fromDate: "",
      toDate: "",
      count: 100,
      groupBy: "hour",
      analyticsData: [],
    }),
}));

export default useReportsStore;

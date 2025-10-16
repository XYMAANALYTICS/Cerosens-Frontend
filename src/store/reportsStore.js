import { create } from "zustand";
import axiosInstance from "../lib/axiosInterceptor";

const useReportsStore = create((set, get) => ({
  selectedReportType: "dateWise",
  fromDate: "",
  toDate: "",
  count: 100,
  groupBy: "hour",
  analyticsData: [],

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

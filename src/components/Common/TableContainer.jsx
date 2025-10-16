import { useEffect } from "react";
import useAdminStore from "../../store/adminStore";
import useReportsStore from "../../store/reportsStore";
import ReusableTable from "./ReusableTable";

const TableContainer = ({ fromPage }) => {
  const userActivity = useAdminStore((s) => s.userActivity);
  const filterUser = useAdminStore((d) => d.filterUser);
  const filterActivity = useAdminStore((d) => d.filterActivity);
  const getAdminData = useAdminStore((s) => s.getAdminData);

  const analyticsData = useReportsStore((s) => s.analyticsData);
  const selectedReportType = useReportsStore((s) => s.selectedReportType);

  let tableColumns = [];
  let tableData = [];

  // for admin
  if (fromPage === "admin") {
    tableColumns = [
      { label: "S.No", key: "index" },
      { label: "Email", key: "Email" },
      { label: "Name", key: "Name" },
      { label: "Activity", key: "ActivityType" },
      { label: "IP", key: "Ip" },
      { label: "ISP", key: "Isp" },
      { label: "Latitude", key: "Latitude" },
      { label: "Longitude", key: "Longitude" },
      { label: "City", key: "City" },
      { label: "Region", key: "Region" },
      { label: "Country", key: "Country" },
      { label: "Time", key: "Time" },
    ];

    tableData = userActivity;
  }
  // for analytics
  else {
    // for average
    if (selectedReportType === "averageData") {
      tableColumns = [
        { label: "S.No", key: "index" },
        { label: "Avg S1", key: "avgS1" },
        { label: "Avg S2", key: "avgS2" },
        { label: "Avg S3", key: "avgS3" },
        { label: "Avg S4", key: "avgS4" },
        { label: "Timestamp", key: "Timestamp" },
      ];
    }
    // for date wise, countwise, interval
    else {
      tableColumns = [
        { label: "S.No", key: "index" },
        { label: "S1", key: "S1" },
        { label: "S2", key: "S2" },
        { label: "S3", key: "S3" },
        { label: "S4", key: "S4" },
        { label: "Timestamp", key: "Timestamp" },
      ];
    }

    tableData = analyticsData;
  }

  useEffect(() => {
    if (fromPage === "admin") {
      getAdminData();
    }
  }, [filterUser, filterActivity]);

  // console.log("table container rendered");

  return <ReusableTable columns={tableColumns} data={tableData} />;
};

export default TableContainer;

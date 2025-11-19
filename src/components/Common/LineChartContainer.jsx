import { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { sensorColors, getLineChartOptions } from "../../utils/lineChartConfig";
import useDataStore from "../../store/dataStore";
import useReportsStore from "../../store/reportsStore";
import paramters from "../../store/addparameter";

const LineChartContainer = ({ chartRef, fromPage }) => {
  const dashboardData = useDataStore((s) => s.data);
  const CurrentLinechartOption = paramters((s) => s.CurrentLinechartOption);

  const analyticsData = useReportsStore((s) => s.analyticsData);
  const selectedReportType = useReportsStore((s) => s.selectedReportType);

  let data = [];

  if (fromPage === "dashboard") {
    data = dashboardData;
  } else {
    data = analyticsData;
  }

  // console.log("data in chart", data);

  //line chart
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });

  const generateLineData = (data, keyStart, firstKey) => {
    const reversedData = [...data].reverse();

    const timestamps = reversedData.map((item) => item.Timestamp);
    const sensorKeys = ["Thickness", "Signal", "DeviceTemp", "Battery", "AirQuality", "Altitude", "Pressure"];
    const datasets = [
      {
        label: CurrentLinechartOption,
        data: reversedData.map((item) => item[CurrentLinechartOption] || 0),
        borderColor: sensorColors[sensorKeys.indexOf(CurrentLinechartOption)],
        backgroundColor:sensorColors[sensorKeys.indexOf(CurrentLinechartOption)]+50, // 👈 adds transparency
        borderWidth: 2,
        pointRadius: 1,
        fill: true,
        hidden: false,
        tension: 0.3,
      },
    ];

    setLineData({
      labels: timestamps,
      datasets: datasets, 
    });

    setLineData({
      labels: timestamps,
      datasets: datasets,
    });
  };

  //line chart data
  useEffect(() => {
    if (!data || data.length === 0) return;
    // for dashboard and analytics -> date wise, countwise, interval
    if (fromPage === "dashboard" || selectedReportType !== "averageData") {
      generateLineData(data, "S", "SS");
    }
    // for analytics -> average option
    else {
      generateLineData(data, "a", "avgS1");
    }
  }, [data]);

  const lineOptions = useMemo(() => getLineChartOptions(), []);

  // console.log("line chart rendered",lineData);

  return data.length > 0 ? (
    <Line
      ref={chartRef}
      data={lineData}
      options={lineOptions}
      width={"100%"}
      height={200}
    />
  ) : (
    <div className="">No data available!</div>
  );
};

export default LineChartContainer;

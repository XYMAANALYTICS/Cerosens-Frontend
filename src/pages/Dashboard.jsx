import { useEffect, useRef } from "react";
import useDataStore from "../store/dataStore";

import LineChartContainer from "../components/Common/LineChartContainer";
import SensorCard from "../components/Dashboard/SensorCard";
import Dropdown from "react-dropdown";
import { RiResetRightFill } from "react-icons/ri";
import DashboardTable from "../components/Dashboard/DashboardTable";
import imageMap from "../utils/imageMap";
import DeviceOptions from "../components/Dashboard/DeviceOptions";

const Dashboard = () => {
  const getData = useDataStore((s) => s.getData);
  const resetState = useDataStore((s) => s.resetState);
  const chartRef = useRef(null);

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 5000);
    return () => {
      clearInterval(interval);
      resetState();
    };
  }, []);

  // cards mapping

  // console.log("sensorCards=",sensorCards)
  return (
    <div className="h-[91%] flex flex-col items-start gap-2 text-gray-200 p-1">
      {/* cards */}
      <div className="flex gap-2 w-[100%] h-[50%]">
        <div className="w-[50%]">
          <SensorCard />
        </div>
        <div className="w-[50%] h-[100%] p-2 felx items-center justify-center  rounded-xl shadow-xl card-bg border border-[#bae9bc]">
          <DashboardTable />
        </div>
      </div>

      <div className="w-full h-[50%] flex gap-2">
        <div className=" p-1 h-[100%] w-[80%] card-bg rounded-md heading-txt-color shadow-lg border border-[#bae9bc]">
          <div className="h-[10%]  flex gap-2 items-center justify-end">
            <DeviceOptions />
            <button
              className="button-style-1 relative  bg-red-300"
              onClick={() => chartRef.current?.resetZoom()}
            >
              <RiResetRightFill className="text-red-500" />
            </button>
          </div>
          <div className="h-[90%] p-2">
            {/* Chart */}
            <div className="rounded-xl h-[100%] parent-bg">
              <LineChartContainer
                chartRef={chartRef}
                fromPage="dashboard"
                // selectedSensor={selectedSensor}
              />
            </div>
          </div>
        </div>
        <div className="w-[20%] border border-[#bae9bc] flex items-center justify-center card-bg rounded-md heading-txt-color shadow-lg ">
          <img
            src={imageMap.productimg}
            alt="product"
            className="w-[70%] h-[100%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

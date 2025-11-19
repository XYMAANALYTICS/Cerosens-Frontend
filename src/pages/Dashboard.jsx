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
  const SelectedLimit = useDataStore((s) => s.SelectedLimit);
const setState = useDataStore((s)=>s.setState)
  useEffect(() => {
    getData();
    const interval = setInterval(getData, 5000);
    return () => {
      clearInterval(interval);
      resetState();
    };
  }, []);

  // cards mapping

  console.log("SelectedLimit=",SelectedLimit)
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
          <div className="h-[10%]  flex gap-2 items-center justify-between p-2">
            <div className="text-[8px] md:text-[10px] 2xl:text-[12px] flex gap-3">
              <span className="p-0.5 text-blue-700">Filter By:</span>
              <span className={`shadow-md p-0.5 rounded-md hover:cursor-pointer  hover:scale-110 ${SelectedLimit === '1D' ? 'bg-[#3d3d3d] text-[#38CE3C] border border-[#38CE3C]':''} `} onClick={()=>(localStorage.setItem("Limit","1D"),getData(),setState({SelectedLimit:'1D'}))}>1D</span>
              <span className={`shadow-md p-0.5 rounded-md hover:cursor-pointer  hover:scale-110 ${SelectedLimit === '7D' ? 'bg-[#3d3d3d] text-[#38CE3C] border border-[#38CE3C]':''} `} onClick={()=>(localStorage.setItem("Limit","7D"),getData(),setState({SelectedLimit:'7D'}))}>7D</span>
              <span className={`shadow-md p-0.5 rounded-md hover:cursor-pointer  hover:scale-110 ${SelectedLimit === '15D' ? 'bg-[#3d3d3d] text-[#38CE3C] border border-[#38CE3C]':''} `} onClick={()=>(localStorage.setItem("Limit","15D"),getData(),setState({SelectedLimit:'15D'}))}>15D</span>
              <span className={`shadow-md p-0.5 rounded-md hover:cursor-pointer  hover:scale-110 ${SelectedLimit === '30D' ? 'bg-[#3d3d3d] text-[#38CE3C] border border-[#38CE3C]':''} `} onClick={()=>(localStorage.setItem("Limit","30D"),getData(),setState({SelectedLimit:'30D'}))}>30D</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <DeviceOptions />
              <button
                className="button-style-1 relative  bg-red-300"
                onClick={() => chartRef.current?.resetZoom()}
              >
                <RiResetRightFill className="text-red-500" />
              </button>
            </div>
           
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

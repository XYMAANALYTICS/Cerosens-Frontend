import useDataStore from "../../store/dataStore";
import ActivityStatus from "./ActivityStatus";
import LastDataTime from "./LastDataTime";
import ThicknessCard from "./ThicknessCard";
import { TbDeviceImacStar } from "react-icons/tb";
import { BsBatteryHalf } from "react-icons/bs";
import { MdOutlineCellTower } from "react-icons/md";
import { CiLineHeight } from "react-icons/ci";
import { MdAir } from "react-icons/md";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import useAdminStore from "../../store/adminStore";
import Dropdown from "react-dropdown";
import { useEffect } from "react";

const SensorCard = () => {
  const lastData = useDataStore((s) => s.lastData);
  const RespectiveDevice = useDataStore((s) => s.RespectiveDevice);

  const SelectedDevice = useDataStore((s) => s.SelectedDevice);
  const setState = useAdminStore((s) => s.setState);
  const getData = useDataStore((s) => s.getData);
  const UserProjectName = useAdminStore((s) => s.UserProjectName);
  const getRespectiveDeviceList = useDataStore((s)=>s.getRespectiveDeviceList);
  const Signal = lastData?.Signal ?? "N/A";
  const Battery = lastData?.Battery ?? "N/A";
  const DeviceTemp = lastData?.DeviceTemp ?? "N/A";
  const Altitude = lastData?.Altitude ?? "N/A";
  const AirQuality = lastData?.AirQuality ?? "N/A";
  const Pressure = lastData?.Pressure ?? "N/A";

  useEffect(()=>{
      getRespectiveDeviceList();
  },[]);

  ;
// Clean it
// RespectiveDevice = RespectiveDevice[0]
//   .split(",")      
//   .filter(Boolean);  

const cleanedDevices = (RespectiveDevice?.[0] || "")
  .split(",")
  .filter(Boolean).reverse();



  return (
    <div className=" rounded-md h-[100%] flex flex-col gap-2">
      <div className="h-[40%] flex gap-2 ">
        <div className="w-[30%] flex flex-col gap-2">
          <div className=" h-[50%] flex flex-col p-1 items-center justify-center rounded-md">
            <div className="w-[100%] h-[100%]">
              <Dropdown
                options={cleanedDevices}
                value={SelectedDevice}
                onChange={(val) => {
                  setState({SelectedDevice:val.value}),
                  localStorage.setItem("Device",val.value);
                  getData();
                }}
                placeholder="Select Device"
                className="text-center"
              />
            </div>
          </div>
          <div className="card-bg h-[50%] border border-[#bae9bc] flex items-center justify-center rounded-md shadow-md">
            <ActivityStatus />
          </div>
        </div>
        <div className=" w-[70%]">
          <ThicknessCard />
        </div>
      </div>
      <div className="h-[57%] flex flex-col gap-2">
        <div className="h-[30%] flex gap-2 ">
          <div className="w-[70%] card-bg shadow-md border border-[#bae9bc] rounded-md card-bg flex p-2 items-center justify-between">
            <div className="flex flex-col txt-color text-[8px] md:text-[10px] 2xl:text-[12px] ">
              <div className="flex items-center justify-center gap-2">
                <MdOutlineCellTower className="text-md text-blue-500 text-2xl" />
                <span className="heading-txt-color">{Signal + "%"}</span>
              </div>
              <span className="">Signal Strenth</span>
            </div>
            <div className="flex flex-col txt-color text-[8px] md:text-[10px] 2xl:text-[12px] ">
              <div className="flex items-center justify-center gap-2">
                <BsBatteryHalf className="text-md text-green-500 text-2xl" />
                <span className="heading-txt-color">{Battery + "%"}</span>
              </div>
              <span className="">Battery Status</span>
            </div>
            <div className="flex flex-col txt-color text-[8px] md:text-[10px] 2xl:text-[12px] ">
              <div className="flex items-center justify-center gap-2">
                <TbDeviceImacStar className="text-md text-red-500 text-2xl" />
                <span className="heading-txt-color">{DeviceTemp + "℃"} </span>
              </div>
              <span className="">Device Temperature</span>
            </div>{" "}
          </div>
          <div className="card-bg  w-[30%] shadow-md rounded-md card-bg border border-[#bae9bc]">
            <LastDataTime />
          </div>
        </div>
        <div className="border-t border border-[#bae9bc] h-[70%] shadow-md rounded-md card-bg flex p-2 justify-between card-bg">
          <div className="text-[8px] md:text-[10px] 2xl:text-[12px] border-r h-[100%] w-1/3 border-gray-400 txt-color flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <span className="heading-txt-color">{Pressure + ""}</span>

              <div className="flex  items-center justify-center gap-2">
                <LiaCompressArrowsAltSolid className="text-md text-red-500 text-2xl" />
                <span className="">Pressure</span>
              </div>
            </div>
          </div>
          <div className="text-[8px] md:text-[10px] 2xl:text-[12px] border-r h-[100%] w-1/3 border-gray-400 txt-color flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <span className="heading-txt-color">{Altitude + ""}</span>

              <div className="flex  items-center justify-center gap-2">
                <CiLineHeight className="text-md text-pink-500 text-2xl" />
                <span className="">Altitude</span>
              </div>
            </div>
          </div>
          <div className="text-[8px] md:text-[10px] 2xl:text-[12px] h-[100%] w-1/3 border-gray-400 txt-color flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <span className="heading-txt-color">{AirQuality + ""}</span>

              <div className="flex  items-center justify-center gap-2">
                <MdAir className="text-md text-purple-500 text-2xl" />
                <span className="">Air Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;

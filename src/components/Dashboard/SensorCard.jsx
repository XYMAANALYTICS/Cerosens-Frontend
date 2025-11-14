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

const SensorCard = () => {
    const lastData = useDataStore((s) => s.lastData);
  const Signal = lastData?.Signal ?? "N/A";
    const Battery = lastData?.Battery ?? "N/A";
  const DeviceTemp = lastData?.DeviceTemp ?? "N/A";

  const Altitude = lastData?.Altitude ?? "N/A";
  const AirQuality = lastData?.AirQuality ?? "N/A";
  const Pressure = lastData?.Pressure ?? "N/A";

  return (
    <div className=" rounded-md h-[100%] flex flex-col gap-2">
      <div className="h-[40%] flex gap-2 ">
        <div className="w-[30%] flex flex-col gap-2">
          <div className="card-bg  h-[50%] flex items-center justify-center rounded-md heading-txt-color inset-shadow-sm inset-shadow-gray-400 border-[#e5e7eb]">
            dropdown-devices
          </div>
          <div className="card-bg h-[50%] flex items-center justify-center rounded-md inset-shadow-sm inset-shadow-gray-400 border-[#e5e7eb]">
            <ActivityStatus />
          </div>
        </div>
        <div className=" w-[70%]">
          <ThicknessCard />
        </div>
      </div>
      <div className="h-[57%] flex flex-col gap-2">
        <div className="h-[30%] flex gap-2">
          <div className="w-[70%] card-bg inset-shadow-sm inset-shadow-gray-400 rounded-md card-bg flex p-2 items-center justify-between">
            <div className="flex flex-col txt-color text-size ">
              <div className="flex items-center justify-center gap-2">
                <MdOutlineCellTower className="text-md text-blue-500" />
                <span className="heading-txt-color">{ Signal + "%" }</span>
              </div>
              <span className="">Signal Strenth</span>
            </div>
            <div className="flex flex-col txt-color text-size ">
              <div className="flex items-center justify-center gap-2">
                <BsBatteryHalf className="text-md text-green-500" />
                <span className="heading-txt-color">{ Battery + "%"}</span>
              </div>
              <span className="">Battery Status</span>
            </div>
            <div className="flex flex-col txt-color text-size ">
              <div className="flex items-center justify-center gap-2">
                <TbDeviceImacStar className="text-md text-red-500" />
                <span className="heading-txt-color">{DeviceTemp + "℃"} </span>
              </div>
              <span className="">Device Temperature</span>
            </div>{" "}
          </div>
          <div className="card-bg w-[30%] inset-shadow-sm inset-shadow-gray-400 rounded-md card-bg">
            <LastDataTime />
          </div>
        </div>
        <div className="border-t h-[70%] inset-shadow-sm inset-shadow-gray-400 rounded-md card-bg flex p-2 justify-between card-bg">
          <div className="border-r h-[100%] w-1/3 border-gray-400 txt-color flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <span className="heading-txt-color">{Pressure + ""}</span>

              <div className="flex  items-center justify-center gap-2">
                <LiaCompressArrowsAltSolid className="text-md text-red-500" />
                <span className="">Pressure</span>
              </div>
            </div>
          </div>
          <div className="border-r h-[100%] w-1/3 border-gray-400 txt-color flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <span className="heading-txt-color">{Altitude + ""}</span>

              <div className="flex  items-center justify-center gap-2">
                <CiLineHeight className="text-md text-pink-500" />
                <span className="">Altitude</span>
              </div>
            </div>
          </div>
           <div className="h-[100%] w-1/3 border-gray-400 txt-color flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <span className="heading-txt-color">{AirQuality + ""}</span>

              <div className="flex  items-center justify-center gap-2">
                <MdAir className="text-md text-purple-500" />
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

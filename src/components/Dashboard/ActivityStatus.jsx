import useDataStore from "../../store/dataStore";
import { MdOutlineSensors } from "react-icons/md";
import { MdOutlineSensorsOff } from "react-icons/md";

const ActivityStatus = () => {
  const activityStatus = useDataStore((s) => s.activityStatus);

  // console.log("activity status rendered");

  return (
    <div className="p-2 text-[8px] md:text-[10px] 2xl:text-[12px]">
      {!activityStatus || activityStatus === "inactive"
        ? (<div className="flex items-center justify-center gap-2 text-red-400 heading-txt-color">
          <MdOutlineSensorsOff/>
          <span>Inactive</span>
        </div>)
        :(<div className="flex items-center justify-center gap-2 text-green-400 heading-txt-color">
          <MdOutlineSensors/>
          <span>{activityStatus}</span>
        </div>) }
    </div>
  );
};

export default ActivityStatus;

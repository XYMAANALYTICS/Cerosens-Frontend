import useDataStore from "../../store/dataStore";
import { MdAvTimer } from "react-icons/md";

const LastDataTime = () => {
  const lastData = useDataStore((s) => s.lastData);
  const time = lastData?.Timestamp ?? "N/A";

  // console.log("last data time rendered");

  return (
    <div className="flex flex-col txt-color text-size p-1 text-[8px] md:text-[10px] 2xl:text-[12px]">
         <span className="flex items-center justify-center heading-txt-color">{time}</span>
      <span className="flex items-center justify-center gap-2">
        <MdAvTimer className="font-bold text-blue-500 text-2xl"/>
        Recent Data
      </span>
    </div>
  );
};

export default LastDataTime;

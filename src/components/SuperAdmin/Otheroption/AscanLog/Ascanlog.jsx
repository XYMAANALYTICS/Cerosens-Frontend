import React, { useRef } from "react";
import AscanlogDropdown from "./AscanlogDropdown";
import AscanPloting from "../../Ascan/AscanPloting";
import AscanDownload from "../../Ascan/AscanDownload";
import { IoIosCloudDone } from "react-icons/io";
import useDataStore from "../../../../store/dataStore";
import { useEffect } from "react";
import AscanToggle from "./AscanToggle";

const Ascanlog = () => {
  const chartRef = useRef(null);
  const setWindowValue = useDataStore((s) => s.setWindowValue);
  useEffect(() => {
    setWindowValue(2);
  }, []);
  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-2 ">
      <div className="h-[10%] border border-gray-700 rounded-xl flex items-center justify-between p-2">
        <div className="flex gap-2">
          <AscanlogDropdown />
          <AscanDownload />

          {/* <button
            className="border flex items-center justify-center rounded-xl p-2 gap-2 text-green-400"
            onClick={() => setWindowValue(1)}
          >
            <IoIosCloudDone className="" />
            Set
          </button> */}
         
        </div>
         <div className="">
            <AscanToggle />
          </div>
      </div>
      <div className="h-[89%] rounded-2xl border border-gray-700 parent-bg">
        <AscanPloting chartRef={chartRef}/>
      </div>
    </div>
  );
};

export default Ascanlog;

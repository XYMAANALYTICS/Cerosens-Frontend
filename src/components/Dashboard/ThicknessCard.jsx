import React from "react";
import useDataStore from "../../store/dataStore";
import { TbRulerMeasure2 } from "react-icons/tb";

const ThicknessCard = () => {
  const lastData = useDataStore((s) => s.lastData);
  const Thickness = lastData?.Thickness ?? "N/A";
  return (
    <div className="h-[100%] w-full flex items-center justify-center shadow-md rounded-xl card-bg border border-[#bae9bc] text-[8px] md:text-[10px] 2xl:text-[12px]">
      <div className="flex flex-col items-center justify-center" >
        <div className="felx items-center justify-center font-bold heading-txt-color">
          {Thickness}  / 45 mm
        </div>
        <div className="txt-color flex items-center gap-2 ">
          <TbRulerMeasure2 className="text-orange-500 text-2xl"/>
          Thickness
        </div>
      </div>
    </div>
  );
};

export default ThicknessCard;

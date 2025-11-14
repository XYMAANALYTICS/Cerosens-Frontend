import React from "react";
import useDataStore from "../../store/dataStore";
import { TbRulerMeasure2 } from "react-icons/tb";

const ThicknessCard = () => {
  const lastData = useDataStore((s) => s.lastData);
  const Thickness = lastData?.Thickness ?? "N/A";
  return (
    <div className="h-[100%] w-full flex items-center justify-center inset-shadow-sm inset-shadow-gray-400 rounded-xl card-bg">
      <div className="flex flex-col items-center justify-center" >
        <div className="felx items-center justify-center font-bold heading-txt-color">
          {Thickness}  / 45 mm
        </div>
        <div className="txt-color  flex items-center gap-2 ">
          <TbRulerMeasure2 className="text-orange-500"/>
          Thickness
        </div>
      </div>
    </div>
  );
};

export default ThicknessCard;

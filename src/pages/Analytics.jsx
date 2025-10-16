import { useEffect, useRef } from "react";

import useReportsStore from "../store/reportsStore";
import ReportOptions from "../components/Common/ReportOptions";
import ReportSelector from "../components/Common/ReportSelector";
import TableContainer from "../components/Common/TableContainer";
import LineChartContainer from "../components/Common/LineChartContainer";

const Analytics = () => {
  const resetState = useReportsStore((s) => s.resetState);

  useEffect(() => {
    return () => resetState();
  }, []);

  const chartRef = useRef(null);

  return (
    <div className="h-[92%] w-[100%] p-4 flex flex-col items-start gap-4 text-gray-200 ">
      <ReportOptions />
      <div className="border w-[100%] h-[90%] flex">
        <div className="w-[30%] h-[100%] border flex flex-col gap-2">
         <ReportSelector fromPage={"analytics"} />
          <div className="overflow-auto h-[50%] w-[100%] bbb">
            <TableContainer fromPage={"analytics"} />
          </div>
        </div>
        <div className="w-[70%] h-[100%]">
          <button
            className="button-style-1 h-[5%]"
            onClick={() => chartRef.current?.resetZoom()}
          >
            Reset Zoom
          </button>

          <div className="h-[90%] p-4 rounded-md w-full  card-bg">
            <LineChartContainer chartRef={chartRef} fromPage={"analytics"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

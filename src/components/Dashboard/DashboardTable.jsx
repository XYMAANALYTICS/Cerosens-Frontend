import React from "react";
import useDataStore from "../../store/dataStore";

const DashboardTable = () => {
  const tbldata = useDataStore((s) => s.data);

  return (
    <div className="w-full h-full">
      <div
        className="overflow-y-auto"
        style={{
          maxHeight: "100%",
          scrollbarWidth: "thin",
          scrollbarColor: "#DCDEDD transparent",
        }}
      >
        <table className="w-full border-collapse text-size">
          {/* ----------- TABLE HEADER ----------- */}
        <thead className="text-black sticky top-0 z-20 bg-white shadow-md text-[8px] md:text-[10px] 2xl:text-[12px]">
            <tr className="parent-bg">
              <th className="py-3 px-2 text-left">S.No</th>
              <th className="py-3 px-2 text-left">Thickness</th>
              <th className="py-3 px-2 text-left">Battery</th>
              <th className="py-3 px-2 text-left">Signal Strength</th>
              <th className="py-3 px-2 text-left">Device Temperature</th>
              <th className="py-3 px-2 text-left">Pressure</th>
              <th className="py-3 px-2 text-left">Altitude</th>
              <th className="py-3 px-2 text-left">Air Quality</th>
              <th className="py-3 px-2 text-left">Time</th>
            </tr>
          </thead>

          {/* ----------- TABLE BODY ----------- */}
          <tbody className="text-[8px] md:text-[11px] 2xl:text-[12px]">
            {tbldata.map((row, rowIndex) => (
              <tr
                key={rowIndex}
              className="border-b text-black border-gray-300 odd:bg-gray-50 hover:bg-gray-200 transition"
              >
                <td className="py-2 px-2">{rowIndex + 1}</td>
                <td className="py-2 px-2">{row.Thickness}</td>
                <td className="py-2 px-2">{row.Battery}</td>
                <td className="py-2 px-2">{row.Signal}</td>
                <td className="py-2 px-2">{row.DeviceTemp}</td>
                <td className="py-2 px-2">{row.Pressure}</td>
                <td className="py-2 px-2">{row.Altitude}</td>
                <td className="py-2 px-2">{row.AirQuality}</td>
                <td className="py-2 px-2">{row.Timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;

import React from "react";
import useDataStore from "../../store/dataStore";

const DashboardTable = () => {
  const tbldata = useDataStore((s) => s.data);

  return (
    <div className=" w-full h-full">
      
      {/* Scrollable container */}
      <div
        className="overflow-y-auto"
        style={{
          maxHeight: "100%",         // Adjust height as you need
          scrollbarWidth: "thin",
          scrollbarColor: "#d9f0e7 transparent",
        }}
      >
        <table className="w-full text-size">
          <thead className="text-black shadow-lg parent-bg sticky top-0 z-10">
            <tr>
              <th className="dt-bdr">S.No</th>
              <th className="dt-bdr">Thickness</th>
              <th className="dt-bdr">Battery</th>
              <th className="dt-bdr">Signal Strength</th>
              <th className="dt-bdr">Device Temperature</th>
              <th className="dt-bdr">Pressure</th>
              <th className="dt-bdr">Altitude</th>
              <th className="dt-bdr">Air Quality</th>
              <th className="dt-bdr">Time</th>
            </tr>
          </thead>

          <tbody className="txt-color text-[10px]">
            {tbldata.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="dt-bdr">{rowIndex + 1}</td>
                <td className="dt-bdr">{row.Thickness}</td>
                <td className="dt-bdr">{row.Battery}</td>
                <td className="dt-bdr">{row.Signal}</td>
                <td className="dt-bdr">{row.DeviceTemp}</td>
                <td className="dt-bdr">{row.Pressure}</td>
                <td className="dt-bdr">{row.Altitude}</td>
                <td className="dt-bdr">{row.AirQuality}</td>
                <td className="dt-bdr">{row.Timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DashboardTable;

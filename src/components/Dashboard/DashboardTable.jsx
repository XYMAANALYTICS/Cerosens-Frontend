import React from "react";
import useDataStore from "../../store/dataStore";

const DashboardTable = () => {
  const tbldata = useDataStore((s) => s.data);
  // console.log("tbldata=", tbldata);
  return (
    <div className="overflow-auto rounded-md"  style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#6b7280 transparent",
                      }}>
      <table className="w-full text-size">
        <thead className="text-white shadow bg-[#4F8CFF] to-[#2F6BFF]">
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
  );
};

export default DashboardTable;

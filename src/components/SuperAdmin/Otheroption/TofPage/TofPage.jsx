import React from "react";
import DatePicker from "react-datepicker";
import { IoIosCloudDownload } from "react-icons/io";
import { FaTable } from "react-icons/fa";
import useDataStore from "../../../../store/dataStore";
import "react-datepicker/dist/react-datepicker.css";
import { FaChartLine } from "react-icons/fa6";
import PlotPopup from "./PlotPopup";
import paramters from "../../../../store/addparameter";
import { RiSkipRightLine } from "react-icons/ri";
import { RiSkipLeftLine } from "react-icons/ri";

const TofPage = () => {
  const tof_fromdate = useDataStore((s) => s.Tof_from_date);
  const tof_todate = useDataStore((s) => s.Tof_To_date);
  const setState = useDataStore((s) => s.setState);
  const parameterssetState = paramters((s) => s.setState);
  const status_of_popup = paramters((s) => s.Tofplot_Status);
  const getTofDate = useDataStore((s) => s.getTofDate);
  const TofData = useDataStore((s) => s.TofData);
  const TofCurrentPage = useDataStore((s) => s.TofCurrentPage);
  const TofTotalPages = useDataStore((s) => s.TofTotalPages);
  const downloadTofCSV = useDataStore((s) => s.downloadTofCSV);

  console.log("Tofplot_Status=",status_of_popup)
  return (
    <div className="h-full w-full flex flex-col gap-3 bg-[#f5f9ff] p-4 rounded-xl">
      {/* -----------------------------------
          TOP FILTER SECTION 
      ----------------------------------- */}
      <div className="h-[12%] bg-white  shadow-sm rounded-xl flex items-center justify-between px-6 py-3">
        {/* LEFT: Download Button */}
        <div
          className="border rounded-2xl p-2 border-[#38CE3C] bg-[#d6f6d7] hover:cursor-pointer hover:scale-110 transition-transform"
          onClick={() => downloadTofCSV("1")}
        >
          <IoIosCloudDownload className="text-[#38CE3C] text-xl" />
        </div>

        {/* RIGHT: Filters */}
        <div className="flex items-center justify-between gap-8">
          {/* From Date */}
          <div className="">
            <span className="text-sm font-medium text-gray-700">
              Select From Date :{" "}
            </span>
            <DatePicker
              placeholderText="Select"
              selected={tof_fromdate}
              onChange={(date) => setState({ Tof_from_date: date })}
              className="border rounded-md p-1 mt-1"
            />
          </div>

          {/* To Date */}
          <div className="">
            <span className="text-sm font-medium text-gray-700">
              Select To Date :{" "}
            </span>
            <DatePicker
              placeholderText="Select"
              selected={tof_todate}
              onChange={(date) => setState({ Tof_To_date: date })}
              className="border rounded-md p-1 mt-1"
            />
          </div>

          {/* View Table */}
          <div
            className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition border-red-500 bg-red-300"
            onClick={() => getTofDate(1)}
          >
            <FaTable className="" />
            <span className="font-medium ">View</span>
          </div>

          {/* Plot Popup */}
          {status_of_popup && (
            <PlotPopup
              onClose={() => parameterssetState({ Tofplot_Status: false })}
              data={TofData}
            />
          )}

          {/* Plot Button */}
          <div
            className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer border-green-400 bg-green-200 hover:bg-green-200 transition"
            onClick={() => {
              parameterssetState({ Tofplot_Status: true }), downloadTofCSV("2");
            }}
          >
            <FaChartLine />
            <span className="font-medium">Plot</span>
          </div>
        </div>
      </div>

      {/* -----------------------------------
          RESULTS TABLE SECTION 
      ----------------------------------- */}
      <div className="h-[88%] bg-white  shadow-sm rounded-xl flex flex-col p-3">
        <div className="flex-1 overflow-auto rounded-lg">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-[#bae9bc] sticky top-0 z-10">
              <tr>
                <th className="border p-2 text-left">S.No</th>
                <th className="border p-2 text-left">First Peak (µs)</th>
                <th className="border p-2 text-left">Second Peak (µs)</th>
                <th className="border p-2 text-left">TOF</th>
                <th className="border p-2 text-left">Thickness</th>
                <th className="border p-2 text-left">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {TofData && TofData.length > 0 ? (
                TofData.map((row, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{row.T1}</td>
                    <td className="border p-2">{row.T2}</td>
                    <td className="border p-2">{row.Tof}</td>
                    <td className="border p-2">{row.Thickness}</td>
                    <td className="border p-2">
                      {new Date(row.Timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center border p-4 text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="p-2 px-4 bg-gray-200 rounded disabled:opacity-50"
            disabled={TofCurrentPage === 1}
            onClick={() => getTofDate(TofCurrentPage - 1)}
          >
            <RiSkipLeftLine />
          </button>

          <span className="font-medium">
            Page {TofCurrentPage} / {TofTotalPages}
          </span>

          <button
            className="p-2 px-4 bg-gray-200 rounded disabled:opacity-50"
            disabled={TofCurrentPage === TofTotalPages}
            onClick={() => getTofDate(TofCurrentPage + 1)}
          >
            <RiSkipRightLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TofPage;

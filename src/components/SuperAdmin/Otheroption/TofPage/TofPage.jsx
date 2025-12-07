import React from "react";
import DatePicker from "react-datepicker";
import { IoIosCloudDownload } from "react-icons/io";
import { FaTable } from "react-icons/fa";
import useDataStore from "../../../../store/dataStore";
import "react-datepicker/dist/react-datepicker.css";

const TofPage = () => {
  const tof_fromdate = useDataStore((s) => s.Tof_from_date);
  const tof_todate = useDataStore((s) => s.Tof_To_date);
  const setState = useDataStore((s) => s.setState);
  const getTofDate = useDataStore((s) => s.getTofDate);
  const TofData = useDataStore((s) => s.TofData);
  const TofTotalCount = useDataStore((s) => s.TofTotalCount);
  const TofCurrentPage = useDataStore((s) => s.TofCurrentPage);
  const TofTotalPages = useDataStore((s) => s.TofTotalPages);
const downloadTofCSV = useDataStore((s) => s.downloadTofCSV);


  return (
    <div className="h-[100%] w-[100%] flex flex-col gap-2">
      <div className="h-[10%] border rounded-xl flex items-center justify-end px-4 gap-4">
        {/* Download Button */}
        <div className="border rounded-2xl p-2 border-[#38CE3C] bg-[#d6f6d7] hover:cursor-pointer hover:scale-110 transition-transform"  onClick={downloadTofCSV}
>
          <IoIosCloudDownload className="text-[#38CE3C] text-xl" />
        </div>

        {/* Date Filters */}
        <div className="flex items-center justify-between gap-6">
          {/* From Date */}
          <div className="flex flex-col">
            <span className="text-sm font-medium">Select From Date</span>
            <DatePicker
              placeholderText="Select"
              selected={tof_fromdate}
              onChange={(date) => setState({ Tof_from_date: date })}
              className="border rounded-md p-1"
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col">
            <span className="text-sm font-medium">Select To Date</span>
            <DatePicker
              placeholderText="Select"
              selected={tof_todate}
              onChange={(date) => setState({ Tof_To_date: date })}
              className="border rounded-md p-1"
            />
          </div>

          {/* View Button */}
          <div
            className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => getTofDate(1)} // page 1
          >
            <FaTable />
            <span>View</span>
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="h-[90%] border rounded-xl flex flex-col p-4">
        {/* Table Box (takes full height) */}
        <div className="flex-1 overflow-auto border rounded-lg">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="border p-2 text-left">S.No</th>
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
                    colSpan="4"
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
            Prev
          </button>

          <span className="font-medium">
            Page {TofCurrentPage} / {TofTotalPages}
          </span>

          <button
            className="p-2 px-4 bg-gray-200 rounded disabled:opacity-50"
            disabled={TofCurrentPage === TofTotalPages}
            onClick={() => getTofDate(TofCurrentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TofPage;

import React from "react";
import useAdminStore from "../../../store/adminStore";

const AscanDownload = () => {
  const Ascan_Datas = useAdminStore((s) => s.Ascan_Datas);
  const x_axis = useAdminStore((s) => s.x_axis);

  const downloadbtn = () => {
    if (!Ascan_Datas?.length || !x_axis?.length) {
      console.error("No data available");
      return;
    }

    // Remove first "$" and last value (as you asked)
    const cleaned_Ascan = Ascan_Datas.slice(1, -1);

    // Build CSV header
    let csv = "X_Value,Amplitude\n";

    // Merge x_axis + ascan values (should be equal length or handle small mismatch)
    const length = Math.min(x_axis.length, cleaned_Ascan.length);

    for (let i = 0; i < length; i++) {
      csv += `${x_axis[i]},${cleaned_Ascan[i]}\n`;
    }

    // Convert to Blob and download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Ascan_Data.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white cursor-pointer transition-colors duration-200 flex items-center justify-center"
      onClick={downloadbtn}   // <-- FIXED (no brackets)
    >
      Download
    </div>
  );
};

export default AscanDownload;

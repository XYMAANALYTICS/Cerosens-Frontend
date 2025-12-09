import { Line } from "react-chartjs-2";
import { useRef } from "react";
import useDataStore from "../../../../store/dataStore";

const PlotPopup = ({ onClose }) => {
  const AllTofdata = useDataStore((s) => s.AllTofdata);

  // if (!AllTofdata || AllTofdata.length === 0) return null;

  const labels = AllTofdata.map((d) =>
    new Date(d.Timestamp).toLocaleTimeString()
  ).reverse();

  const tofValues = AllTofdata.map((d) => d.Tof).reverse();
  const t1Values = AllTofdata.map((d) => d.T1).reverse();
  const t2Values = AllTofdata.map((d) => d.T2).reverse();


  // console.log("tofValues=",AllTofdata)
  // Chart refs
  const tofRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },

    plugins: {
      legend: { labels: { color: "#000" } },
      zoom: {
        zoom: {
          drag: {
            enabled: true,
            backgroundColor: "rgba(48, 71, 192, 0.2)",
            borderColor: "#3047C0",
            borderWidth: 1,
          },
          mode: "xy",
        },
        limits: {
          x: { min: "original", max: "original" },
          y: { min: "original", max: "original" },
        },
      },
    },

    scales: {
      x: {
        ticks: { color: "#000", maxRotation: 45, minRotation: 45 },
        title: {
          display: true,
          text: "Time",
          color: "#000",
          font: { size: 11, weight: "bold" },
        },
      },
      y: {
        ticks: { color: "#000" },
        title: {
          display: true,
          text: "µs",
          color: "#000",
          font: { size: 11, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white p-4 rounded-xl w-[90%] h-[90%] overflow-auto shadow-lg border">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">TOF & Peaks Plot</h2>
          <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={onClose}>
            Close
          </button>
        </div>

        {/* TOF CHART */}
        <div className="w-full h-[300px] border rounded-xl p-2 mb-4 relative">
          <button
            className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded"
            onClick={() => tofRef.current.resetZoom()}
          >
            Reset Zoom
          </button>

          <Line
            ref={tofRef}
            data={{
              labels,
              datasets: [
                {
                  label: "TOF",
                  data: tofValues,
                  borderColor: "rgba(37, 99, 235, 1)",
                  backgroundColor: "rgba(37, 99, 235, 0.3)",
                  borderWidth: 2,
                  tension: 0.1,
                  pointRadius: 1,
                },
              ],
            }}
            options={baseOptions}
          />
        </div>

        {/* T1 + T2 CHARTS */}
        <div className="grid grid-cols-2 gap-4">

          {/* T1 CHART */}
          <div className="h-[300px] border rounded-xl p-2 relative">
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded"
              onClick={() => t1Ref.current.resetZoom()}
            >
              Reset Zoom
            </button>

            <Line
              ref={t1Ref}
              data={{
                labels,
                datasets: [
                  {
                    label: "T1",
                    data: t1Values,
                    borderColor: "rgba(217, 153, 0, 1)",
                    backgroundColor: "rgba(217, 153, 0, 0.3)",
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 1,
                  },
                ],
              }}
              options={baseOptions}
            />
          </div>

          {/* T2 CHART */}
          <div className="h-[300px] border rounded-xl p-2 relative">
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded"
              onClick={() => t2Ref.current.resetZoom()}
            >
              Reset Zoom
            </button>

            <Line
              ref={t2Ref}
              data={{
                labels,
                datasets: [
                  {
                    label: "T2",
                    data: t2Values,
                    borderColor: "rgba(242, 41, 0, 1)",
                    backgroundColor: "rgba(242, 41, 0, 0.3)",
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 1,
                  },
                ],
              }}
              options={baseOptions}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlotPopup;

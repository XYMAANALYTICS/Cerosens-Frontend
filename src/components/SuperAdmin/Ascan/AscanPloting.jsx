import React, { useMemo, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  sensorColors,
  getLineChartOptions,
} from "../../../utils/lineChartConfig";
import useAdminStore from "../../../store/adminStore";

const AscanPloting = ({ chartRef }) => {
  const lineData = useAdminStore((s) => s.lineData);
  const markers = useAdminStore((s) => s.markers);
  const ascan_status = useAdminStore((s) => s.Ascan);
  const setAscan = useAdminStore((s) => s.setAscan);
  const Ascan_Datas = useAdminStore((s) => s.Ascan_Datas);
  const setState = useAdminStore((s) => s.setState);
  const SaveTags = useAdminStore((s) => s.SaveTags);


  console.log("ascan_status=",ascan_status)
  // 🔁 Fetch ASCAN data periodically
  useEffect(() => {
    let intervalId;
    if (ascan_status === true) {
      intervalId = setInterval(() => {
        setAscan("GetAscan");
      }, 2000);
    } else if (ascan_status === false) {
      setState({
        lineData: { labels: [], datasets: [] },
        markers: [],
      });
    }
    return () => intervalId && clearInterval(intervalId);
  }, [ascan_status, setAscan, setState]);

  // console.log("ascan_status=",ascan_status)
  // 📊 Format ASCAN data
  useEffect(() => {
    if (!Ascan_Datas || Ascan_Datas.length === 0) return;

    const allAmplitudes = Ascan_Datas.flatMap((d) =>
      d.As ? d.As.split(",").map((v) => parseFloat(v)) : []
    );
  //    const hasInvalidValue = allAmplitudes.some(
  //   (v) => isNaN(v) || String(v).includes("@")
  // );

  // if (hasInvalidValue) {
  //   alert("⚠️ Invalid data detected (NaN or @). Please check sensor input!");
  //   // Optionally clear chart
  //   setState({
  //     lineData: { labels: [], datasets: [] },
  //     markers: [],
  //   });
  //   return;
  // }
    const timestamps = Array.from(
      { length: allAmplitudes.length },
      (_, i) => i + 1
    );

    const datasets = [
      {
        label: "A-scan Signal",
        data: allAmplitudes,
        borderColor: sensorColors[0],
        backgroundColor: "rgba(28,193,255,0.1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        fill: false,
        tension: 0.3,
      },
    ];

    setState({ lineData: { labels: timestamps, datasets } });
  }, [Ascan_Datas, setState]);

  const lineOptions = useMemo(() => getLineChartOptions(), []);

  // 🎯 Handle chart click (add/remove markers)
  const onChartClick = (event) => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    const points = chart.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      true
    );

    if (!points.length) return;

    const firstPoint = points[0];
    const datasetIndex = firstPoint.datasetIndex;
    const label1 = lineData.labels[firstPoint.index];
    const value1 = lineData.datasets[datasetIndex].data[firstPoint.index];

    const nextIndex =
      firstPoint.index + 1 < lineData.labels.length
        ? firstPoint.index + 1
        : firstPoint.index;
    const label2 = lineData.labels[nextIndex];
    const value2 = lineData.datasets[datasetIndex].data[nextIndex];

    const meta = chart.getDatasetMeta(datasetIndex);
    const chartTop = chart.chartArea.top;
    const chartBottom = chart.chartArea.bottom;
    const x1 = meta.data[firstPoint.index].x;
    const x2 =
      meta.data[nextIndex] && meta.data[nextIndex].x
        ? meta.data[nextIndex].x
        : x1;

    // 🧩 If same label already exists → remove that pair
    const existingPairIndex = markers.findIndex(
      (m) => m.label === label1 || m.label === label2
    );

    if (existingPairIndex !== -1) {
      const filtered = markers.filter(
        (m) => m.label !== label1 && m.label !== label2
      );
      setState({ markers: filtered });
      return;
    }

    // 🚫 Limit to two clicks (4 markers max)
    console.log("markers=",markers)
    const currentClickCount = markers.length / 2;
    if (currentClickCount === 1) {
      setState({ SaveTags: true });
    } else if (currentClickCount >= 2) {
      alert("⚠️ You can only select two points!");
      return;
    }

    // ✅ Add new pair of markers
    const newMarkers = [
      ...markers,
      { x: x1, label: label1, value: value1, chartTop, chartBottom },
      { x: x2, label: label2, value: value2, chartTop, chartBottom },
    ];
    setState({ markers: newMarkers });
  };

  return (
    <div className="relative w-full h-full">
      {lineData.datasets && lineData.datasets.length > 0 ? (
        <>
          <Line
            ref={chartRef}
            data={lineData}
            options={lineOptions}
            onClick={onChartClick}
            height={200}
          />

          {SaveTags && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                Do You Want to Save the Settings?

                </div>
                <div className="flex gap-2">
                <div className="px-2 border rounded-md border-green-400 text-green-400 hover:bg-green-400 hover:text-white hover-effect" onClick={()=>{setAscan("StoreTags");setState({SaveTags:false});}}>Yes</div>
                <div className="px-2 border rounded-md border-red-400 text-red-400 hover:bg-red-400 hover:text-white hover-effect" onClick={()=>{setState({SaveTags:false})}}>No</div>

                </div>
              </div>
            </div>
          )}
          {/* 🧭 Markers */}
          {markers.map((marker, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{
                left: marker.x,
                top: marker.chartTop,
                height: marker.chartBottom - marker.chartTop,
                borderLeft: "2px dotted rgba(59,130,246,0.9)",
                pointerEvents: "none",
              }}
            >
              <div
                className="absolute bg-green-500 w-[50px] text-white text-xs font-medium px-2 py-1 rounded-lg shadow-md"
                style={{
                  left: "50%",
                  top: "-10px",
                  transform: "translate(-50%, -100%)",
                }}
              >
                X: {marker.label} <br /> Y: {marker.value}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">No data found</div>
      )}
    </div>
  );
};

export default AscanPloting;

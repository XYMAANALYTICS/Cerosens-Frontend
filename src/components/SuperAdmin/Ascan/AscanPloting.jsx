import React, { useMemo, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  sensorColors,
  getLineChartOptions,
} from "../../../utils/lineChartConfig";
import useAdminStore from "../../../store/adminStore";
import { getAscanLineChartOptions } from "../../../utils/ascanlinechart";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import paramters from "../../../store/addparameter";
import useDataStore from "../../../store/dataStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin,
  annotationPlugin
);

// Hover grid lines plugin
const gridHoverLine = {
  id: "gridHoverLine",
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;

    if (!chart._active || chart._active.length === 0) return;

    const mouseEvent = chart.tooltip;
    const x = mouseEvent.caretX;
    const y = chart._lastEvent?.y ?? mouseEvent.caretY;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#1D2B73";
    ctx.lineWidth = 1.5;

    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);

    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);

    ctx.stroke();
    ctx.restore();
  },
};

// Register custom plugin
ChartJS.register(gridHoverLine);

const AscanPloting = ({ chartRef }) => {
  const lineData = useAdminStore((s) => s.lineData);
  const markers = useAdminStore((s) => s.markers);
  const ascan_status = useAdminStore((s) => s.Ascan);
  const setAscan = useAdminStore((s) => s.setAscan);
  const Ascan_Datas = useAdminStore((s) => s.Ascan_Datas);
  const x_axis = useAdminStore((s) => s.x_axis);

  const setState = useAdminStore((s) => s.setState);
  const SaveTags = useAdminStore((s) => s.SaveTags);
  const start = useAdminStore((s) => s.start);
  const stop = useAdminStore((s) => s.stop);
  const zoomKey = useAdminStore((s) => s.zoomKey);

  const Ascan_Status_setState = paramters((s) => s.setState);
  const [markerPixels, setMarkerPixels] = React.useState([]);
  const DatasetState = useDataStore((s) => s.setState);

  const Ascan_Status = paramters((s) => s.Ascan_Status);
  const windowStart = useDataStore((s) => s.windowStart);
  const thresholdNeg = useDataStore((s) => s.thresholdNeg);
  const thresholdPos = useDataStore((s) => s.thresholdPos);
  const windowStop = useDataStore((s) => s.windowStop);

  const window2Start = useDataStore((s) => s.window2Start);
  const w2thresholdNeg = useDataStore((s) => s.w2thresholdNeg);
  const w2thresholdPos = useDataStore((s) => s.w2thresholdPos);
  const window2Stop = useDataStore((s) => s.window2Stop);

  console.log("w2thresholdPos-",w2thresholdPos)

  useEffect(() => {
    let intervalId;
    // console.log("ascan_status=",ascan_status)
    if (ascan_status === true) {
      // console.log("api is calling===",ascan_status)
      intervalId = setInterval(() => {
        setAscan("GetAscan");
      }, 2000);
    } else if (ascan_status === false) {
      setState({
        lineData: { labels: [], datasets: [] },
      });
    }
    return () => intervalId && clearInterval(intervalId);
  }, [ascan_status, setAscan, setState]);

  // console.log("ascan_status=",ascan_status)
  // 📊 Format ASCAN data

  useEffect(() => {
    if (!Ascan_Datas || Ascan_Datas.length === 0) return;

    const cleaned = Ascan_Datas.slice(1, -1);
    const datasets = [
      {
        label: "A-scan Signal",
        data: cleaned,
        borderColor: "#0037BD",
        backgroundColor: "rgba(28,193,255,0.1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        fill: false,
        tension: 0.3,
      },
    ];
    setState({ lineData: { labels: x_axis, datasets } });
  }, [Ascan_Datas, x_axis, setState]);

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
    const clickedIndex = firstPoint.index;

    // Declare meta
    const meta = chart.getDatasetMeta(datasetIndex);

    // console.log("labels=",lineData)
    const label = lineData.labels[clickedIndex];
    const value = lineData.datasets[datasetIndex].data[clickedIndex];

    // console.log("Clicked values=",value)
    // Get pixel position
    const positionX = meta.data[clickedIndex]?.x; // pixel from left
    const positionY = meta.data[clickedIndex]?.y; // pixel from top

    if (markers.length === 1) {
      setState({ SaveTags: true });
    }
    if (markers.length > 2) {
      const filteredMarkers = markers.filter((m) => m.label !== label);
      setState({ markers: filteredMarkers });
      return;
    }

    // Limit to 2 markers
    if (markers.length >= 2) {
      alert("⚠️ You can only select two points!");
      return;
    }

    const newMarker = {
      x: positionX,
      y: positionY,
      label: label,
      value: value,
    };
    console.log("newMarker-", newMarker);

    setState({ markers: [...markers, newMarker] });
  };

  useEffect(() => {
    if (!chartRef.current || markers.length === 0) return;

    const chart = chartRef.current;
    const { x: xScale, y: yScale } = chart.scales;
    if (!xScale || !yScale) return;

    const newPixels = markers.map((marker) => ({
      ...marker,
      xPixel: xScale.getPixelForValue(marker.label),
      yPixel: yScale.getPixelForValue(marker.value),
    }));

    setMarkerPixels(newPixels);
  }, [chartRef.current, markers, lineData, zoomKey]);

  // ✅ FIX: Move illegal state update into useEffect
  useEffect(() => {
    const hasAtSymbol =
      Ascan_Datas?.some((d) => d.As && d.As.includes("@")) || null;

    Ascan_Status_setState({ Ascan_Status: hasAtSymbol });
  }, [Ascan_Datas]);

  // console.log("windowStart=", windowStart);
  // console.log("windows end", windowStop);

  const lineOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,

      animation: { duration: 300 },
      plugins: {
        legend: { display: false, labels: { color: "#FFFFFF" } },
        tooltip: { enabled: true, titleColor: "#FFFFFF", bodyColor: "#FFFFFF" },

        zoom: {
          pan: { enabled: false, mode: "xy" },
          pinch: { enabled: window.innerWidth >= 768 },
          zoom: {
            wheel: { enabled: false },
            drag: {
              enabled: true,
              backgroundColor: "rgba(48, 71, 192, 0.2)",
              borderColor: "#FF8282",
              borderWidth: 1,
            },
            mode: "xy",
          },
          limits: {
            x: { min: "original", max: "original" },
            y: { min: "original", max: "original" },
          },
        },

        annotation: {
          annotations: {
            thresholdPositive: {
              type: "line",
              yMin: thresholdPos,
              yMax: thresholdPos,
              xMin: windowStart, // 👈 start point
              xMax: windowStop,
              borderColor: "green",
              borderWidth: 3,
              borderDash: [5, 5],
              draggable: true,
              onDrag: (event) => {
                const chart = event.chart;
                const ann =
                  chart.config.options.plugins.annotation.annotations
                    .thresholdPositive;

                console.log("Dragging...");
                console.log("Current X Range:", ann.xMin, ann.xMax);
              },
              drawTime: "afterDatasetsDraw",
              label: {
                display: false,
                enabled: true,
                content: ["W1TX1", `+${thresholdPos} V`],
                position: "center",
                backgroundColor: "green",
                color: "white",
                padding: 6,
                borderRadius: 6,
                textAlign: "center",
              },
            },

            thresholdNegative: {
              type: "line",
              yMin: thresholdNeg,
              yMax: thresholdNeg,
              borderColor: "red",
              xMin: windowStart, // 👈 start point
              xMax: windowStop,
              borderWidth: 3,
              borderDash: [5, 5],
              // label: {
              //   enabled: true,
              //   content: `${thresholdNeg} V`,
              //   position: "start",
              //   backgroundColor: "rgba(255,0,0,0.2)",
              // },
              draggable: true,
              label: {
                display: false,
                enabled: true,
                content: ["W1TX2 ", `${thresholdNeg} V`],
                position: "center",
                backgroundColor: "red",
                color: "white",
                padding: 6,
                borderRadius: 6,
                textAlign: "center",
              },
            },

            // windowStartLine: {
            //   type: "line",
            //   yMin: thresholdPos,
            //   yMax: thresholdNeg,
            //   xMin: windowStart,
            //   xMax: windowStart,
            //   borderColor: "blue",
            //   borderWidth: 3,
            //   borderDash: [4, 4],
            //   // label: {
            //   //   enabled: true,
            //   //   content: `Start ${windowStart}`,
            //   //   position: "end",
            //   // },
            //   draggable: true,
            //   label: {
            //     display: false,
            //     enabled: true,
            //     content: ["W1TY1", `${windowStart} µs`],
            //     position: "center",
            //     backgroundColor: "blue",
            //     color: "white",
            //     padding: 6,
            //     borderRadius: 6,
            //     textAlign: "center",
            //   },
            // },

            // windowStopLine: {
            //   type: "line",
            //   yMin: thresholdPos,
            //   yMax: thresholdNeg,
            //   xMin: windowStop,
            //   xMax: windowStop,
            //   borderColor: "purple",
            //   borderWidth: 3,
            //   borderDash: [4, 4],

            //   label: {
            //     display: false,
            //     enabled: true,
            //     content: ["W1TY2", `${windowStop} µs`],
            //     position: "center",
            //     backgroundColor: "purple",
            //     color: "white",
            //     padding: 6,
            //     borderRadius: 6,
            //     textAlign: "center",
            //   },
            //   draggable: true,
            //   // onDrag: (ctx) => {
            //   //   const newX = ctx.chart.scales.x.getValueForPixel(
            //   //     ctx.element.x
            //   //   );

            //   //   setWindowStop(parseFloat(newX.toFixed(3)));
            //   // },
            // },

            w2thresholdPositive: {
              type: "line",
              yMin: w2thresholdPos,
              yMax: w2thresholdPos,
              xMin: window2Start, // 👈 start point
              xMax: window2Stop,
              borderColor: "green",
              borderWidth: 3,
              borderDash: [5, 5],
              draggable: true,
              drawTime: "afterDatasetsDraw",

              label: {
                display: false,
                enabled: true,
                content: ["W2TX1", `+${w2thresholdPos} V`],
                position: "center",
                backgroundColor: "green",
                color: "white",
                padding: 6,
                borderRadius: 6,
                textAlign: "center",
              },
            },

            w2thresholdNegative: {
              type: "line",
              yMin: w2thresholdNeg,
              yMax: w2thresholdNeg,
              borderColor: "red",
              xMin: window2Start, // 👈 start point
              xMax: window2Stop,
              borderWidth: 3,
              borderDash: [5, 5],
              // label: {
              //   enabled: true,
              //   content: `${thresholdNeg} V`,
              //   position: "start",
              //   backgroundColor: "rgba(255,0,0,0.2)",
              // },
              draggable: true,
              label: {
                display: false,
                enabled: true,
                content: ["W2TX2 ", `${w2thresholdNeg} V`],
                position: "center",
                backgroundColor: "red",
                color: "white",
                padding: 6,
                borderRadius: 6,
                textAlign: "center",
              },
            },

            // window2StartLine: {
            //   type: "line",
            //   yMin: w2thresholdPos,
            //   yMax: w2thresholdNeg,
            //   xMin: window2Start,
            //   xMax: window2Start,
            //   borderColor: "blue",
            //   borderWidth: 3,
            //   borderDash: [4, 4],
            //   // label: {
            //   //   enabled: true,
            //   //   content: `Start ${windowStart}`,
            //   //   position: "end",
            //   // },
            //   draggable: true,
            //   label: {
            //     display: false,
            //     enabled: true,
            //     content: ["W2TY1", `${window2Start} µs`],
            //     position: "center",
            //     backgroundColor: "blue",
            //     color: "white",
            //     padding: 6,
            //     borderRadius: 6,
            //     textAlign: "center",
            //   },
            // },

            // window2StopLine: {
            //   type: "line",
            //   yMin: w2thresholdPos,
            //   yMax: w2thresholdNeg,
            //   xMin: window2Stop,
            //   xMax: window2Stop,
            //   borderColor: "purple",
            //   borderWidth: 3,
            //   borderDash: [4, 4],

            //   label: {
            //     display: false,
            //     enabled: true,
            //     content: ["W2TY2", `${window2Stop} µs`],
            //     position: "center",
            //     backgroundColor: "purple",
            //     color: "white",
            //     padding: 6,
            //     borderRadius: 6,
            //     textAlign: "center",
            //   },
            //   draggable: true,
            //   // onDrag: (ctx) => {
            //   //   const newX = ctx.chart.scales.x.getValueForPixel(
            //   //     ctx.element.x
            //   //   );

            //   //   setWindowStop(parseFloat(newX.toFixed(3)));
            //   // },
            // },
          },
        },
      },
      interaction: { mode: "index", intersect: false },

      scales: {
        x: {
          type: "linear",
          min: x_axis[0], // Start exactly at 8.925
          max: x_axis[x_axis.length - 1], // End at last valu
          grid: { color: "#858585" },
          ticks: {
            color: "#262626",
            font: { size: window.innerWidth > 1536 ? 8 : 7 },
          },
          title: {
            display: true,
            text: "Time(µs)", // ✅ X Axis Label
            color: "#2d2d2d",
            font: { size: 10, weight: "bold" },
          },
        },
        y: {
          grid: { color: "#858585" },
          ticks: {
            color: "#262626",
            font: { size: window.innerWidth > 1536 ? 8 : 7 },
          },
          title: {
            display: true,
            text: "Amplitude(V)", // ✅ X Axis Label
            color: "#2d2d2d",
            font: { size: 10, weight: "bold" },
          },
          beginAtZero: true,
        },
      },
    }),
    [
      x_axis,
      windowStop,
      windowStart,
      thresholdNeg,
      thresholdPos,
      window2Stop,
      window2Start,
      w2thresholdNeg,
      w2thresholdPos
    ]
  );

  lineOptions.plugins.zoom.zoom.onZoom = ({ chart }) => {
    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    const newPixels = markers.map((marker) => ({
      ...marker,
      xPixel: xScale.getPixelForValue(marker.label),
      yPixel: yScale.getPixelForValue(marker.value),
    }));

    setMarkerPixels(newPixels);
  };
  // const hasAtSymbol = Ascan_Datas?.some(d => d.As && d.As.includes("@"))||null;
  // Ascan_Status_setState({Ascan_Status:hasAtSymbol});
  // console.log("lineData pixels", lineData);

  return (
    <div className="relative w-full h-full">
      {lineData.datasets && lineData.datasets.length > 0 ? (
        <>
          <div className="flex gap-1 p-1 h-[40%]">
            {/* Window 1 */}
            <div className="border p-3 rounded-lg bg-white shadow-sm w-[50%] h-[100%]">
              <h2 className="font-semibold text-lg mb-2 text-center">
                Window 1
              </h2>

              <div className=" grid grid-cols-2 gap-1">
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Threshold + (V)</label>
                  <input
                    className="border px-2 py-1 rounded"
                    type="number"
                    value={thresholdPos}
                    step="0.01"
                    onChange={(e) =>
                      DatasetState({ thresholdPos: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium">Threshold – (V)</label>
                  <input
                    className="border px-2 py-1 rounded"
                    type="number"
                    value={thresholdNeg}
                    step="0.01"
                    onChange={(e) =>
                      DatasetState({ thresholdNeg: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium">Window Start</label>
                  <input
                    className="border px-2 py-1 rounded"
                    type="number"
                    value={windowStart}
                    step="0.001"
                    onChange={(e) =>
                      DatasetState({ windowStart: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium">Window Stop</label>
                  <input
                    className="border px-2 py-1 rounded"
                    type="number"
                    value={windowStop}
                    step="0.001"
                    onChange={(e) =>
                      DatasetState({ windowStop: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Window 2 */}
            <div className="border p-3 rounded-lg w-[50%] h-[100%] bg-white shadow-sm">
              <h2 className="font-semibold text-lg mb-2 text-center">
                Window 2
              </h2>

              <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Threshold + (V)</label>
                  <input
                    className="border px-2 py-1 rounded"
                    type="number"
                    value={w2thresholdPos}
                    step="0.01"
                    onChange={(e) =>
                      DatasetState({ w2thresholdPos: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium">Threshold – (V)</label>
                  <input
                    className="border px-2 py-1 rounded"
                    type="number"
                    value={w2thresholdNeg}
                    step="0.01"
                    onChange={(e) =>
                      DatasetState({ w2thresholdNeg: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium">Window Start</label>
                  <input
                    className="border px-2 py-1 rounded"
                    type="number"
                    value={window2Start}
                    step="0.001"
                    onChange={(e) =>
                      DatasetState({ window2Start: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium">Window Stop</label>
                  <input
                    className="border px-2 py-1 rounded"
                    type="number"
                    value={window2Stop}
                    step="0.001"
                    onChange={(e) =>
                      DatasetState({ window2Stop: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[60%] w-[100%]">
            <Line
              ref={chartRef}
              data={lineData}
              options={lineOptions}
              onClick={onChartClick}
              height={200}
            />
          </div>

          {SaveTags && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                <div className="mb-2">Do You Want to Save the Settings?</div>
                <div className="flex gap-2">
                  <div
                    className="px-2 border rounded-md border-green-400 text-green-400 hover:bg-green-400 hover:text-white hover-effect"
                    onClick={() => {
                      setAscan("StoreTags");
                      setState({ SaveTags: true });
                    }}
                  >
                    Yes
                  </div>
                  <div
                    className="px-2 border rounded-md border-red-400 text-red-400 hover:bg-red-400 hover:text-white hover-effect"
                    onClick={() => {
                      setState({ SaveTags: false });
                    }}
                  >
                    No
                  </div>
                </div>
              </div>
            </div>
          )}

          {markerPixels.map((marker, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{
                left: marker.xPixel,
                top: marker.yPixel,
                height: 350,
                borderLeft: "2px dotted rgba(250, 45, 5)",
                pointerEvents: "none",
              }}
            >
              <div
                className="absolute bg-green-500 w-[50px] text-white text-[8px] font-medium px-2 py-1 rounded-lg shadow-md"
                style={{
                  left: "50%",
                  top: "-10px",
                  transform: "translate(-50%, -100%)",
                }}
              >
                X: {marker.label}
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

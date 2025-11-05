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
import useAdminStore from "../store/adminStore";

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

// Export sensor colors
export const sensorColors = [
  "#1CC1FF",
  "#3047C0",
  "#008000",
  "#FFA500",
  "#D026FF",
  "#FF8426",
  "#264AFF",
  "#00BA21",
];

// Export options function
export const getAscanLineChartOptions = (markers,setState) => {

console.log("markers=",markers)
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 300,
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#FFFFFF",
        },
      },
      tooltip: {
        enabled: true,
        titleColor: "#FFFFFF", // ✅ Tooltip title text color
        bodyColor: "#00D66F", // ✅ Tooltip body text color
      },
      zoom: {
        pan: {
          enabled: false,
          mode: "xy",
          //  onPan: ({ chart }) => {
          //   const xScale = chart.scales.x;
          //   const yScale = chart.scales.y;
          //   console.log("↔️ Panned:", {
          //     xRange: { min: xScale.min, max: xScale.max },
          //     yRange: { min: yScale.min, max: yScale.max },
          //   });
          // },
        },
        pinch: {
          enabled: window.innerWidth >= 768,
        },
        zoom: {
          wheel: {
            enabled: false,
          },
          drag: {
            enabled: true,
            backgroundColor: "rgba(48, 71, 192, 0.2)",
            borderColor: "#3047C0",
            borderWidth: 1,
          },
          mode: "xy",
          // 👇 Log when zoom changes (drag zoom or pinch zoom)
          onZoom: ({ chart }) => {
            console.log("markers=,", markers);
            const xScale = chart.scales.x;
            const yScale = chart.scales.y;

            // 🎯 Get zoomed ranges
            const xRange = { min: xScale.min, max: xScale.max };
            const yRange = { min: yScale.min, max: yScale.max };

            // console.log("Y Zoom Range:", yRange);

            // ✅ Get visible labels
            const visibleLabels = chart.data.labels.slice(
              Math.floor(xRange.min),
              Math.ceil(xRange.max)
            );

            // console.log("📊 Visible X-axis labels:", visibleLabels);

            // ✅ Compute marker positions for visible labels
            const dataset = chart.data.datasets[0].data;

            const updatedMarkers = markers
              .map((marker) => {
                const label = marker.label;

                // Check if this marker label is currently visible
                const visibleIndex = visibleLabels.indexOf(label);

                if (visibleIndex !== -1) {
                  const globalIndex = Math.floor(xRange.min) + visibleIndex;
                  const value = dataset[globalIndex];
                  const xPixel = xScale.getPixelForValue(globalIndex);
                  const chartTop = yScale.top;
                  const chartBottom = yScale.bottom;

                  return {
                    label,
                    value,
                    x: xPixel,
                    chartTop,
                    chartBottom,
                  };
                } else {
                  return null; // marker not visible in current zoom
                }
              })
              .filter(Boolean); // remove nulls


              setState({ markers: updatedMarkers });

            console.log("🎯 Updated Markers for Zoom:", updatedMarkers);
          },
        },
        limits: {
          x: { min: "original", max: "original" },
          y: { min: "original", max: "original" },
        },
      },
      annotation: {
        annotations: {
          thresholdLine1: {
            type: "line",
            yMin: 20,
            yMax: 20,
            borderColor: "green",
            borderWidth: 1.5,
            borderDash: [5, 5],
            label: {
              display: false,
            },
          },
          thresholdLine2: {
            type: "line",
            yMin: 80,
            yMax: 80,
            borderColor: "red",
            borderWidth: 1.5,
            borderDash: [5, 5],
            label: {
              display: false,
            },
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: "#858585",
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: window.innerWidth > 1536 ? 8 : 7,
          },
        },
      },
      y: {
        grid: {
          color: "#858585",
        },
        ticks: {
          color: "#FFFFFF",

          font: {
            size: window.innerWidth > 1536 ? 8 : 7,
          },
        },
        beginAtZero: true,
      },
    },
  };
};

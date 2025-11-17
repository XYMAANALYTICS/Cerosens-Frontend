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
export const sensorColors = ["#FFA500","#B55602","#3047C0", "#BA023A", "#008000","#D026FF","#FF8426","#264AFF"];



// Export options function
export const getLineChartOptions = () => ({
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
      bodyColor: "#00D66F",  // ✅ Tooltip body text color
    },
    zoom: {
      pan: {
        enabled: false,
        mode: "xy",
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
        color: "#95E8C7",
      },
      ticks: {
        color: "#2d2d2d",
        font: {
          size: window.innerWidth > 1536 ? 8 : 7,
        },
      },
    },
    y: {
       grid: {
        color: "#95E8C7", 
      },
      ticks: {
                color: "#2d2d2d",

        font: {
          size: window.innerWidth > 1536 ? 8 : 7,
        },
      },
      beginAtZero: true,
    },
  },
});

import CustomBox from "@component/atoms/CustomBox";
import { H5 } from "@component/atoms/Typography";
import { VulnerabilityObject } from "@data/types";
import { Card } from "@material-ui/core";
import { alpha, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const datasetOptions = {
  // fill: true,
  tension: 0.4,
  borderWidth: 1,
  pointRadius: 2,
  pointBorderWidth: 4,
};

const plugins = [
  {
    beforeInit: function (chart: any, args: any, options: any) {
      // Get reference to the original fit function
      const originalFit = chart.legend.fit;

      // Override the fit function
      chart.legend.fit = function fit() {
        // Call original function and bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)();
        // Change the height as suggested in another answers
        this.height += 24;
      };
    },
  },
];

const font = {
  family: "Roboto",
};

const options = {
  maintainAspectRatio: false,
  font,

  plugins: {
    legend: {
      labels: {
        font: {
          family: "Roboto",
        },
        pointStyle: "circle",
        usePointStyle: true,
        padding: 20,
        boxWidth: 7,
      },
    },
    tooltips: {
      bodyFont: font,
      displayColors: false,
      usePointStyle: true,
      pointStyle: "circle",
      callbacks: {
        labelPointStyle: "circle",
        usePointStyle: true,
        title: () => "",
        filter: () => false,
        label: function (context: any) {
          let label = context.dataset.label || "";

          if (label) {
            label += " |||| ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }

          return label;
        },
      },
    },
  },
  scales: {
    x: {
      // display: false,
      grid: {
        display: false,
      },
      ticks: {
        beginAtZero: true,
      },
    },
    y: {
      // display: false,
      grid: {
        // display: false,
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

type Metrics = {
  Day: string;
  UserVulnerabilityMetrics: VulnerabilityObject;
};

export interface AnalyticsLineChartProps {
  children?: never;
  vulnerabilityHistory: Metrics[];
}

const AnalyticsLineChart: React.FC<AnalyticsLineChartProps> = ({
  vulnerabilityHistory,
}) => {
  const [data, setData] = useState({});
  const { palette: colors } = useTheme();

  useEffect(() => {
    const labelList: string[] = [];
    const lowList: number[] = [];
    const mediumList: number[] = [];
    const highList: number[] = [];
    const criticalList: number[] = [];

    if (vulnerabilityHistory) {
      console.log(vulnerabilityHistory);

      vulnerabilityHistory.forEach((item) => {
        const metrics = item.UserVulnerabilityMetrics;

        labelList.push(item.Day);
        lowList.push(metrics.LOW);
        mediumList.push(metrics.MEDIUM);
        highList.push(metrics.HIGH);
        criticalList.push(metrics.CRITICAL);
      });
    }

    setData({
      labels: labelList,
      datasets: [
        {
          label: "Low",
          data: lowList,
          backgroundColor: "yellow",
          borderColor: "yellow",
          ...datasetOptions,
        },
        {
          label: "Medium",
          data: mediumList,
          backgroundColor: alpha(colors.primary.main, 0.2),
          borderColor: colors.warning.main,
          ...datasetOptions,
        },
        {
          label: "High",
          data: highList,
          backgroundColor: alpha(colors.primary.main, 0.2),
          borderColor: colors.error.main,
          ...datasetOptions,
        },
        {
          label: "Critical",
          data: criticalList,
          backgroundColor: alpha(colors.primary.main, 0.2),
          borderColor: colors.secondary.main,
          ...datasetOptions,
        },
      ],
    });
  }, [colors, vulnerabilityHistory]);

  return (
    <Card sx={{ p: "1rem" }}>
      <H5 mb="1rem">Vulnerability History</H5>

      <CustomBox
        sx={{
          position: "relative",
          height: "60vh",
        }}
      >
        <Line type="line" data={data} options={options} plugins={plugins} />
      </CustomBox>
    </Card>
  );
};

export default AnalyticsLineChart;

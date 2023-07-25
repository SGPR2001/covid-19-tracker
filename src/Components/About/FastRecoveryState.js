import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import './FastRecoveryState.css'


export default function FastRecoveryState({
  fastestRecoveryStates,
  statescoviddata,
  selectedDays
}) {
  const chartContainerRef =useRef(null);
  const chartRef = useRef(null);
  const [stateName,setStateName]=useState('')
  const [plotType, setPlotType] = useState("NewCases");

 useEffect(() => {
    const stateData = statescoviddata.find((state) =>
      fastestRecoveryStates.includes(state.name)
    );
    if (stateData) {
        setStateName(stateData.name)
      // const dates = Object.keys(stateData[plotType]).slice(
      //   -selectedDays
      // );
      // const plotData = Object.values(stateData[plotType]).slice(
      //   -selectedDays
      // );
      let dates = [];
      let plotData = [];

      if (plotType === "TotalCases") {
        if (
          !stateData.hasOwnProperty("TotalRecovered") ||
          !stateData.hasOwnProperty("TotalDeaths") ||
          !stateData.hasOwnProperty("Active")
        ) {
          console.log("Data not available for TotalCases plot type");
          return;
        }

        dates = Object.keys(stateData.TotalRecovered).slice(
          -selectedDays
        );
        const totalRecovered = Object.values(
          stateData.TotalRecovered
        ).slice(-selectedDays);
        const totalDeaths = Object.values(stateData.TotalDeaths).slice(
          -selectedDays
        );
        const activeCases = Object.values(stateData.Active).slice(
          -selectedDays
        );

        plotData = totalRecovered.map((recovered, index) => {
          return recovered + totalDeaths[index] + activeCases[index];
        });
      } else {
        dates = Object.keys(stateData[plotType]).slice(-selectedDays);
        plotData = Object.values(stateData[plotType]).slice(
          -selectedDays
        );
      }

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = chartContainerRef.current.getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: `${plotType.charAt(0).toUpperCase() + plotType.slice(1)} `,
              data: plotData,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: `${plotType.charAt(0).toUpperCase() + plotType.slice(1)}`,
              },
              suggestedMax: Math.max(...plotData) + 10,
            },
          },
        },
      });
    }
  }, [fastestRecoveryStates, statescoviddata,plotType]);

  return (
    <div className="faststates">
      <h2>Fastest Recovery State-{stateName}</h2>
      <div className="button-container">
        <button
          onClick={() => setPlotType("NewCases")}
          className={plotType === "NewCases" ? "active" : ""}
        >
          New Cases
        </button>
        <button
          onClick={() => setPlotType("Recoveries")}
          className={plotType === "Recoveries" ? "active" : ""}
        >
          Recoveries
        </button>
        <button
          onClick={() => setPlotType("Deaths")}
          className={plotType === "Deaths" ? "active" : ""}
        >
          Deaths
        </button>
        <button
          onClick={() => setPlotType("TotalCases")}
          className={plotType === "TotalCases" ? "active" : ""}
        >
          TotalCases
        </button>
      </div>
      <div className="chart-container">
        <canvas ref={chartContainerRef}></canvas>
      </div>
    </div>
  );
}
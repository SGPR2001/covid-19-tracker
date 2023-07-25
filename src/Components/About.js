import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import statescoviddata from "../states_data15.json";
import StateTrendsets from "./About/StateTrendsets";
import "./About.css";
import FastRecoveryState from "./About/FastRecoveryState";
import WorstEffectedState from "./About/WorstEffectedState";

export default function About() {
  const [selectedState, setSelectedState] = useState("India");
  const [selectedDays, setSelectedDays] = useState(15);
  const [fastestRecoveryStates, setFastestRecoveryStates] = useState([]);
  const [WorstEffectedStates, setWorstEffectedStates] = useState([])
  const [plotType, setPlotType] = useState("NewCases");
  
  const handleDaysChange = (event) => {
    setSelectedDays(parseInt(event.target.value));
  };
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [trendData, setTrendData] = useState(null);
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
 
  
  const drawChart = () => {
    const selectedStateData = statescoviddata.find(
      (state) => state.name === selectedState
    );

    if (selectedStateData) {
        
            let dates = [];
            let plotData = [];

            if (plotType === "TotalCases") {
              if (
                !selectedStateData.hasOwnProperty("TotalRecovered") ||
                !selectedStateData.hasOwnProperty("TotalDeaths") ||
                !selectedStateData.hasOwnProperty("Active")
              ) {
                console.log("Data not available for TotalCases plot type");
                return;
              }

              dates = Object.keys(selectedStateData.TotalRecovered).slice(
                -selectedDays
              );
              const totalRecovered = Object.values(
                selectedStateData.TotalRecovered
              ).slice(-selectedDays);
              const totalDeaths = Object.values(
                selectedStateData.TotalDeaths
              ).slice(-selectedDays);
              const activeCases = Object.values(selectedStateData.Active).slice(
                -selectedDays
              );

              plotData = totalRecovered.map((recovered, index) => {
                return recovered + totalDeaths[index] + activeCases[index];
              });
              
            } else {
              dates = Object.keys(selectedStateData[plotType]).slice(
                -selectedDays
              );
              plotData = Object.values(selectedStateData[plotType]).slice(
                -selectedDays
              );
            }
      
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = chartContainerRef.current.getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dates,
          datasets: [
            {
              label: `${
                plotType.charAt(0).toUpperCase() + plotType.slice(1)
              } (Bar Graph)`,
              data: plotData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
            },
            {
              label: `${
                plotType.charAt(0).toUpperCase() + plotType.slice(1)
              } (Line Graph)`,
              data: plotData,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              fill: false,
              type: "line",
              lineTension: 0.4,
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
                text: `${plotType.charAt(0).toUpperCase()+plotType.slice(1)}`,
              },
              suggestedMax: Math.max(...plotData) + 10,
            },
          },
        },
      });
    }
  };
  
  
const analyzeTrend = () => {
  const stateTrends = statescoviddata
    .filter((stateData) => stateData.name !== "India")
    .map((stateData) => {
      const newCases = Object.values(stateData.NewCases);
       const selectedNewCases = newCases.slice(-selectedDays); 
       const trend = getTrend(selectedNewCases);
       const trendPercentage = getTrendPercentage(selectedNewCases);
      return { name: stateData.name, trend, trendPercentage };
    });

  const increasingTrendStates = stateTrends.filter(
    (state) => state.trend === "Increasing"
  );
  const decreasingTrendStates = stateTrends.filter(
    (state) => state.trend === "Decreasing"
  );
  const stableStates = stateTrends.filter((state) => state.trend === "Stable");
  setTrendData({ increasingTrendStates, decreasingTrendStates, stableStates });

  
  
};


const getTrend = (data) => {
  const trendPoints = data.length;

  
  let stableCount = 0;
 let last=data[trendPoints-1];
 let first=data[0]
  for (let i = 1; i < trendPoints; i++) {
    const current = data[i];
    const previous = data[i - 1];

    const difference = Math.abs(current - previous);

    if (difference <3 ) {
      stableCount ++;
    } 
  }
  if(last-first >3)
  {
    if(stableCount>selectedDays-2) return "Stable";
    else return "Increasing"
  }
  if(last-first<-3)
  {
      if (stableCount > selectedDays-2) return "Stable";
      else return "Decreasing";
  }
  return "Stable"; 
};

const getTrendPercentage = (data) => {
  const trendPoints = data.length;
  const firstCases = data[0];
  const lastCases = data[trendPoints - 1];
  const trendPercentage = Math.abs(((lastCases - firstCases) / firstCases) * 100)
  return trendPercentage.toFixed(2);
};

 const findFastestRecoveryStates = () => {
   let fastestRecoveryStates = [];
   let highestRecoveryRate = 0;

   statescoviddata.forEach((stateData) => {
     if (stateData.name !== "India") {
       const totalRecovered = Object.values(stateData.TotalRecovered);
       const activeCases = Object.values(stateData.Active);
       const totalDeaths = Object.values(stateData.TotalDeaths);

       const lastTotalRecovered = totalRecovered.slice(-selectedDays);
       const lastActiveCases = activeCases.slice(-selectedDays);
       const lastTotalDeaths = totalDeaths.slice(-selectedDays);

       const recoveryRates = lastTotalRecovered.map((totalRecovered, index) => {
         const totalCases =
           lastActiveCases[index] + totalRecovered + lastTotalDeaths[index];
         return (totalRecovered / totalCases) * 100;
       });

       const averageRecoveryRate =
         recoveryRates.reduce((acc, rate) => acc + rate, 0) /
         recoveryRates.length;
        
       if (averageRecoveryRate > highestRecoveryRate) {
         highestRecoveryRate = averageRecoveryRate;
         fastestRecoveryStates = [stateData.name];
       } else if (averageRecoveryRate === highestRecoveryRate) {
         fastestRecoveryStates.push(stateData.name);
       }
     }
   });

   return fastestRecoveryStates;
 };
const findWorstAffectedState = () => {
  let worstAffectedStates = [];
  let highestScore = 0;

  statescoviddata.forEach((stateData) => {
    if (stateData.name !== "India") {
      const newCases = Object.values(stateData.NewCases);
      const deaths = Object.values(stateData.Deaths);

      const lastNewCases = newCases.slice(-selectedDays);
      const lastDeaths = deaths.slice(-selectedDays);

      const sumNewCases = lastNewCases.reduce((acc, cases) => acc + cases, 0);
      const sumDeaths = lastDeaths.reduce((acc, deaths) => acc + deaths, 0);

   
      const score = sumNewCases * 2 + sumDeaths;

      if (score > highestScore) {
        highestScore = score;
        worstAffectedStates = [stateData.name];
      } else if (score === highestScore) {
        worstAffectedStates.push(stateData.name);
      }
    }
  });

  return worstAffectedStates;
};


  useEffect(() => {
     analyzeTrend();
    if (selectedState) {
      drawChart();
    }
    const fastestRecoveryStates = findFastestRecoveryStates();
    setFastestRecoveryStates(fastestRecoveryStates)
    const worstAffectedState = findWorstAffectedState();
    setWorstEffectedStates(worstAffectedState)
  }, [selectedState,selectedDays,plotType]);
  

  return (
    <>
      <div className="about">
        <div className="state-chart">
          <div className="cases-types">
            <div className="select-container">
              <select value={selectedState} onChange={handleStateChange}>
                <option value={selectedState}>{selectedState}</option>
                {selectedState !== "India" && (
                  <option value="India">India</option>
                )}
                {statescoviddata.map((state) => {
                  if (state.name === "India") {
                    return null;
                  }
                  return (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select-container">
              <select value={selectedDays} onChange={handleDaysChange}>
                <option value={7}>7 days</option>
                <option value={15}>15 days</option>
              </select>
            </div>
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
          </div>
          <div className="chart-container">
            <canvas className="aboutcanvas" ref={chartContainerRef}></canvas>
          </div>
        </div>
        <div className="trend">
          <div className="trendsets">
            <StateTrendsets
              trendData={trendData}
              handleStateChange={handleStateChange}
            />
          </div>
        </div>

        <div className="fastworst">
          <div style={{ marginRight: "40px" }}>
            <FastRecoveryState
              fastestRecoveryStates={fastestRecoveryStates}
              statescoviddata={statescoviddata}
              selectedDays={selectedDays}
            />
          </div> 
          <WorstEffectedState
            WorstEffectedStates={WorstEffectedStates}
            statescoviddata={statescoviddata}
            selectedDays={selectedDays}
          />
        </div>
      </div>
    </>
  );
}

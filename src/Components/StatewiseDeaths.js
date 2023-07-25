import React, { useState,useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./StatewiseDeaths.css";
import weekcoviddata from "../weekly_deaths.json";

export default function StatewiseDeaths() {
  const [selectedState, setSelectedState] = useState("IN");
  const [chartData, setChartData] = useState(null);
   const [showWeeklyDeaths, setShowWeeklyDeaths] = useState(true);
   const [showTotalWeeklyDeaths, setShowTotalWeeklyDeaths] = useState(false);
   const [tableData, setTableData] = useState(null);

   const handleStateChange = (event) => {
     const stateCode = event.target.value;
     setSelectedState(stateCode);
     updateChartData(stateCode);
   };
   const updateTableData = (stateCode) => {
     const selectedStateData = weekcoviddata.find(
       (state) => state.code === stateCode
     );

     const { totalweeklydeaths } = selectedStateData;
     const tableData = Object.entries(totalweeklydeaths);

     setTableData(tableData);
   };

  const updateChartData = (stateCode) => {
    
    const selectedStateData = weekcoviddata.find(
      (state) => state.code === stateCode
    );
    
    const { name, weeklydeaths, totalweeklydeaths } = selectedStateData;
    const chartLabels = Object.keys(
      showWeeklyDeaths ? weeklydeaths : totalweeklydeaths
    );
    const chartData = Object.values(
      showWeeklyDeaths ? weeklydeaths : totalweeklydeaths
    );

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          
          label: showWeeklyDeaths
            ? `Weekly Deaths in ${name}`
            : `Total Weekly Deaths in ${name}`,
          data: chartData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
     if (showTotalWeeklyDeaths) {
       updateTableData(stateCode);
     }
  };
   useEffect(() => {
     updateChartData(selectedState);
   }, [showWeeklyDeaths, showTotalWeeklyDeaths, selectedState]);

 const filteredWeekCovidData = weekcoviddata.filter(
   (stateData) => stateData.code !== "IN"
 );
 const handleToggle = (option) => {
   if (option === "weekly") {
     setShowWeeklyDeaths(true);
     setShowTotalWeeklyDeaths(false);
       setChartData(null);
   } else if (option === "total") {
     setShowWeeklyDeaths(false);
     setShowTotalWeeklyDeaths(true);
     updateTableData(selectedState);
   }
 };

 const renderToggleButton = (option, text) => (
   <button
     className={`toggle-button ${
       option === "weekly" && showWeeklyDeaths ? "active" : ""
     } ${option === "total" && showTotalWeeklyDeaths ? "active" : ""}`}
     onClick={() => handleToggle(option)}
   >
     {text}
   </button>
 );

  return (
    <div className="statewisedeaths">
      <div className="state-deaths-chart">
        <div className="deaths-types">
          <div className="select-state-container">
            <select value={selectedState} onChange={handleStateChange}>
              <option value="IN">India</option>
              {filteredWeekCovidData.map((stateData) => (
                <option key={stateData.code} value={stateData.code}>
                  {stateData.name}
                </option>
              ))}
            </select>
          </div>
          <div className="button-deaths-container">
            {renderToggleButton("weekly", "Weekly Deaths")}
            {renderToggleButton("total", "Total Weekly Deaths")}
          </div>
        </div>
        {/* {chartData && (
          <div className="chart-deaths-container">
            <Bar className="deathsbar" data={chartData} />
          </div>
        )} */}
        {showWeeklyDeaths && chartData && (
          
          <div className="chart-deaths-container">
            <Bar className="deathsbar" data={chartData} />
          </div>
        )}
        {showTotalWeeklyDeaths && tableData && (
          
          <div className="table-deaths-container">
            <table>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Deaths</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(([week, deaths]) => (
                  <tr key={week}>
                    <td>{week}</td>
                    <td>{deaths}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

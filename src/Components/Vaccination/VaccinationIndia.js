import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function VaccinationIndia() {
  const [vaccinationData, setVaccinationData] = useState({});
  const [timeRange, setTimeRange] = useState("1month");

  useEffect(() => {
    // Fetch vaccination data from the API and update the state
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://edata.ndtv.com/cricket/coronavirus/vaccinations_stateswise.json"
        );
        const data = await response.json();
        setVaccinationData(data.data);
      } catch (error) {
        console.error("Error fetching vaccination data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const getFilteredData = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime() / 1000; // Convert milliseconds to seconds

    switch (timeRange) {
      case "1month":
        return filterDataByTimeRange(timestamp, timestamp - 30 * 24 * 60 * 60); // 30 days
      case "3months":
        return filterDataByTimeRange(timestamp, timestamp - 90 * 24 * 60 * 60); // 90 days
      case "6months":
        return filterDataByTimeRange(timestamp, timestamp - 180 * 24 * 60 * 60); // 180 days
      case "12months":
        return filterDataByTimeRange(timestamp, timestamp - 365 * 24 * 60 * 60); // 365 days
      case "alltime":
        return Object.values(vaccinationData);
      default:
        return [];
    }
  };

  const filterDataByTimeRange = (endDate, startDate) => {
    
    return Object.values(vaccinationData).filter(
      (entry) => entry.date >= startDate && entry.date <= endDate
    );
  };

  const formatTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString();
  };

  const chartData = {
    labels: getFilteredData().map((entry) => formatTimestampToDate(entry.date)),
    datasets: [
      {
        label: "Vaccinations",
        data: getFilteredData().map((entry) => entry.d.t_24),
        borderColor: "#8884d8",
        fill: false,
      },
    ],
    
  };


  return (
    <div
      style={{
        width: "800px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "6px",
      }}
    >
      <div style={{ marginBottom: "4px",display:'flex',flexDirection:'column', alignItems: "center" }}>
        <h3>Vaccinations in India </h3>
        <div>
          <label htmlFor="timeRange">Select Time Range:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={handleTimeRangeChange}
          >
            <option value="1month">1 Month</option>
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="12months">12 Months</option>
            <option value="alltime">All Time</option>
          </select>
        </div>
      </div>

      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
}

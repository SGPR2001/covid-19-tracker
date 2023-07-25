import React, { useState, useEffect } from "react";
import "./RuralandUrban.css";
import { Line } from "react-chartjs-2";

export default function RuralandUrban() {
  const [data, setData] = useState([]);

  const [selectedTime, setSelectedTime] = useState("Last 30 Days");
  
  useEffect(() => {
    fetchData();
  }, [selectedTime]);

  const fetchData = async () => {
    try {
      const response1 = await fetch(
        "https://edata.ndtv.com/cricket/coronavirus/vaccinations_age_all.json"
      );
      const json1 = await response1.json();
        setData(json1.last30DaysVaccination);  
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
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
      <h1>Rural and Urban Trends</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          
          <button
            style={{ marginRight: "5px" }}
            onClick={() => handleTimeClick("Last 30 Days")}
            className={selectedTime === "Last 30 Days" ? "active" : ""}
          >
            Last 30 Days
          </button>
         
        </div>
      </div>
      <div style={{ width: "800px", height: "500px" }}>
        {selectedTime === "Last 30 Days" && (
          <div>
            {data.length > 0 && (
              <Line
                data={{
                  labels: data.map((entry) => entry.vaccine_date),
                  datasets: [
                    {
                      label: "Rural",
                      data: data.map((entry) => entry.rural),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "Urban",
                      data: data.map((entry) => entry.urban),
                      borderColor: "blue",
                      fill: false,
                    },
                   
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: "Vaccinations",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

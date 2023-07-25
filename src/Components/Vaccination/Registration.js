import React, { useState, useEffect } from "react";
import "./Registration.css";
import { Line } from "react-chartjs-2";

export default function Registration() {
  const [data, setData] = useState([]);

  const [selectedTime, setSelectedTime] = useState("Last 30 Days");
  const [todayData, setTodayData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [selectedTime]);

  const fetchData = async () => {
    try {
      const response1 = await fetch(
        "https://edata.ndtv.com/cricket/coronavirus/vaccinations_age_all.json"
      );
      const json1 = await response1.json();
    
        if (selectedTime === "All Time") {
          setData(json1.regWeekReportData);
        } else {
          setData(json1.regReportData);
        }
      

      const date = new Date().toISOString().slice(0, 10); // Get current date
      const response2 = await fetch(
        `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=${date}`
      );
      const json2 = await response2.json();
     
        setTodayData(json2.timeWiseTodayRegReport);
     
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
      <h1>Registration Trends</h1>
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
            onClick={() => handleTimeClick("Today")}
            className={selectedTime === "Today" ? "active" : ""}
          >
            Today
          </button>
          <button
            style={{ marginRight: "5px" }}
            onClick={() => handleTimeClick("Last 30 Days")}
            className={selectedTime === "Last 30 Days" ? "active" : ""}
          >
            Last 30 Days
          </button>
          <button
            className={selectedTime === "All Time" ? "active" : ""}
            onClick={() => handleTimeClick("All Time")}
          >
            All Time
          </button>
        </div>
      </div>
      <div style={{ width: "800px", height: "500px" }}>
        {selectedTime === "Last 30 Days" && (
          <div>
            {data.length > 0 && (
              <Line
                data={{
                  labels: data.map((entry) => entry.reg_date.slice(0, 10)),
                  datasets: [
                    {
                      label: "Total Dose",
                      data: data.map((entry) => entry.total),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "12-14",
                      data: data.map((entry) => entry.age12),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "15-17",
                      data: data.map((entry) => entry.age15),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "18-44",
                      data: data.map((entry) => entry.age18),
                      borderColor: "orange",
                      fill: false,
                    },
                    {
                      label: "45-60",
                      data: data.map((entry) => entry.age45),
                      borderColor: "violet",
                      fill: false,
                    },
                    {
                      label: "Above 60",
                      data: data.map((entry) => entry.age60),
                      borderColor: "gray",
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
                        text: "Registrations",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        )}

        {selectedTime === "All Time" && (
          <div>
            {data.length > 0 && (
              <Line
                data={{
                  labels: data.map((entry) => entry.label),
                  datasets: [
                    {
                      label: "Total",
                      data: data.map((entry) => entry.total),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "12-15",
                      data: data.map((entry) => entry.age12),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "15-17",
                      data: data.map((entry) => entry.age15),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "18-44",
                      data: data.map((entry) => entry.age18),
                      borderColor: "orange",
                      fill: false,
                    },
                    {
                      label: "45-60",
                      data: data.map((entry) => entry.age45),
                      borderColor: "violet",
                      fill: false,
                    },
                    {
                      label: "above 60",
                      data: data.map((entry) => entry.age60),
                      borderColor: "gray",
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
                        text: "Registrations",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        )}
        {selectedTime === "Today" && (
          <div>
            {todayData.length > 0 && (
              <Line
                data={{
                  labels: todayData.map((entry) => entry.label),
                  datasets: [
                    {
                      label: "Total",
                      data: todayData.map((entry) => entry.total),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "12-14",
                      data: todayData.map((entry) => entry.age12),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "15-17",
                      data: todayData.map((entry) => entry.age15),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "18-44",
                      data: todayData.map((entry) => entry.age18),
                      borderColor: "orange",
                      fill: false,
                    },
                    {
                      label: "45-60",
                      data: todayData.map((entry) => entry.age45),
                      borderColor: "violet",
                      fill: false,
                    },
                    {
                      label: "above 60",
                      data: todayData.map((entry) => entry.age60),
                      borderColor: "gray",
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
                        text: "Registrations",
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

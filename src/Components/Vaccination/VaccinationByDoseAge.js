
import React, { useState, useEffect } from "react";
import "./VaccinationByDoseAge.css";
import { Line } from "react-chartjs-2";

export default function VaccinationByDoseAge() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("By Doses");
  const [selectedTime, setSelectedTime] = useState("Last 30 Days");
  const [todayData, setTodayData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [selectedTime,selectedOption]);


const fetchData = async () => {
  try {
    const response1 = await fetch(
      "https://edata.ndtv.com/cricket/coronavirus/vaccinations_age_all.json"
    );
    const json1 = await response1.json();
    if(selectedOption==="By Doses"){
    if (selectedTime === "All Time") {
      setData(json1.weeklyReport);
    } else {
      setData(json1.last30DaysVaccination);
    }}else{
        if (selectedTime === "All Time") {
          setData(json1.weeklyVacAgeWiseReport);
        } else {
          setData(json1.last30DaysAgeWiseVaccination);
        }
    }

    const date = new Date().toISOString().slice(0, 10); // Get current date
    const response2 = await fetch(
      `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=${date}`
    );
    const json2 = await response2.json();
    if(selectedOption==="By Doses"){
    setTodayData(json2.vaccinationDoneByTime);
    }
    else{
        setTodayData(json2.vaccinationDoneByTimeAgeWise);
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
  console.log(selectedOption,selectedTime)

  const handleOptionClick = (option) => {
    setSelectedOption(option);
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
      <h1>Vaccination Trends</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <button
            style={{ marginRight: "5px" }}
            className={selectedOption === "By Doses" ? "active" : ""}
            onClick={() => handleOptionClick("By Doses")}
          >
            By Doses
          </button>
          <button
            className={selectedOption === "By Age" ? "active" : ""}
            onClick={() => handleOptionClick("By Age")}
          >
            By Age
          </button>
        </div>
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
        {selectedOption === "By Doses" && selectedTime === "Last 30 Days" && (
          <div>
            {data.length > 0 && (
              <Line
                data={{
                  labels: data.map((entry) => entry.vaccine_date),
                  datasets: [
                    {
                      label: "Total Dose",
                      data: data.map((entry) => entry.total),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "Dose 1",
                      data: data.map((entry) => entry.dose_1),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "Dose 2",
                      data: data.map((entry) => entry.dose_2),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "Booster",
                      data: data.map((entry) => entry.dose_pd),
                      borderColor: "orange",
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
                        text: "Doses",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        )}

        {selectedOption === "By Doses" && selectedTime === "All Time" && (
          <div>
            {data.length > 0 && (
              <Line
                data={{
                  labels: data.map((entry) => entry.label),
                  datasets: [
                    {
                      label: "Total Dose",
                      data: data.map((entry) => entry.total),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "Dose 1",
                      data: data.map((entry) => entry.dose1),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "Dose 2",
                      data: data.map((entry) => entry.dose2),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "Booster",
                      data: data.map((entry) => entry.dose_pd),
                      borderColor: "orange",
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
                        text: "Doses",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        )}
        {selectedOption === "By Doses" && selectedTime === "Today" && (
          <div>
            {todayData.length > 0 && (
              <Line
                data={{
                  labels: todayData.map((entry) => entry.label),
                  datasets: [
                    {
                      label: "Total Dose",
                      data: todayData.map((entry) => entry.count),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "Dose 1",
                      data: todayData.map((entry) => entry.dose_one),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "Dose 2",
                      data: todayData.map((entry) => entry.dose_two),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "Booster",
                      data: todayData.map((entry) => entry.dose_pd),
                      borderColor: "orange",
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
                        text: "Doses",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        )}
        {selectedOption === "By Age" && selectedTime === "Today" && (
          <div>
            {todayData.length > 0 && (
              <Line
                data={{
                  labels: todayData.map((entry) => entry.label),
                  datasets: [
                    {
                      label: "Total doses",
                      data: todayData.map((entry) => entry.total),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "12-14",
                      data: todayData.map((entry) => entry.vac_12_14),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "15-17",
                      data: todayData.map((entry) => entry.vac_15_17),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "18-45",
                      data: todayData.map((entry) => entry.vac_18_45),
                      borderColor: "orange",
                      fill: false,
                    },
                    {
                      label: "45-60",
                      data: todayData.map((entry) => entry.vac_45_60),
                      borderColor: "violet",
                      fill: false,
                    },
                    {
                      label: "Above 60",
                      data: todayData.map((entry) => entry.vac_60_above),
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
                        text: "Doses",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        )}
        {selectedOption === "By Age" && selectedTime === "Last 30 Days" && (
          <div>
            {data.length > 0 && (
              <Line
                data={{
                  labels: data.map((entry) => entry.vaccine_date),
                  datasets: [
                    {
                      label: "Total doses",
                      data: data.map((entry) => entry.total),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "12-14",
                      data: data.map((entry) => entry.vac_12_14),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "15-17",
                      data: data.map((entry) => entry.vac_15_17),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "18-45",
                      data: data.map((entry) => entry.vac_18_45),
                      borderColor: "orange",
                      fill: false,
                    },
                    {
                      label: "45-60",
                      data: data.map((entry) => entry.vac_45_60),
                      borderColor: "violet",
                      fill: false,
                    },
                    {
                      label: "Above 60",
                      data: data.map((entry) => entry.vac_60_above),
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
                        text: "Doses",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        )}
        {selectedOption === "By Age" && selectedTime === "All Time" && (
          <div>
            {data.length > 0 && (
              <Line
                data={{
                  labels: data.map((entry) => entry.label),
                  datasets: [
                    {
                      label: "Total doses",
                      data: data.map((entry) => entry.total),
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "12-14",
                      data: data.map((entry) => entry.vac_12_14),
                      borderColor: "blue",
                      fill: false,
                    },
                    {
                      label: "15-17",
                      data: data.map((entry) => entry.vac_15_17),
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "18-45",
                      data: data.map((entry) => entry.vac_18_45),
                      borderColor: "orange",
                      fill: false,
                    },
                    {
                      label: "45-60",
                      data: data.map((entry) => entry.vac_45_60),
                      borderColor: "violet",
                      fill: false,
                    },
                    {
                      label: "Above 60",
                      data: data.map((entry) => entry.vac_60_above),
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
                        text: "Doses",
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

// import React ,{useEffect,useState}from "react";
// import "./Vaccination.css"

// export default function Vaccination(){
//    const [vaccinationData, setVaccinationData] = useState({});

//    useEffect(() => {
     
//      fetchVaccinationData();
//    }, []);

//    const fetchVaccinationData = async () => {
//      try {
//        const response = await fetch(
//          "https://edata.ndtv.com/cricket/coronavirus/vaccinations_stateswise.json"
//        );
//        const data = await response.json();
//        setVaccinationData(data.data);
//      } catch (error) {
//        console.error("Error fetching vaccination data:", error);
//      }
//    };
 
//    const calculateSumByDay = () => {
//      const sumByDay = {
//        Monday: { 2021: 0, 2022: 0, 2023: 0 },
//        Tuesday: { 2021: 0, 2022: 0, 2023: 0 },
//        Wednesday: { 2021: 0, 2022: 0, 2023: 0 },
//        Thursday: { 2021: 0, 2022: 0, 2023: 0 },
//        Friday: { 2021: 0, 2022: 0, 2023: 0 },
//        Saturday: { 2021: 0, 2022: 0, 2023: 0 },
//        Sunday: { 2021: 0, 2022: 0, 2023: 0 },
//      };

//      Object.values(vaccinationData).forEach((entry) => {
//        const date = new Date(entry.date * 1000);
//        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
//        const year = date.getFullYear();
//        const vaccinations = parseInt(entry.d.t);

//        // Accumulate the vaccinations based on the day of the week and year
//        sumByDay[dayOfWeek][year] += vaccinations;
//      });

//      return sumByDay;
//    };
//   const renderSumByDay = () => {
//     const sumByDay = calculateSumByDay();

//     return (
//       <div>
//         {Object.entries(sumByDay).map(([day, sums]) => (
//           <div key={day}>
//             <h3>{day}</h3>
//             <ul>
//               {Object.entries(sums).map(([year, sum]) => (
//                 <li key={year}>
//                   {year}: {sum}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     );
//   };

//     return (
//       <>
//         <div className="vaccination">
//           <h2>Sum of Vaccinations by Day and Year</h2>
//           {renderSumByDay()}
//         </div>
//       </>
//     );
// }
import React, { useEffect, useState,useRef } from "react";
import "./Vaccination.css";
import Chart from "chart.js/auto";
import VaccinationIndia from "./Vaccination/VaccinationIndia";
import VaccinationLive from "./Vaccination/VaccinationLive";
import StatewiseVaccination from "./Vaccination/StatewiseVaccination";
import VaccinationByDoseAge from "./Vaccination/VaccinationByDoseAge";
import VaccinationByGender from "./Vaccination/VaccinationByGender";
import Registration from "./Vaccination/Registration";
import RuralandUrban from "./Vaccination/RuralandUrban";

export default function Vaccination() {
  const [vaccinationData, setVaccinationData] = useState({});
  const [selectedYear, setSelectedYear] = useState("2021");
 
  const canvasRef = useRef(null);
  useEffect(() => {
    fetchVaccinationData();
  
  }, []);



  const fetchVaccinationData = async () => {
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

  const calculateSumByDay = () => {
    const sumByDay = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    Object.values(vaccinationData).forEach((entry) => {
      const date = new Date(entry.date * 1000);
      const year = date.getFullYear();
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      const vaccinations = parseInt(entry.d.t_24);
      
      if (year === parseInt(selectedYear)) {
       
        sumByDay[dayOfWeek] += vaccinations;
      }
    });

    return sumByDay;
  };

 const createChart = () => {
   const sumByDay = calculateSumByDay();
   console.log(sumByDay)
   const data = Object.values(sumByDay);

   const chartData = {
     labels: Object.keys(sumByDay),
     datasets: [
       {
         label: "Vaccinations",
         data: data,
         borderColor: "rgba(54, 162, 235, 1)",
         fill: false,
       },
     ],
   };
    const minVaccinations = Math.min(...data);
    
   const chartOptions = {
     responsive: true,
     scales: {
       y: {
         beginAtZero: false,
         min: minVaccinations,
         title: {
           display: true,
           text: "Vaccination Count",
         },
       },
     },
   };

   if (canvasRef.current) {
     if (canvasRef.current.chart) {
       canvasRef.current.chart.data = chartData;
       canvasRef.current.chart.options = chartOptions;
       canvasRef.current.chart.update();
     } else {
       const newChart = new Chart(canvasRef.current, {
         type: "line",
         data: chartData,
         options: chartOptions,
       });
       canvasRef.current.chart = newChart;
     }
   }
 };
useEffect(() => {
  createChart();
}, [selectedYear, vaccinationData]);
 


  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);
  };

  return (
    <>
      <div className="vaccination">
        <div className="vaccination-live">
          <VaccinationLive />
        </div>
        <div className="vaccination-day">
          <VaccinationIndia />
        </div>
        <div className="vaccination-chart">
          <div className="vaccine-types">
            <h3>Vaccination in India DayWise</h3>
            <select value={selectedYear} onChange={handleYearChange}>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className="vaccination-trend">
          <VaccinationByDoseAge />
        </div>
        <div className="vaccination-gender">
          <VaccinationByGender />
        </div>
        <div className="vaccination-registration">
          <Registration />
        </div>
        <div className="vaccination-ruralandurban">
          <RuralandUrban/>
        </div>
        <div className="vaccination-statewise">
          <StatewiseVaccination />
        </div>
      </div>
    </>
  );
}

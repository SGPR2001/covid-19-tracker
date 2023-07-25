import React,{useState,useEffect} from 'react';
import "./VaccinationByGender.css"
import { Pie } from "react-chartjs-2";
export default function VaccinationByGender(){
   const [data, setData] = useState(null);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const today = new Date().toISOString().slice(0, 10);
         const response = await fetch(
           `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=${today}`
         );
         const data = await response.json();
        
         setData(data.topBlock.vaccination);
       } catch (error) {
         console.error(error);
       }
     };

     fetchData();
   }, []);
  console.log(data)
    if (!data) {
      return <div>Loading...</div>;
    }

    
    const chartData = {
      labels: ["Male", "Female", "Others"],
      datasets: [
        {
          data: [data.male, data.female, data.others],
          backgroundColor: ["#36A2EB", "#FF6384", "#FF5733"],
          hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FF5733"],
        },
      ],
    };
      const chartData1 = {
        labels: ["Covishield", "Covaxin", "Sputnik", "Corbevax", "Covovax"],
        datasets: [
          {
            data: [
              data.covishield,
              data.covaxin,
              data.sputnik,
              data.corbevax,
              data.covovax,
            ],
            backgroundColor: [
              "#FF5733",
              "#FF6384",
              "#36A2EB",
              "#8A8AF0",
              "#6EEA70",
            ],
            hoverBackgroundColor: [
              "#FF5733",
              "#FF6384",
              "#36A2EB",
              "#8A8AF0",
              "#6EEA70",
            ],
          },
        ],
        
      };

    return (
      <div
        style={{
          width: "900px",
          display: "flex",
          alignItems: "center",
          paddingTop: "6px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "450px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            marginRight: "20px",
          }}
        >
          <h2>Vaccination By Gender</h2>
          <Pie style={{width:"350px",height:"200px"}}data={chartData} />
        </div>
        <div
          style={{
            width: "450px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <h2>Vaccination By Type</h2>
          <Pie data={chartData1} />
        </div>
      </div>
    );
}
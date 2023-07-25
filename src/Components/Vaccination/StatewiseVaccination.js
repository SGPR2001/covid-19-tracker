import React ,{useState,useEffect} from "react";
import "./StatewiseVaccination.css"
export default function StatewiseVaccination(){
 const [vaccinationData, setVaccinationData] = useState([]);

 useEffect(() => {
   fetchVaccinationData();
 }, []);

 const fetchVaccinationData = () => {
   fetch(
     "https://edata.ndtv.com/cricket/coronavirus/vaccinations_stateswise.json"
   )
     .then((response) => response.json())
     .then((data) => {
       const vaccinationData = data.data || {};
       const timestamps = Object.keys(vaccinationData);
       const yesterdayTimestamp = timestamps[timestamps.length - 2]

       if (yesterdayTimestamp) {
         const yesterdayData = vaccinationData[yesterdayTimestamp].st || {};
         console.log(yesterdayData)
         const todayData =
           vaccinationData[timestamps[timestamps.length - 1]].st || {};
          console.log(todayData)
         const formattedData = Object.keys(todayData).map((state) => ({
           state,
           totalVaccinations: parseInt(todayData[state].t),
           increase:
             parseInt(todayData[state].t) - parseInt(yesterdayData[state].t),
         }));

         setVaccinationData(formattedData);
       } else {
         console.error("Yesterday's vaccination data not available.");
       }
     })
     .catch((error) => {
       console.error("Error fetching vaccination data:", error);
     });
 };

 const getYesterdayTimestamp = (timestamps) => {
   const currentTimestamp = Math.floor(Date.now() / 1000);
   const yesterdayTimestamps = timestamps.filter(
     (timestamp) => parseInt(timestamp) < currentTimestamp
   );
   const maxTimestamp = Math.max(...yesterdayTimestamps);

   return maxTimestamp;
 };
 console.log(vaccinationData)
 return (
   <div className="vaccination-state-container">
     <h3>COVID-19 Statewise Vaccination</h3>
     <table className="vaccination-table">
       <thead>
         <tr>
           <th>State</th>
           <th>Total Vaccinations</th>
         </tr>
       </thead>
       <tbody>
         {vaccinationData.map((item, index) => (
           <tr key={index}>
             <td>{item.state}</td>
             <td>
               {item.totalVaccinations}
               {item.increase > 0 && (
                 <span className="increase">
                   <span className="arrow"></span>
                   {item.increase}
                 </span>
               )}
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );
}
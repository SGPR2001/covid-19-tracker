// import React from "react";


// export default function StateTrendsets({trendData}){


//     return (
//       <>
//         {trendData && trendData.increasingTrendStates.length > 0 && (
//           <div className="increasing">
//             <h4>Increasing Trend States</h4>
//             <table>
//               <thead>
//                 <tr>
//                   <th>State</th>
//                   <th>Trend Percentage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {trendData &&
//                   trendData.increasingTrendStates.map((state) => (
//                     <tr key={state.name}>
//                       <td>{state.name}</td>
//                       <td>{state.trendPercentage}%</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {trendData && trendData.decreasingTrendStates.length > 0 && (
//           <div className="decreasing">
//             <h4>Decreasing Trend States</h4>
//             <table>
//               <thead>
//                 <tr>
//                   <th>State</th>
//                   <th>Trend Percentage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {trendData &&
//                   trendData.decreasingTrendStates.map((state) => (
//                     <tr key={state.name}>
//                       <td>{state.name}</td>
//                       <td>{state.trendPercentage}%</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {trendData && trendData.stableStates.length > 0 && (
//           <div className="stable">
//             <h4>Stable States</h4>
//             <table>
//               <thead>
//                 <tr>
//                   <th>State</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {trendData &&
//                   trendData.stableStates.map((state) => (
//                     <tr key={state.name}>
//                       <td>{state.name}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </>
//     );
// }
import React from "react";
import { Bar } from "react-chartjs-2";
import "./StateTrendsets.css"

export default function StateTrendsets({ trendData,handleStateChange }) {
  const getChartData = (states) => {
    return {
      labels: states.map((state) => state.name),
      datasets: [
        {
          label: "Trend Percentage",
          data: states.map((state) => state.trendPercentage),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
     
    };
  };

const handleIncreasingBarClick = (event, elements) => {
  if (elements && elements.length > 0) {
    const dataIndex = elements[0].index;
    const clickedState = trendData.increasingTrendStates[dataIndex].name;
    handleStateChange({ target: { value: clickedState } });
  }
};

const handleDecreasingBarClick = (event, elements) => {
  if (elements && elements.length > 0) {
    const dataIndex = elements[0].index;
    const clickedState = trendData.decreasingTrendStates[dataIndex].name;
    handleStateChange({ target: { value: clickedState } });
  }
};

const handleTableItemClick = (stateName) => {
  handleStateChange({target:{value:stateName}});
};


  return (
    <>
      {trendData && trendData.increasingTrendStates.length > 0 && (
        <div className="increasing barchart-container">
          <h4>Increasing Trend States</h4>
          <div style={{ width: "300px" }}>
            <Bar
              data={getChartData(trendData.increasingTrendStates)}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                onClick: handleIncreasingBarClick,
              }}
            />
          </div>
        </div>
      )}

      {trendData && trendData.decreasingTrendStates.length > 0 && (
        <div className="decreasing barchart-container">
          <h4>Decreasing Trend States</h4>
          <div style={{ width: "500px", height: "300px" }}>
            <Bar
              data={getChartData(trendData.decreasingTrendStates)}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
                onClick: handleDecreasingBarClick,
              }}
            />
          </div>
        </div>
      )}

      {trendData && trendData.stableStates.length > 0 && (
        <div className="stable">
          <h4>Stable States</h4>
          <table>
            <thead>
              <tr>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {trendData &&
                trendData.stableStates.map((state) => (
                  <tr
                    key={state.name}
                    onClick={() => handleTableItemClick(state.name)}
                  >
                    <td>{state.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}


// import React ,{useState,useEffect}from "react";
// import "./StateInfo.css"
// import districtdata from "../States_Districts.json"
// function StateInfo({ stateName }) {
 
//   const [stateInfo, setStateInfo] = useState(null);
//   useEffect(() => {
//     fetch(`https://data.covid19india.org/data.json`)
//       .then((response) => response.json())
//       .then((data) => {
//         const info = data.statewise.find(
//           (s) => s.state.toLowerCase() === stateName
//         );
//         setStateInfo(info);
//       });
//   }, [stateName]);

 
//   if (!stateInfo) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <div className="state-info">
//       <h2>{stateName}</h2>
//       <p>Active: {stateInfo.active}</p>
//       <p>Confirmed: {stateInfo.confirmed}</p>
//       <p>Recovered: {stateInfo.recovered}</p>
//       <p>Deaths: {stateInfo.deaths}</p>
//     </div>
//   );
// }
// export default StateInfo
import React, { useState, useEffect } from "react";
import "./StateInfo.css";
import { MapContainer, Marker,TileLayer, GeoJSON } from "react-leaflet";
import districtdata from "../../States_Districts.json";
import stateslatlong from "../../states.json"

function StateInfo({ stateName,selectedState }) {
  const [stateInfo, setStateInfo] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  
 const [mapCenter, setMapCenter] = useState([29.23, 76.43]);
   
  useEffect(() => {
    const storedData = localStorage.getItem("covidData");
    const storedDataTimestamp = localStorage.getItem("covidDataTimestamp");
    const today = new Date();
    if (
      storedData &&
      storedDataTimestamp &&
      today.getDate() === new Date(storedDataTimestamp).getDate()
    ) {
      const data = JSON.parse(storedData);
      const Code = Object.keys(districtdata).find(
        (key) => districtdata[key].name.toLowerCase() === stateName
      );
      const stateCode = districtdata[Code].code;
      const districts = data[stateCode].districts;
      const districtList = Object.keys(districts).filter(
        (district) => district !== "Unknown"
      );
      const districtData = districtList.map((district) => {
        return {
          name: district,
          confirmed: districts[district].total.confirmed,
          active:
            districts[district].total.confirmed -
            districts[district].total.recovered -
            districts[district].total.deceased,
          recovered: districts[district].total.recovered,
          deaths: districts[district].total.deceased,
        };
      });
      setStateInfo(districtData);
    } else {
      console.log("hi");
      fetch("https://data.covid19india.org/v4/min/data.min.json")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("covidData", JSON.stringify(data));
          localStorage.setItem("covidDataTimestamp", today);
          const Code = Object.keys(districtdata).find(
            (key) => districtdata[key].name.toLowerCase() === stateName
          );
          const stateCode = districtdata[Code].code;
          const districts = data[stateCode].districts;
          const districtList = Object.keys(districts).filter(
            (district) => district !== "Unknown"
          );
          const districtData = districtList.map((district) => {
            return {
              name: district,
              confirmed: districts[district].total.confirmed,
              active:
                districts[district].total.confirmed -
                districts[district].total.recovered -
                districts[district].total.deceased,
              recovered: districts[district].total.recovered,
              deaths: districts[district].total.deceased,
            };
          });
          setStateInfo(districtData);
        });
    }
  }, [stateName]);

  useEffect(() => {
    
    import(`../../GeoJsonData/${stateName}.json`)
      .then((data) => setGeoJsonData(data.features))
      .catch((error) => console.log(error));
    const state = stateslatlong.find(
      (s) => s.Name.toLowerCase() === stateName.toLowerCase()
    );
    if (state) {
      setMapCenter([state.latitude, state.longitude]);
    }
   
  }, [stateName]);
  
  const onEachDistrict = (district, layer) => {
    const name = district.properties.District;
  const districtName = name.toLowerCase();
  const districtInfo = stateInfo.find(
    (s) => s.name.toLowerCase() === districtName
  );

  if (districtInfo) {
    const popupContent =
      `<h3>${name}</h3>` +
      `<p>Confirmed: ${districtInfo.confirmed}</p>` +
      `<p>Active: ${districtInfo.active}</p>` +
      `<p>Recovered: ${districtInfo.recovered}</p>`+
      `<p>Deaths: ${districtInfo.deaths}</p>`;

    layer.bindPopup(popupContent);
  }

  
    layer.on({
     
      mouseover: (e) => {
        const layer = e.target;
        layer.openPopup();
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.closePopup();
      },
    });
  };
 
  
  if (!stateInfo || !geoJsonData) {
    return <p>Loading...</p>;
  }
 const handleCancelClick=()=>{
  selectedState(null)
 }
  return (
    <div className="state-info">
      <div className="header">
        <h2>{stateName.toUpperCase()}</h2>
        <button onClick={handleCancelClick}> India Map</button>
      </div>
      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={7.45}
          style={{ height: "500px", width: "100%" }}
        >
          <Marker position={mapCenter} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* {stateName === "Haryana" ? (
          <GeoJSON data={geoJsonData} onEachFeature={onEachDistrict} />
        ) : (
          <GeoJSON data={geoJsonData}  />
        )} */}
          <GeoJSON data={geoJsonData} onEachFeature={onEachDistrict} />
        </MapContainer>
        <table>
          <thead>
            <tr>
              <th>District</th>
              <th>Confirmed</th>
              <th>Active</th>
              <th>Recovered</th>
              <th>Deaths</th>
            </tr>
          </thead>
          <tbody>
            {stateInfo &&
              stateInfo.map((district) => (
                <tr key={district.name}>
                  <td>{district.name}</td>
                  <td>{district.confirmed}</td>
                  <td>{district.active}</td>
                  <td>{district.recovered}</td>
                  <td>{district.deaths}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StateInfo;

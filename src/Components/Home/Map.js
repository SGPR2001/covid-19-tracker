// import React from 'react'
// // import { useState,useEffect } from 'react';
// import { MapContainer , TileLayer,Marker } from "react-leaflet";
// import "./Map.css"
// import L from "leaflet";
// import { showDataOnMap } from './util';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// function Map({countries,casesType,center,zoom}) {
//   return (
//     <div className="map">
//       <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={center}/>
          
       
//         {showDataOnMap(countries,casesType)}
//       </MapContainer>
//     </div>
//   );
// }
// // function Map({ center, zoom }) {
// //   const [map, setMap] = useState(null);

// //   useEffect(() => {
// //     if (map) {
// //       map.flyTo(center, zoom,{duration:2});
// //     }
// //   }, [center, zoom, map]);

// //   return (
// //     <div className="map">
// //       <MapContainer
// //         center={center}
// //         zoom={zoom}
// //         scrollWheelZoom={true}
// //         whenCreated={setMap}
// //       >
// //         <TileLayer
// //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //         />
// //         <Marker position={center}>
// //           <Popup>
// //             A pretty CSS3 popup. <br /> Easily customizable.
// //           </Popup>
// //         </Marker>
// //       </MapContainer>
// //     </div>
// //   );
// // }


// export default Map

import React ,{useRef,useEffect,useState}from "react";
import { MapContainer as LeafletMap, TileLayer,Marker,GeoJSON } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";
import L from "leaflet";

import StateInfo from "./StateInfo";
import indiaStatesData2 from "../../India_states2.json"
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Map({ countries, casesType, center, zoom }) {
  const mapRef = useRef();
  
  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  useEffect(() => {
    if (mapRef.current && mapRef.current.leafletElement) {
      const map = mapRef.current.leafletElement;
      map.setView(center, zoom);
    }
  }, [center, zoom]);

  useEffect(() => {
    
    fetch("https://data.covid19india.org/data.json")
      .then((response) => response.json())
      .then((data) => {
        setStateData(data.statewise);
      });
  }, []);
 
  const onEachState = (state, layer) => {
   
    // const name = state.properties.STATE;
     const name = state.properties.NAME_1;
    const stateName = state.properties.NAME_1.toLowerCase();
    const stateInfo = stateData.find(
      (s) => s.state.toLowerCase() === stateName
    );

    const popupContent = stateInfo
      ? `<div class="state-popup">
      <h3>${name}</h3>
      <p>Active: ${stateInfo.active}</p>
      <p>Confirmed: ${stateInfo.confirmed}</p>
      <p>Recovered: ${stateInfo.recovered}</p>
      <p>Deaths: ${stateInfo.deaths}</p>
    </div>`
      : "No data available";
    layer.bindPopup(popupContent);

    layer.on({
      click: (e) => {
        const stateName = state.properties.NAME_1.toLowerCase();
        setSelectedState(stateName); // set the selected state
      },
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
   const handleCancelClick = () => {
    setSelectedState(null); 
  };
  
  return (
    <div className="map">
      {selectedState ? (
        <div className="state-popup">
          <StateInfo stateName={selectedState}  selectedState={handleCancelClick}/>
          {/* <button onClick={handleCancelClick}>Back to Map</button> */}
        </div>
      ) : (
        <LeafletMap
          key={`${center[0]}-${center[1]}`}
          center={center}
          zoom={zoom}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center} />
          {showDataOnMap(countries, casesType)}
          {stateData.length ? (
            <GeoJSON data={indiaStatesData2} onEachFeature={onEachState} />
          ) : null}
        </LeafletMap>
      )}  
    </div>
  );
}

export default Map;
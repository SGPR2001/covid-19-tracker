import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import InfoBox from "./Home/InfoBox";
import LineGraph from "./Home/LineGraph";
import Table from "./Home/Table";
import { sortData, prettyPrintStat } from "./Home/util";
import numeral from "numeral";
import Map from "./Home/Map";
import "leaflet/dist/leaflet.css";
import News from "../Components/Home/News"
const Home = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
     const storedData = localStorage.getItem("worldwideInfo");
    const storedDataTimestamp = localStorage.getItem("worldwideInfoTimestamp");
    const today = new Date();
    if (
      storedData &&
      storedDataTimestamp &&
      today.getDate() === new Date(storedDataTimestamp).getDate()
    ) {
      const data = JSON.parse(storedData);
      setCountryInfo(data);
    }else{
      console.log("hi1")
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("worldwideInfo", JSON.stringify(data));
        localStorage.setItem("worldwideInfoTimestamp", today);
        setCountryInfo(data);
      });
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("countriesInfo");
    const storedDataTimestamp = localStorage.getItem("countriesInfoTimestamp");
    const today = new Date();
    if (
      storedData &&
      storedDataTimestamp &&
      today.getDate() === new Date(storedDataTimestamp).getDate()
    ){
      const data = JSON.parse(storedData);
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
       let sortedData = sortData(data);
       setCountries(countries);
       setMapCountries(data);
       setTableData(sortedData);
    }
    else{
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
           localStorage.setItem("countriesInfo", JSON.stringify(data));
           localStorage.setItem("countriesInfoTimestamp", today);
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }
  }, []);

  const onCountryChange = async (e) => {
    
    const countryCode = e.target.value;
    const storedData = localStorage.getItem(`countryInfo-${countryCode}`);
    const storedDataTimestamp = localStorage.getItem(
      `countryInfoTimestamp-${countryCode}`
    );
    const today = new Date();
     if (
      storedData &&
      storedDataTimestamp &&
      today.getDate() === new Date(storedDataTimestamp).getDate()
    ){
         const data = JSON.parse(storedData);
          setInputCountry(countryCode);
          setCountryInfo(data);
          if (countryCode === "worldwide") {
            setMapCenter([34.80746, -40.4796]);
            setMapZoom(2);
          } else {
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            setMapZoom(5);
          }
          
    }
    else{
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(
          `countryInfo-${countryCode}`,
          JSON.stringify(data)
        );
        localStorage.setItem(`countryInfoTimestamp-${countryCode}`, today);
        setInputCountry(countryCode);
        setCountryInfo(data);
        if (countryCode === "worldwide") {
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(2);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(5);
        }
      });
    }
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <div className="india-states">
          <Link to="/about">
            <button
              style={{
                marginRight: "10px",
                backgroundColor: "blue",
                color: "white",
              }}
            >
              IndiaStatewiseData
            </button>
          </Link>
          <Link to="/statewisedeaths">
            <button
              style={{
                marginRight: "10px",
                backgroundColor: "blue",
                color: "white",
              }}
            >
              IndiaStatewiseDeaths
            </button>
          </Link>
          <Link to="/vaccination">
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
              }}
            >
              VaccinationData
            </button>
          </Link>
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
        <Link to="/awareness">
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Awareness
          </button>
        </Link>
        <CardContent>
          <News />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

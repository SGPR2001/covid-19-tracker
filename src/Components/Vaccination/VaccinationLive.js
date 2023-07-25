import React, { useState, useEffect } from "react";
import "./VaccinationLive.css";

export default function VaccinationLive() {
  const [todayCount, setTodayCount] = useState(0);
  const [yesterdayCount, setYesterdayCount] = useState(0);
  const [totalDoses, setTotalDoses] = useState(0);

  useEffect(() => {
    // Fetch data from the API to get today's count initially
    fetchTodayCount();

    // Fetch data from the API to get yesterday's count and total doses initially
    fetchYesterdayData();

    // Fetch today's count every 10 seconds
    const interval = setInterval(fetchTodayCount, 10000);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(interval);
    };
  }, []);

  const fetchTodayCount = () => {
    fetch("https://cdn-api.co-vin.in/api/v1/reports/getLiveVaccination")
      .then((response) => response.json())
      .then((data) => {
        const todayVaccinationCount = data.count || 0;
        setTodayCount(todayVaccinationCount);
      })
      .catch((error) => {
        console.error("Error fetching today's vaccination count:", error);
      });
  };

  const fetchYesterdayData = () => {
    fetch(
      "https://edata.ndtv.com/cricket/coronavirus/vaccinations_stateswise.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const vaccinationData = data.data || {};
        const timestamps = Object.keys(vaccinationData);
        const yesterdayTimestamp = getYesterdayTimestamp(timestamps);

        if (yesterdayTimestamp) {
          const yesterdayData = vaccinationData[yesterdayTimestamp];
          const yesterdayVaccinationCount =
            parseInt(yesterdayData?.d?.t_24) || 0;
          const totalDosesCount = parseInt(yesterdayData?.d?.t) || 0;

          setYesterdayCount(yesterdayVaccinationCount);
          setTotalDoses(totalDosesCount);
        } else {
          console.error("Yesterday's vaccination data not available.");
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching yesterday's and total doses count:",
          error
        );
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

  return (
    <div className="vaccination-status-container">
      <h3>VACCINATION DOSE STATUS</h3>
      <div className="vaccination-count">
        <div className="count">{todayCount}</div>
        <hr className="line" />
        <div className="label">VACCINATION TODAY</div>
      </div>
      <div className="vaccination-count yesterday-count">
        <span>
          VACCINATION DOSES DAY BEFORE: <label>{yesterdayCount}</label>
        </span>
      </div>
      <div className="vaccination-count total-count">
        <span>
          TOTAL VACCINATION DOSES: <label>{totalDoses}</label>
        </span>
      </div>
    </div>
  );
}

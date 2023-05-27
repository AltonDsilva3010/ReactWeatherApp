import React from "react";
import "../App.css";

const CurrentWeatherTable = ({ currentData }) => {
  return (
    <div>
      <table className="weather-table">
        <tr>
          <th colspan="5">
            <h2>Current Weather</h2>
          </th>
        </tr>
        <tr>
          <th colspan="1">Report Taken at:</th>
          <th colspan="2">
            <h2>Date:</h2>
          </th>
          <th colspan="2">
            <h2>Time:</h2>
          </th>
        </tr>
        <tr>
          <br />
        </tr>
        <tr>
          <th>Weather Condition</th>
          <th>Temperature</th>
          <th>Feels Like</th>
          <th>Humidity</th>
          <th>Wind</th>
        </tr>
        <tr>
          <td>{currentData.condition}</td>
          <td>{currentData.tempc}°C</td>
          <td>{currentData.feelslikec}°C</td>
          <td>{currentData.humidity}%</td>
          <td>{currentData.windkph}km/h</td>
        </tr>
      </table>
    </div>
  );
};

export default CurrentWeatherTable;

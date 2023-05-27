import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CurrentWeatherTable from "./Components/CurrentWeatherTable";
import Chart from "chart.js/auto";

function App() {
  const API_KEY = "abeb2050daf64c5d99b163513232103";
  const base_url = "http://api.weatherapi.com/v1";
  const [city, setCity] = useState("Delhi");
  const [formCity, setFormCity] = useState("");
  const [currentData, setCurrentData] = useState({
    tempc: "",
    feelslikec: "",
    humidity: "",
    condition: "",
    date: "",
    time: "",
    windkph: "",
    location: "",
  });
  const [forecastData, setForecastData] = useState([]);
  // const [weatherChart, setWeatherChart] = useState(null);
  // const [dayweather, setDayWeather] = useState({
  //   date: "",
  //   maxtemp: "",
  //   mintemp: "",
  //   humidity: "",
  //   weathercondi: "",
  // });

  useEffect(() => {
    const GetCurrentWeather = async (getcity) => {
      const config = {
        headers: {
          key: API_KEY,
        },
      };
      try {
        await axios
          .get(`${base_url}/current.json?q=${getcity}`, config)
          .then((response) => {
            let data = response.data;
            let current = data.current;
            let condition = data.current.condition;
            let location = data.location;
            setCurrentData({
              tempc: current.temp_c,
              feelslikec: current.feelslike_c,
              humidity: current.humidity,
              condition: condition.text,
              date: location.localtime,
              time: location.localtime,
              windkph: current.wind_kph,
              location: location.name,
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    const GetForecast = async (city) => {
      let days = 7;
      setForecastData([]);
      const config = {
        headers: {
          key: API_KEY,
        },
      };
      try {
        let response = await axios.get(
          `${base_url}/forecast.json?q=${city}&days=${days}`,
          config
        );
        let arrayofdays = response.data.forecast.forecastday;
        setForecastData(arrayofdays);
      } catch (error) {
        console.log(error.message);
      }
    };

    GetForecast(city);
    GetCurrentWeather(city);
  }, [city]);

  useEffect(() => {
    const setChart = () => {
      if (forecastData.length == 7) {
        const chartData = {
          labels: forecastData.map(
            (day) => day.date + "\n" + day.day.condition.text
          ),

          datasets: [
            {
              label: "Max Temperature in °C",
              borderColor: "red",
              data: forecastData.map((day) => day.day.maxtemp_c),
            },
            {
              label: "Min Temperature in °C",
              borderColor: "blue",
              data: forecastData.map((day) => day.day.mintemp_c),
            },
            {
              label: "Humidity",
              borderColor: "green",
              data: [60, 55, 65, 70, 75, 80, 85],
            },
          ],
        };

        const chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        };

        let weatherChart = new Chart(
          document.getElementById("weather-chart").getContext("2d"),
          {
            type: "line",
            data: chartData,
            options: chartOptions,
          }
        );

        return () => {
          weatherChart.destroy();
        };
      }
    };
    const cleanup = setChart();
    return () => {
      cleanup && cleanup();
    };
  }, ["weather-chart", forecastData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(formCity);
  };

  return (
    <div className="App">
      <h1>Weather Reporter!</h1>
      <form className="city-form" onSubmit={handleSubmit}>
        <label for="city">
          Enter your City Name <br />
        </label>
        <input
          type="text"
          name="city"
          value={formCity}
          onChange={(e) => setFormCity(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h2 className="city-header">{`Showing Weather for:${city}`}</h2>
      <div className="weathertablecontainer">
        <CurrentWeatherTable currentData={currentData}></CurrentWeatherTable>
      </div>
      <div className="forecast-container">
        <h2>7 day Forecast!</h2>
        <div className="chart-container">
          <canvas id="weather-chart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;

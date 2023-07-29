import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs.jsx";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import formattedApiData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("Mumbai");
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query;

      try {
        toast.info("Fetching Weather for " + message);
        await formattedApiData(query, units).then((data) => {
          toast.success(
            `Successfully fetched weather for ${data.cityData.EnglishName}, ${data.cityData.StateName}, ${data.currentWeatherData.country}`
          );
          setWeather(data);
        });
      } catch (error) {
        toast.error("Failed to Fetch Weather for " + message);
        toast.error(error);
      }
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.currentWeatherData.temp <= threshold)
      return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 mb-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} shadow-xl shadow-gray-400 rounded-xl`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast
            title={"hourly forecast"}
            items={weather.hourlyForecastData}
          />
          <Forecast
            title={"daily forecast"}
            items={weather.dailyForecastData}
          />
        </div>
      )}
      <Footer />
      <ToastContainer
        autoClose={5000}
        theme="colored"
        newestOnTop={true}
        closeOnClick={true}
      />
    </div>
  );
}

export default App;

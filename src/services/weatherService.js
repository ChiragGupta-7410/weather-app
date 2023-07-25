import { DateTime } from "luxon";

const LOCATION_URL =
  "http://dataservice.accuweather.com/locations/v1/cities/search";

const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

const DAILY_FORECAST_URL =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";

const HOURLY_FORECAST_URL =
  "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";

const API_KEY = process.env.REACT_APP_API_KEY.split(" ");
const API_KEY_2 = process.env.REACT_APP_API_KEY_2;

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const formatCityData = (data) => {
  const {
    Key,
    EnglishName,
    TimeZone: { Name },
    AdministrativeArea: { EnglishName: StateName },
    GeoPosition: { Latitude, Longitude },
  } = data;

  return { Key, EnglishName, Name, StateName, Latitude, Longitude };
};

const formatWeatherData = (data) => {
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    dt,
    sys: { country, sunrise, sunset },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    speed,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
  };
};

const formatDailyForecastData = (data, zone) => {
  let { DailyForecasts } = data;

  DailyForecasts = DailyForecasts.slice(1, 5).map((d) => {
    return {
      title: formatToLocalTime(d.EpochDate, zone, "ccc"),
      temp: d.Temperature.Maximum.Value,
      icon: d.Day.Icon,
    };
  });

  return DailyForecasts;
};

const formatHourlyForecastData = (data, zone) => {
  let HourlyForecasts = data.slice(1, 5).map((d) => {
    return {
      title: formatToLocalTime(d.EpochDateTime, zone, "hh:mm a"),
      temp: d.Temperature.Value,
      icon: d.WeatherIcon,
    };
  });

  return HourlyForecasts;
};

const getCity = async (city) => {
  for (let i = 0; i < API_KEY.length; i++) {
    try {
      const query = `?apikey=${API_KEY[i]}&q=${city}`;

      const response = await fetch(LOCATION_URL + query);
      const data = await response.json();

      return data[0];
    } catch (error) {
      continue;
    }
  }
};

const getWeatherData = async (lat, lon, units = "metric") => {
  const query = `?lat=${lat}&lon=${lon}&appid=${API_KEY_2}&units=${units}`;

  const response = await fetch(CURRENT_WEATHER_URL + query);
  const data = await response.json();

  return data;
};

const getDailyForecastData = async (key, units = "metric") => {
  let metric = "false";
  if (units === "metric") {
    metric = "true";
  }

  for (let i = 0; i < API_KEY.length; i++) {
    try {
      const query = `${key}?apikey=${API_KEY[i]}&metric=${metric}`;

      const response = await fetch(DAILY_FORECAST_URL + query);
      const data = await response.json();

      return data;
    } catch (error) {
      continue;
    }
  }
};

const getHourlyForecastData = async (key, units = "metric") => {
  let metric = "false";
  if (units === "metric") {
    metric = "true";
  }

  for (let i = 0; i < API_KEY.length; i++) {
    try {
      const query = `${key}?apikey=${API_KEY[i]}&metric=${metric}`;

      const response = await fetch(HOURLY_FORECAST_URL + query);
      const data = await response.json();

      return data;
    } catch (error) {
      continue;
    }
  }
};

const formattedApiData = async (city, units = "metric") => {
  const cityData = await getCity(city).then(formatCityData);

  const currentWeatherData = await getWeatherData(
    cityData.Latitude,
    cityData.Longitude,
    units
  ).then(formatWeatherData);

  const dailyForecastData = await getDailyForecastData(
    cityData.Key,
    units
  ).then((res) => formatDailyForecastData(res, cityData.Name));

  const hourlyForecastData = await getHourlyForecastData(
    cityData.Key,
    units
  ).then((res) => formatHourlyForecastData(res, cityData.Name));

  const data = {
    cityData,
    currentWeatherData,
    dailyForecastData,
    hourlyForecastData,
  };

  return data;
};

const iconUrlFromOpenWeatherCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

const iconUrlFromAccuWeatherCode = (code) => {
  if (code < 10) {
    code = "0" + code.toString();
  }

  return `https://developer.accuweather.com/sites/default/files/${code}-s.png`;
};

export default formattedApiData;

export {
  formatToLocalTime,
  iconUrlFromAccuWeatherCode,
  iconUrlFromOpenWeatherCode,
};

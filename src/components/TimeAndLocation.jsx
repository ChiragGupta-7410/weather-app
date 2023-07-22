import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function TimeAndLocation({
  weather: {
    cityData: { EnglishName, Name, StateName },
    currentWeatherData: { dt, country },
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, Name)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${EnglishName}, ${StateName}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;

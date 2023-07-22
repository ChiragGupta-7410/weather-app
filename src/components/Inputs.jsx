import React from "react";
import { UilSearch, UilCelsius, UilFahrenheit } from "@iconscout/react-unicons";
import { useState } from "react";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (selectedUnit !== units) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery(city);
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Enter Location"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize rounded-lg"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out  hover:scale-125"
          onClick={handleSearchClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light"
          onClick={handleUnitChange}
        >
          <UilCelsius className="text-white cursor-pointer transition ease-out hover:scale-125" />
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light"
          onClick={handleUnitChange}
        >
          <UilFahrenheit className="text-white cursor-pointer transition ease-out hover:scale-125" />
        </button>
      </div>
    </div>
  );
}

export default Inputs;

import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Jaipur",
    },
    {
      id: 2,
      title: "Jhunjhunu",
    },
    {
      id: 3,
      title: "Dhanbad",
    },
    {
      id: 4,
      title: "Delhi",
    },
    {
      id: 5,
      title: "Mumbai",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium transition ease-in hover:scale-125"
          onClick={() => setQuery(city.title)}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;

import { useState } from "react";
import axios from "axios";

// Weather Icons
import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiCloudy,
  WiRain,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

export default function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // ---------------------------------------
  // PICK ICON BASED ON WEATHER + DAY/NIGHT
  // ---------------------------------------
  const getIcon = (code, is_day) => {
    const day = is_day === 1;

    if (code === 0) return day ? <WiDaySunny size={70} color="#facc15" /> : <WiNightClear size={70} color="#38bdf8" />;
    if (code === 1 || code === 2) return <WiCloud size={70} color="#60a5fa" />;
    if (code === 3) return <WiCloudy size={70} color="#94a3b8" />;
    if (code >= 45 && code <= 48) return <WiFog size={70} color="#6b7280" />;
    if (code >= 51 && code <= 67) return <WiRain size={70} color="#3b82f6" />;
    if (code >= 61 && code <= 82) return <WiRain size={70} color="#2563eb" />;
    if (code >= 95) return <WiThunderstorm size={70} color="#f87171" />;

    return <WiCloud size={70} color="#9ca3af" />;
  };

  // ---------------------------------------
  // FETCH WEATHER FROM BACKEND
  // ---------------------------------------
  const getWeather = async () => {
    try {
      setError("");
      setData(null);

      const res = await axios.get(
        `http://127.0.0.1:8000/api/weather/?city=${city}`
      );

      if (res.data.error) {
        setError(res.data.error);
        return;
      }

      setData(res.data);
    } catch {
      setError("Unable to fetch weather. Try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Weather Info</h2>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter city name"
        className="w-full border p-2 rounded mb-4"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* BUTTON */}
      <button
        onClick={getWeather}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        Get Weather
      </button>

      {/* ERROR */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* WEATHER CARD */}
      {data && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">

          {/* ICON */}
          <div className="flex justify-center mb-3">
            {getIcon(data.weathercode, data.is_day)}
          </div>

          <h3 className="text-xl font-semibold mb-2 text-indigo-700">
            {data.city} Weather
          </h3>

          <p><strong>Temperature:</strong> {data.temperature}°C</p>
          <p><strong>Wind Speed:</strong> {data.windspeed} km/h</p>
          <p><strong>Wind Direction:</strong> {data.winddirection}°</p>
          <p><strong>Weather Code:</strong> {data.weathercode}</p>
          <p><strong>Day/Night:</strong> {data.is_day === 1 ? "Day" : "Night"}</p>
        </div>
      )}
    </div>
  );
}

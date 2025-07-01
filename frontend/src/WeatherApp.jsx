import React, { useState } from "react";

// Mapeamento dos códigos de clima da Open-Meteo para descrições em português
const weatherCodeMap = {
  0: "Céu limpo",
  1: "Principalmente claro",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Névoa",
  48: "Névoa gelada",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa densa",
  56: "Garoa congelante leve",
  57: "Garoa congelante densa",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva forte",
  66: "Chuva congelante leve",
  67: "Chuva congelante forte",
  71: "Neve leve",
  73: "Neve moderada",
  75: "Neve forte",
  77: "Grãos de neve",
  80: "Aguaceiros leves",
  81: "Aguaceiros moderados",
  82: "Aguaceiros violentos",
  85: "Aguaceiros de neve leves",
  86: "Aguaceiros de neve fortes",
  95: "Trovoada",
  96: "Trovoada com granizo leve",
  99: "Trovoada com granizo forte",
};

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherResults, setWeatherResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchCoordinates(cityName) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      cityName
    )}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: { "User-Agent": "clima-app/1.0" },
    });
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      };
    }
    return null;
  }

  async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
    const response = await fetch(url);
    return await response.json();
  }

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const c = await fetchCoordinates(city);
      if (!c) {
        setError("Cidade não encontrada. Tente novamente.");
        setLoading(false);
        return;
      }

      const w = await fetchWeather(c.lat, c.lon);
      if (!w.current_weather) {
        setError("Não foi possível obter os dados do clima.");
        setLoading(false);
        return;
      }

      setWeatherResults(prev => [
  {
    city: city,
    display_name: c.display_name,
    temperature: w.current_weather.temperature,
    windspeed: w.current_weather.windspeed,
    weathercode: w.current_weather.weathercode,
    summary: weatherCodeMap[w.current_weather.weathercode] || "Desconhecido",
  },
  ...prev,
]);

      setCity("");
    } catch (err) {
      setError("Erro ao buscar dados. Tente novamente.");
    }

    setLoading(false);
  }

  return (
    <div className="flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Tempo Atual
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            placeholder="Digite o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg"
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {error && <div className="text-red-600 text-center mb-2">{error}</div>}

        {weatherResults.length === 0 && !error && (
          <div className="text-gray-500 text-center mb-2">
            Digite o nome de uma cidade para ver o clima atual.
          </div>
        )}

        {weatherResults.length > 0 && (
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-800 mb-1">
              {weatherResults[0].temperature}°C
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {weatherResults[0].summary}
            </div>
            <div className="text-sm text-blue-900 font-medium space-y-1">
              <p>
                <strong>Temperatura:</strong> {weatherResults[0].temperature}°C
              </p>
              <p>
                <strong>Velocidade do Vento:</strong>{" "}
                {weatherResults[0].windspeed} km/h
              </p>
              <p>
                <strong>Local:</strong> {weatherResults[0].display_name}
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-6 text-blue-900 text-xs opacity-70 text-center">
        Powered by Open-Meteo & OpenStreetMap
      </footer>
    </div>
  );
};

export default WeatherApp;

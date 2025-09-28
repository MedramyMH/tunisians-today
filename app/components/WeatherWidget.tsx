// components/WeatherWidget.tsx
'use client';
import { useEffect, useState } from 'react';

export default function WeatherWidget({ lang = 'ar' }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          
          // Fetch weather data
          const response = await fetch(
            `/api/weather?lat=${latitude}&lon=${longitude}&lang=${lang}`
          );
          const data = await response.json();
          setWeather(data);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Tunis weather
          fetchWeather(36.8, 10.1);
        }
      );
    }
  }, [lang]);

  const fetchWeather = async (lat, lon) => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&lang=${lang}`);
    const data = await response.json();
    setWeather(data);
  };

  if (!weather) {
    return <div className="animate-pulse bg-gray-200 h-40 rounded"></div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        {lang === 'ar' ? 'حالة الطقس' : 'Météo'}
      </h2>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold">{Math.round(weather.current.temp)}°C</div>
          <div className="capitalize">{weather.current.weather[0].description}</div>
          <div>{weather.current.city}</div>
        </div>
        <div className="text-6xl">
          {weather.current.weather[0].main.includes('Cloud') && '☁️'}
          {weather.current.weather[0].main.includes('Sun') && '☀️'}
          {weather.current.weather[0].main.includes('Rain') && '🌧️'}
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mt-4">
        {weather.forecast.slice(0, 5).map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-sm">
              {new Date(day.dt * 1000).toLocaleDateString(lang, { weekday: 'short' })}
            </div>
            <div className="text-2xl">{Math.round(day.temp.day)}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState } from 'react'
import { Input, Button, Card } from 'antd';

import './App.css'

function App() {
  const [input, setInput]= useState('');
  const [weather, setCurrentWeather] = useState<WeatherData | null>(null);
  interface WeatherData {
  city: string;
  tempC: number;
  condition: string;
  conditionDesc: string;
  wind: number | null;
  humidity: number | null;
  raw: any;
  fetchedAt: number;
}

  const fetchWeather = async (city: string) => {
    console.log('input : ', city);
    const key = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      if (!key) throw new Error('NO_API_KEY');
      const res = await fetch(`${apiUrl}?q=${encodeURIComponent(city)}&units=metric&appid=${key}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('CITY_NOT_FOUND');
        throw new Error('API_ERROR');
      }
      const json = await res.json();
      const weather: WeatherData = {
        city: `${json.name}${json.sys?.country ? ', ' + json.sys.country : ''}`,
        tempC: Math.round(json.main.temp),
        condition: json.weather?.[0]?.main || 'N/A',
        conditionDesc: json.weather?.[0]?.description || '',
        wind: json.wind?.speed ?? null,
        humidity: json.main?.humidity ?? null,
        raw: json,
        fetchedAt: Date.now(),
      };
      setCurrentWeather(weather);
  }catch (err: any) {
      if (err.message === 'NO_API_KEY') {
        const mock: WeatherData = { city, tempC: 22, condition: 'Clear', conditionDesc: 'clear sky', wind: 3.4, humidity: 45, raw: null, fetchedAt: Date.now() };
        setCurrentWeather(mock);
       
      } else if (err.message === 'CITY_NOT_FOUND') {
        
      } else {
       
      }
    } 
  };
  return (
    <div className={"min-h-screen py-8 px-4 "}>
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <div>Weather Outfit Recommender</div>
            <div>Type a city to get the current weather and outfit suggestions</div>
          </div>
          
        </header>

        <main>
          
          <div className="flex gap-2 items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a city (e.g., London, Kolkata)"         
          onPressEnter={() => fetchWeather(input)}
          allowClear
        />
        <Button type="primary"  onClick={() => fetchWeather(input)}>
          Search
        </Button>
      </div>
          {weather && (
            <Card>
              <div>City: {weather.city}</div>
              <div>Temperature: {weather.tempC}°C</div>
              <div>Condition: {weather.conditionDesc}</div>
              <div>Wind: {weather.wind} m/s</div>
              <div>Humidity: {weather.humidity}%</div>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

export default App

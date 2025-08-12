import React, { useState,  } from 'react';
import { Input, Button, message } from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useWeatherStore } from '../stores/useWeatherStore';
import type { WeatherData } from '../types';

const SearchBox: React.FC = () => {
  const { setCurrentWeather, setLoading, addToHistory } = useWeatherStore();
  const [input, setInput] = useState('');

  
  const fetchWeather = async (city: string) => {
    console.log('input : ', city);
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
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
       addToHistory(weather.city);
  }catch (err: any) {
      if (err.message === 'NO_API_KEY') {
        const mock: WeatherData = { city, tempC: 22, condition: 'Clear', conditionDesc: 'clear sky', wind: 3.4, humidity: 45, raw: null, fetchedAt: Date.now() };
        setCurrentWeather(mock);
        addToHistory(mock.city);
        message.warning('No API key found. Showing mocked data.');
      } else if (err.message === 'CITY_NOT_FOUND') {
        message.error('City not found. Please try another name.');
      } else {
        message.error('Failed to fetch weather. Please try again.');
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="flex gap-2">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a city" prefix={<EnvironmentOutlined />} onPressEnter={() => fetchWeather(input)} allowClear />
      <Button type="primary" icon={<SearchOutlined />} onClick={() => fetchWeather(input)}>Search</Button>
      
    </div>
  );
};

export default SearchBox
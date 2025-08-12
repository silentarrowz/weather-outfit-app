import React from 'react';
import { Card,  Spin, Typography } from 'antd';
import { useWeatherStore } from '../stores/useWeatherStore';


const { Title } = Typography;

export const WeatherCard: React.FC = () => {
  const { currentWeather, loading } = useWeatherStore();
  if (loading) return <div className="flex justify-center mt-8"><Spin tip="Loading weather..." /></div>;
  if (!currentWeather) return null;
  
  return (
    <Card className="mt-6 max-w-3xl mx-auto">
      <Title level={4}>{currentWeather.city}</Title>
      <div className="text-2xl">{currentWeather.tempC}°C — {currentWeather.condition} ({currentWeather.conditionDesc})</div>
      <div>Wind: {currentWeather.wind} m/s | Humidity: {currentWeather.humidity}%</div>      
    </Card>
  );
};
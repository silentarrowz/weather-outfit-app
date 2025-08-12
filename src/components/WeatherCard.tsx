import React from 'react';
import { Card,  Spin, Typography, List } from 'antd';
import { useWeatherStore } from '../stores/useWeatherStore';
import { recommendOutfit } from '../utils/recommendedOutfit';


const { Title, Text } = Typography;


export const WeatherCard: React.FC = () => {
  const { currentWeather, loading } = useWeatherStore();
  if (loading) return <div className="flex justify-center mt-8"><Spin tip="Loading weather..." /></div>;
  if (!currentWeather) return null;
  const recs = recommendOutfit({ tempC: currentWeather.tempC, condition: currentWeather.condition });
  return (
    <Card className="mt-6 max-w-3xl mx-auto">
      <Title level={4}>{currentWeather.city}</Title>
      <div className="text-2xl">{currentWeather.tempC}°C — {currentWeather.condition} ({currentWeather.conditionDesc})</div>
      <div>Wind: {currentWeather.wind} m/s | Humidity: {currentWeather.humidity}%</div>
      <Card size="small" title="Outfit Recommendation" className="mt-4">
        {recs.length ? <List dataSource={recs} renderItem={(r) => <List.Item>{r}</List.Item>} /> : <Text type="secondary">No special recommendations.</Text>}
      </Card>
    </Card>
  );
};
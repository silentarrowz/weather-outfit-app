import React, { useState, useEffect, useRef } from "react";
import { Input, Button, message, Card, List } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useWeatherStore } from "../stores/useWeatherStore";
import type { WeatherData } from "../types";
import { useDebounce } from "../hooks/useDebounce";

const key = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
const geoUrl = import.meta.env.VITE_GEO_API_URL;

const SearchBox: React.FC = () => {
  const { setCurrentWeather, setLoading, addToHistory } = useWeatherStore();
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 400);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  console.log("suggestions : ", suggestions);
  useEffect(() => {
    async function fetchSuggestions(q: string) {
      if (!q || q.trim().length < 2 || !key) return setSuggestions([]);
      if (abortRef.current) {
        abortRef.current.abort();
      }
      abortRef.current = new AbortController();
      try {
        const res = await fetch(
          `${geoUrl}?q=${encodeURIComponent(q)}&limit=5&appid=${key}`,
          { signal: abortRef.current.signal }
        );

        if (!res.ok) return setSuggestions([]);
        const data = await res.json();
        setSuggestions(
          data.map(
            (d: any) =>
              `${d.name}${d.state ? ", " + d.state : ""}${
                d.country ? ", " + d.country : ""
              }`
          )
        );
      } catch {
        setSuggestions([]);
      }
    }
    fetchSuggestions(debouncedInput);
  }, [debouncedInput]);

  const fetchWeather = async (city: string) => {
    console.log("input : ", city);

    try {
      if (!key) throw new Error("NO_API_KEY");
      const res = await fetch(
        `${apiUrl}?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
      );
      if (!res.ok) {
        if (res.status === 404) throw new Error("CITY_NOT_FOUND");
        throw new Error("API_ERROR");
      }
      const json = await res.json();
      const weather: WeatherData = {
        city: `${json.name}${json.sys?.country ? ", " + json.sys.country : ""}`,
        tempC: Math.round(json.main.temp),
        condition: json.weather?.[0]?.main || "N/A",
        conditionDesc: json.weather?.[0]?.description || "",
        wind: json.wind?.speed ?? null,
        humidity: json.main?.humidity ?? null,
        raw: json,
        fetchedAt: Date.now(),
      };
      setCurrentWeather(weather);
      addToHistory(weather.city);
    } catch (err: any) {
      if (err.message === "NO_API_KEY") {
        const mock: WeatherData = {
          city,
          tempC: 22,
          condition: "Clear",
          conditionDesc: "clear sky",
          wind: 3.4,
          humidity: 45,
          raw: null,
          fetchedAt: Date.now(),
        };
        setCurrentWeather(mock);
        addToHistory(mock.city);
        message.warning("No API key found. Showing mocked data.");
      } else if (err.message === "CITY_NOT_FOUND") {
        message.error("City not found. Please try another name.");
      } else {
        message.error("Failed to fetch weather. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a city"
        prefix={<EnvironmentOutlined />}
        onPressEnter={() => fetchWeather(input)}
        allowClear
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={() => fetchWeather(input)}
      >
        Search
      </Button>
      {suggestions.length > 0 && (
        <Card size="small" className="mt-2">
          <List
            size="small"
            dataSource={suggestions}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setInput(item);
                  setSuggestions([]);
                  fetchWeather(item);
                }}
              >
                {item}
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default SearchBox;

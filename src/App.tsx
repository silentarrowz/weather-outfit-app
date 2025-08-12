import { useState } from "react";
import { Input, Button, Card } from "antd";
import type { WeatherData } from "./types";
import "./App.css";
import { WeatherCard } from "./components/WeatherCard";
import SearchBox from "./components/SearchBox";
import { HistoryList } from "./components/HistoryList";

function App() {
  const [input, setInput] = useState("");

  return (
    <div className={"min-h-screen py-8 px-4 "}>
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <div>Weather Outfit Recommender</div>
            <div>
              Type a city to get the current weather and outfit suggestions
            </div>
          </div>
        </header>

        <main>
          <div className="flex gap-2 items-center"></div>
          <SearchBox />
          <WeatherCard />
          <HistoryList />
        </main>
      </div>
    </div>
  );
}

export default App;

export interface WeatherData {
  city: string;
  tempC: number;
  condition: string;
  conditionDesc: string;
  wind: number | null;
  humidity: number | null;
  raw: any;
  fetchedAt: number;
}

export interface WeatherState {
  history: string[];
  currentWeather: WeatherData | null;
  loading: boolean;
  addToHistory: (city: string) => void;
  setCurrentWeather: (data: WeatherData | null) => void;
  setLoading: (v: boolean) => void;
}

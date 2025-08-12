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
  currentWeather: WeatherData | null;
  loading: boolean;
  setCurrentWeather: (data: WeatherData | null) => void;
  setLoading: (v: boolean) => void;
}
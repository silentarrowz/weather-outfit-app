import { create } from 'zustand';
import type { WeatherState } from '../types';


export const useWeatherStore = create<WeatherState>((set) => ({  
 history: [],
  currentWeather: null,
  loading: false,
  addToHistory: (city) =>
    set((state) => ({
      history: [city, ...state.history.filter((c) => c.toLowerCase() !== city.toLowerCase())].slice(0, 5),
    })),
  setCurrentWeather: (data) => set({ currentWeather: data }),
  setLoading: (v) => set({ loading: v }),
}));
import { create } from 'zustand';
import type { WeatherState } from '../types';


export const useWeatherStore = create<WeatherState>((set) => ({  
  currentWeather: null,
  loading: false,  
  setCurrentWeather: (data) => set({ currentWeather: data }),
  setLoading: (v) => set({ loading: v }),
}));
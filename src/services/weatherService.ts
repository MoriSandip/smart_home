import { WeatherData } from '../types';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
const CITY = 'New York'; // Default city

export const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    return {
      temperature: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
      unit: 'C',
    };

  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return default data on error
    return {
      temperature: 20,
      condition: 'Unknown',
      icon: '01d',
      unit: 'C',
    };
  }
}; 
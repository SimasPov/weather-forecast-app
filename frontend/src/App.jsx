import React, { useState, useEffect } from 'react';
import {
  Grid,
  Column,
  Loading,
  Content,
  Header,
  HeaderName,
} from '@carbon/react';
import './App.scss';
import WeatherForecast from "./components/WeatherForecast";
import CurrentWeather from "./components/CurrentWeather";
import PopularCities from "./components/PopularCities";
import SearchComponent from "./components/SearchComponent";

const WeatherApp = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popularCities, setPopularCities] = useState([]);
  const [cities] = useState([
    { id: '1', name: 'New York', lat: 40.71, lon: -74.01 },
    { id: '2', name: 'London', lat: 51.51, lon: -0.13 },
    { id: '3', name: 'Tokyo', lat: 35.69, lon: 139.69 },
    { id: '4', name: 'Paris', lat: 48.85, lon: 2.35 },
    { id: '5', name: 'Sydney', lat: -33.87, lon: 151.21 },
    { id: '6', name: 'Berlin', lat: 52.52, lon: 13.41 },
    { id: '7', name: 'Moscow', lat: 55.75, lon: 37.62 },
    { id: '8', name: 'Beijing', lat: 39.91, lon: 116.40 },
    { id: '9', name: 'Rome', lat: 41.89, lon: 12.48 },
    { id: '10', name: 'Dubai', lat: 25.20, lon: 55.27 }
  ]);

  // Load popular cities from localStorage on component mount
  useEffect(() => {
    const storedCities = localStorage.getItem('popularCities');
    if (storedCities) {
      setPopularCities(JSON.parse(storedCities));
    }
  }, []);

  const fetchWeatherData = async (city) => {
    if (!city) return;

    setLoading(true);
    try {
      // Fetch current weather
      const currentResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );
      const currentData = await currentResponse.json();

      // Fetch forecast for next 5 days
      const forecastResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&forecast_days=5`
      );
      const forecastData = await forecastResponse.json();

      setCurrentWeather(currentData);
      setForecast(forecastData);

      // Log user action to backend
      await fetch('http://localhost:3001/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cityName: city.name,
          timestamp: new Date()
        }),
      });

      updatePopularCities(city);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePopularCities = (city) => {
    const existingIndex = popularCities.findIndex(c => c.id === city.id);
    let updatedCities;

    if (existingIndex >= 0) {
      // Update existing city view count
      updatedCities = [...popularCities];
      updatedCities[existingIndex] = {
        ...updatedCities[existingIndex],
        viewCount: (updatedCities[existingIndex].viewCount || 0) + 1
      };
    } else {
      // Add new city with view count of 1
      updatedCities = [...popularCities, { ...city, viewCount: 1 }];
    }

    setPopularCities(updatedCities);

    // Sort by view count and take top 3
    updatedCities.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    updatedCities = updatedCities.slice(0, 3);

    localStorage.setItem('popularCities', JSON.stringify(updatedCities));
  };

  const handleCitySelection = (selectedItem) => {
    if(selectedItem.selectedItem !== null && selectedItem.selectedItem !== undefined && selectedItem.selectedItem !== '' && selectedItem.selectedItem !== selectedCity?.name) {
      const city = cities.find(c => c.id === selectedItem.selectedItem.id);
      setSelectedCity(city);
      fetchWeatherData(city).then();
    }
  };

  const handlePopularCityClick = (city) => {
    if(city.name !== selectedCity?.name) {
      setSelectedCity(city);
      fetchWeatherData(city).then();
    }
  };

  return (
      <div className="weather-app">
        <Header aria-label="Weather Forecast App">
          <HeaderName prefix="">Weather Forecast App</HeaderName>
        </Header>

        <Content>
          <Grid>
            <Column lg={{span: 8, offset: 4}} md={{span: 6, offset: 1}} sm={4}>
              <h2 className="heading">Weather Forecast</h2>

              <SearchComponent cities={cities} selectedCity={selectedCity} onCitySelection={handleCitySelection} />

              {popularCities.length > 0 && (
                  <PopularCities popularCities={popularCities.slice(0, 3)} onPopularCityClick={handlePopularCityClick}/>
              )}

              {loading && <Loading description="Loading weather data" />}

              {selectedCity && currentWeather && !loading && (
                  <div className="weather-content">
                    <CurrentWeather selectedCity={selectedCity} currentWeather={currentWeather}/>
                    {forecast && (
                        <WeatherForecast forecast={forecast} />
                    )}
                  </div>
              )}
            </Column>
          </Grid>
        </Content>
      </div>
  );
};

export default WeatherApp;
import {getWeatherIcon} from "../utils/helpers";
import {Humidity, Windy} from "@carbon/icons-react";
import {Tile} from "@carbon/react";
import React from "react";

export default function CurrentWeather({selectedCity, currentWeather}) {
    return (
        <Tile className="current-weather">
            <h3>{selectedCity.name} - Current Weather</h3>
            <div className="weather-info">
                <div className="weather-icon-temperature">
                    {getWeatherIcon(currentWeather.current.weather_code)}
                    <p className="temperature">{currentWeather.current.temperature_2m}{currentWeather.current_units.temperature_2m}</p>
                </div>
                <div className="weather-metrics">
                    <p>
                        <Humidity size={16} />
                        Humidity: {currentWeather.current.relative_humidity_2m}%
                    </p>
                    <p>
                        <Windy size={16} />
                        Wind: {currentWeather.current.wind_speed_10m} {currentWeather.current_units.wind_speed_10m}
                    </p>
                </div>
            </div>
        </Tile>
    );
}
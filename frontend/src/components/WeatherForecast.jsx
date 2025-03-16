import {Tile} from "@carbon/react";
import {formatDate, getWeatherIcon} from "../utils/helpers";
import {Windy} from "@carbon/icons-react";
import React from "react";

export default function WeatherForecast({forecast}) {
    return (
        <div className="forecast">
            <h3>5-Day Forecast</h3>
            <div className="forecast-grid">
                {forecast.daily.time.map((date, index) => (
                    <Tile key={date} className="forecast-tile">
                        <p className="forecast-date">{formatDate(date)}</p>
                        <div className="forecast-icon">
                            {getWeatherIcon(forecast.daily.weather_code[index])}
                        </div>
                        <p className="forecast-temp">
                            <span className="max-temp">{forecast.daily.temperature_2m_max[index]}°</span> /
                            <span className="min-temp">{forecast.daily.temperature_2m_min[index]}°</span>
                        </p>
                        <p className="forecast-wind">
                            <Windy size={16} />
                            {forecast.daily.wind_speed_10m_max[index]} {forecast.daily_units.wind_speed_10m_max}
                        </p>
                    </Tile>
                ))}
            </div>
        </div>
    );
}
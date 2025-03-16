# Weather Forecast Application Documentation
## Introduction

---

The Weather Forecast Application is a responsive web application that provides users with current weather conditions and 5-day forecasts for various cities around the world. It features a user-friendly interface built with React and the Carbon Design System, along with a Node.js with express backend for logging user activities to the console and storing them in the database.

The application leverages the open-meteo.com RESTful API to retrieve accurate weather data without requiring an API key. It offers a seamless experience across different devices and screen sizes while maintaining a record of user preferences through local storage.

### System Architecture

---

The application follows a client-server architecture with two main components:

- **Frontend**: A React application built with Carbon Design System components
- **Backend**: A Node.js server with express that logs user actions in the console and stores them in the database 

The frontend communicates with both the open-meteo.com API for weather data and the application's backend for logging and storing user actions.


## Frontend 
### Components

---

The frontend is built using React with the Carbon Design System components. The components are:

1) CurrentWeather
2) PopularCities
3) SearchComponent
4) WeatherForecast

### Frontend Features

---

1) Responsive Layout
   - Adapts to different screen sizes using Carbon Design System Grid components
   - Optimized for mobile, tablet, and desktop views

2) City Selection
   - Searchable dropdown to find cities

3) Popular Cities Tracking
   - Stores the 3 most frequently viewed cities in browser localStorage
   - Displays these cities as clickable tags for quick access

4) Current Weather Display
   - Shows temperature, humidity, and wind speed
   - Displays weather icon based on conditions

5) 5-Day Forecast
   - Shows daily high/low temperatures
   - Displays wind speed and weather condition icons for each day

### Data Management

---

The application manages several types of data:

1) **City Data**: A predefined list of cities with their coordinates
2) **Weather Data**: Current conditions and 5-day forecasts fetched from the API
3) **User Preferences**: Popular cities stored in localStorage

### API Integration

---

The frontend integrates with the open-meteo.com API to fetch weather data:

1) Current Weather Endpoint: 
```
https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code
```
2) Forecast Endpoint: 
```
https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&forecast_days=5
```

## Backend

### Server Setup

---

The backend is built using Node.js with express. It provides a simple API for logging user actions and storing them in the database.

Key dependencies:

- **express**: Web server framework
- **cors**: For handling Cross-Origin Resource Sharing
- **body-parser**: For parsing JSON request bodies
- **mysql2**: For storing the logged data in the database

### API Endpoints

---

The backend exposes the following endpoint:

* **POST /log**
   - Purpose: Log user actions in the console and store them in the database
   - Request body: 
        ```json
        {
          "city": "City Name",
          "timestamp": "Timestamp"
        }
        ```
   - Response: 200 OK with success message

### Logging and Storing System

---

The backend implements a simple logging to console and storing in database system that:

1. Records user actions with timestamps
2. Displays formatted logs in the console
3. Stores it in the database

Example console output:
```
[3/16/2025, 7:34:45 PM] City: New York
```

## Installation guide

### Prerequisites

---

- Node.js (v20 or higher)
- npm or yarn package manager

### Installation

---

1) Clone the project from git: 
   ```
    git clone https://github.com/SimasPov/weather-forecast-app.git
   ```
2) Navigate into backend directory and run:
    ```bash
    npm i
    ```
3) Then run:
    ```bash
    node server.js
    ```
4) Open a new terminal, navigate into frontend directory and run:
    ```bash
    npm i
    ```
5) Then run:
    ```bash
    npm start
    ```
## Usage Guide

### Basic Usage

---

1. Open the application in a web browser (http://localhost:3000)
2. Use the search box to find a city or select one from the dropdown
3. View the current weather conditions and 5-day forecast for the selected city
4. Click on any popular city tag to quickly view its weather data

### Features

---

- **City Search**: Type in the search box to find the city you want
- **Popular Cities**: Click on a city tag to quickly view its weather
- **Current Weather**: View temperature, humidity, and wind speed
- **5-Day Forecast**: Scroll through the forecast cards to see weather predictions

## Technical Specifications

### Frontend

---

- **Framework**: React 19
- **UI Library**: Carbon Design System (@carbon/react)
- **Icons**: Carbon Icons (@carbon/icons-react)
- **Styling**: SASS/SCSS
- **State Management**: React useState and useEffect hooks
- **API Communication**: Fetch API
- **Local Storage**: Browser localStorage API

### Backend

---

- **Runtime**: Node.js
- **Web Framework**: Express
- **Middleware**: cors, body-parser
- **Storing in database**: mysql2
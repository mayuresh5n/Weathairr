# WeathAir Application

## Overview
This project is a simple React application designed to fetch and display current weather data using the OpenWeatherMap API. Users can input a city and country to get information such as temperature, humidity, and weather conditions.

## Features
- Fetches real-time weather data from the OpenWeatherMap API.
- Requires city and country names as input.
- Displays temperature (in Celsius), humidity percentage, and a textual description of weather conditions.
- Provides user-friendly error messages for invalid inputs or API-related issues.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
    (Replace `<your-repository-url>` with the actual URL of this repository)

2.  **Navigate to the project directory:**
    ```bash
    cd weather-app/weathair
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **API Key Setup:**
    *   This application uses the OpenWeatherMap API. You will need to obtain a free API key. You can sign up and get one from [https://openweathermap.org/appid](https://openweathermap.org/appid).
    *   Once you have your API key, create a file named `.env` in the root of the `weather-app/weathair` directory (i.e., `weather-app/weathair/.env`).
    *   Add your API key to this `.env` file in the following format:
        ```env
        REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
        ```
    *   Replace `your_actual_api_key_here` with the API key you obtained. The application is configured to use this environment variable to authenticate with the OpenWeatherMap API.

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Technologies Used
- React
- OpenWeatherMap API
- HTML5 & CSS3
- JavaScript (ES6+)

## Error Handling
The application includes error handling for common scenarios such as:
- Invalid city or country input.
- API errors (e.g., city not found, invalid API key).
- Network connectivity issues.

## Accessibility
Basic accessibility considerations have been included:
- ARIA labels for form inputs to improve screen reader compatibility.
- Visible focus indicators for interactive elements to aid keyboard navigation.

## Learn More (from Create React App)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React, check out the [React documentation](https://reactjs.org/).

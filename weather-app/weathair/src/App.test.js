import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like .toBeInTheDocument()
import App from './App';

// Mock child components to focus tests on App.js logic
jest.mock('./components/Titles', () => () => <div data-testid="titles">Titles Component</div>);
jest.mock('./components/Form', () => ({ getWeather }) => (
  <form onSubmit={getWeather} data-testid="form">
    <input name="city" placeholder="City" />
    <input name="country" placeholder="Country" />
    <button type="submit">Display weather</button>
  </form>
));
jest.mock('./components/Weather', () => (props) => (
  <div data-testid="weather">
    {props.city && <p>City: {props.city}</p>}
    {props.error && <p>Error: {props.error}</p>}
  </div>
));

describe('App Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  test('renders Titles, Form, and Weather components', () => {
    render(<App />);
    expect(screen.getByTestId('titles')).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByTestId('weather')).toBeInTheDocument();
  });

  test('getWeather updates state correctly on successful API response', async () => {
    const mockWeatherData = {
      cod: "200",
      name: 'London',
      sys: { country: 'UK' },
      main: { temp: 20, humidity: 80 },
      weather: [{ description: 'cloudy' }],
    };
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockWeatherData),
    });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/City/i), { target: { value: 'London' } });
    fireEvent.change(screen.getByPlaceholderText(/Country/i), { target: { value: 'UK' } });
    fireEvent.click(screen.getByRole('button', { name: /Display weather/i }));

    await waitFor(() => {
      expect(screen.getByText('City: London')).toBeInTheDocument();
    });
  });

  test('getWeather updates state correctly when API returns an error', async () => {
    const mockErrorData = {
      cod: "404",
      message: 'city not found',
    };
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockErrorData),
    });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/City/i), { target: { value: 'UnknownCity' } });
    fireEvent.change(screen.getByPlaceholderText(/Country/i), { target: { value: 'UK' } });
    fireEvent.click(screen.getByRole('button', { name: /Display weather/i }));

    await waitFor(() => {
      expect(screen.getByText('Error: city not found')).toBeInTheDocument();
    });
  });

  test('getWeather updates state correctly when fetch call fails (network error)', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/City/i), { target: { value: 'London' } });
    fireEvent.change(screen.getByPlaceholderText(/Country/i), { target: { value: 'UK' } });
    fireEvent.click(screen.getByRole('button', { name: /Display weather/i }));

    await waitFor(() => {
      expect(screen.getByText('Error: Network error. Please try again.')).toBeInTheDocument();
    });
  });

  test('getWeather updates state correctly when no city or country is entered', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Display weather/i }));

    // No need to wait for fetch since it shouldn't be called.
    // The error is set synchronously.
    expect(screen.getByText('Error: Please enter name of City & Country')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, queryByText } from '@testing-library/react';
import Weather from './Weather';

describe('Weather Component', () => {
  test('renders correctly when all props are provided', () => {
    const props = {
      temprature: '25',
      city: 'London',
      country: 'UK',
      humidity: '60',
      description: 'Cloudy',
      error: ''
    };
    render(<Weather {...props} />);

    expect(screen.getByText(/Location:/i)).toBeInTheDocument();
    expect(screen.getByText(/London, UK/i)).toBeInTheDocument();
    expect(screen.getByText(/Temprature:/i)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
    expect(screen.getByText(/60/i)).toBeInTheDocument();
    expect(screen.getByText(/Conditions:/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloudy/i)).toBeInTheDocument();
    expect(screen.queryByText(/weather__error/i)).not.toBeInTheDocument();
  });

  test('renders correctly when only an error prop is provided', () => {
    const props = {
      error: 'City not found.'
    };
    render(<Weather {...props} />);

    expect(screen.getByText(/City not found./i)).toBeInTheDocument();
    // Check that other elements are not rendered
    expect(screen.queryByText(/Location:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Temprature:/i)).not.toBeInTheDocument();
  });

  test('renders nothing (or an empty div) when no props are provided', () => {
    const { container } = render(<Weather />);
    // The component renders a div with className weather__info
    // So, we check if that div has any children elements or significant text content.
    const weatherInfoDiv = container.querySelector('.weather__info');
    expect(weatherInfoDiv).toBeInTheDocument();
    expect(weatherInfoDiv.childElementCount).toBe(0);
  });

  test('renders nothing (or an empty div) when only city/country without other weather data', () => {
    const props = {
      city: 'Paris',
      country: 'France'
    };
    const { container } = render(<Weather {...props} />);
    const weatherInfoDiv = container.querySelector('.weather__info');
    expect(weatherInfoDiv).toBeInTheDocument();
    // It will render location, but not other weather data or error
    expect(screen.getByText(/Location:/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris, France/i)).toBeInTheDocument();
    expect(screen.queryByText(/Temprature:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Humidity:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Conditions:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/weather__error/i)).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from './Form';

describe('Form Component', () => {
  test('renders input fields and the button', () => {
    const mockGetWeather = jest.fn();
    render(<Form getWeather={mockGetWeather} />);

    // Check for the city input field
    expect(screen.getByPlaceholderText(/City/i)).toBeInTheDocument();

    // Check for the country input field
    expect(screen.getByPlaceholderText(/Country/i)).toBeInTheDocument();

    // Check for the button
    expect(screen.getByRole('button', { name: /Display weather/i })).toBeInTheDocument();
  });
});

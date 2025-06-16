import React from 'react';
import { render, screen } from '@testing-library/react';
import Titles from './Titles';

describe('Titles Component', () => {
  test('renders the title and subtitle text correctly', () => {
    render(<Titles />);

    // Check for the title
    expect(screen.getByText(/WeathAir for you/i)).toBeInTheDocument();

    // Check for the subtitle
    expect(screen.getByText(/Find weathAir of your city/i)).toBeInTheDocument();
  });
});

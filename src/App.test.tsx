

// At the top of your test file (before imports or inside jest setup)
jest.mock('@mui/material', () => {
  // Import the actual module to keep other exports intact
  const actualMui = jest.requireActual('@mui/material');
  return {
    ...actualMui,
    useMediaQuery: jest.fn(() => true), // mock to always return true or false as needed
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome to getfit/i);
  expect(welcomeElement).toBeInTheDocument();
});


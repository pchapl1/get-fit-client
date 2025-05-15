import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(<Home />);
    // Adjust the text to match your Home page content
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  // Add more tests as your page develops (e.g., buttons, API calls)
});

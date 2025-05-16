import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound component', () => {
  it('renders 404 and Page not found text', () => {
    render(<NotFound />);
    
    // Check if "404" heading is rendered
    const heading404 = screen.getByRole('heading', { name: /404/i });
    expect(heading404).toBeInTheDocument();
    
    // Check if "Page not found" subheading is rendered
    const subheading = screen.getByText(/Page not found/i);
    expect(subheading).toBeInTheDocument();
  });
});

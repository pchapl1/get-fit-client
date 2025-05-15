import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound Page', () => {
  it('renders 404 message', () => {
    render(<NotFound />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('has a link to return home', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});

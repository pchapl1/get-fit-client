import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Sidebar', () => {
  it('renders navigation links', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/workouts/i)).toBeInTheDocument();
  });

  it('links have correct href attributes', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText(/home/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/workouts/i).closest('a')).toHaveAttribute('href', '/workouts');
  });
});

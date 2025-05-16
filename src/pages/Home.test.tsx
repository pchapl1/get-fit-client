// import { render, screen } from '@testing-library/react';
// import Home from './Home';

// describe('Home Page', () => {
//   it('renders welcome message', () => {
//     render(<Home />);
//     // Adjust the text to match your Home page content
//     expect(screen.getByText(/welcome/i)).toBeInTheDocument();
//   });

//   // Add more tests as your page develops (e.g., buttons, API calls)
// });


import { render, screen } from '@testing-library/react';
import Home from './Home';

const dummyWorkouts = [
  { id: 1, name: 'Leg Day', date: '2025-05-16T10:00:00Z', duration: 45 },
];

const mockCreate = jest.fn();

describe('Home Page', () => {
  it('renders recent workouts list', () => {
    render(<Home recentWorkouts={dummyWorkouts} onCreateNewWorkout={mockCreate} />);
    expect(screen.getByText(/leg day/i)).toBeInTheDocument();
  });

  it('calls create handler on FAB click', () => {
    render(<Home recentWorkouts={[]} onCreateNewWorkout={mockCreate} />);
    const fab = screen.getByLabelText(/create new workout/i);
    fab.click();
    expect(mockCreate).toHaveBeenCalled();
  });
});

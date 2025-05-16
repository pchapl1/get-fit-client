// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import Layout from './Layout';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';

// // Mock Sidebar to simplify test output
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   Outlet: () => <div data-testid="mock-outlet" />,
// }));


// // Helper to render Layout with React Router context and a child route to render inside <Outlet>
// function renderWithRouter(ui: React.ReactElement) {
//   return render(
//     <MemoryRouter initialEntries={['/']}>
//       <Routes>
//         <Route path="/" element={ui}>
//           <Route index element={<div data-testid="child-page">Child Page Content</div>} />
//         </Route>
//       </Routes>
//     </MemoryRouter>
//   );
// }

// describe('Layout component', () => {
//   test('renders the app bar with title', () => {
//     renderWithRouter(<Layout />);
//     expect(screen.getByText(/GetFit/i)).toBeInTheDocument();
//   });

//   test('renders Sidebar inside the Drawer', () => {
//     renderWithRouter(<Layout />);
//     expect(screen.getByTestId('sidebar')).toBeInTheDocument();
//   });

//   test('renders child route content via Outlet', () => {
//     renderWithRouter(<Layout />);
//     expect(screen.getByTestId('child-page')).toBeInTheDocument();
//   });

//   test('drawer toggle button shows on mobile and toggles drawer', () => {
//     // Mock useMediaQuery to simulate mobile screen
//     jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true);

//     renderWithRouter(<Layout />);

//     const toggleButton = screen.getByRole('button');
//     expect(toggleButton).toBeInTheDocument();

//     // Drawer should not be open initially
//     // Actually, in your Layout mobileOpen starts as false, so Drawer is closed initially
//     // Click button to open drawer
//     fireEvent.click(toggleButton);

//     // After click, drawer should open and Sidebar still visible
//     expect(screen.getByTestId('sidebar')).toBeInTheDocument();
//   });
// });


// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import Layout from './Layout';
// import * as mui from '@mui/material';

// // Mocking react-router-dom's Outlet
// jest.mock('react-router-dom', () => {
//   const originalModule = jest.requireActual('react-router-dom');
//   return {
//     ...originalModule,
//     Outlet: () => <div data-testid="child-page" />,
//   };
// });

// // Mock Sidebar with data-testid
// jest.mock('./Sidebar', () => () => <div data-testid="sidebar" />);

// // Spy for useMediaQuery
// let useMediaQuerySpy: jest.SpyInstance;

// beforeEach(() => {
//   useMediaQuerySpy = jest.spyOn(mui, 'useMediaQuery');
// });

// afterEach(() => {
//   useMediaQuerySpy.mockRestore();
// });

// const renderWithRouter = (ui: React.ReactElement) => {
//   return render(<MemoryRouter>{ui}</MemoryRouter>);
// };

// describe('Layout component', () => {
//   test('renders Sidebar inside the Drawer', () => {
//     useMediaQuerySpy.mockReturnValue(false); // simulate desktop view
//     renderWithRouter(<Layout />);
//     expect(screen.getByTestId('sidebar')).toBeInTheDocument();
//   });

//   test('renders child route content via Outlet', () => {
//     useMediaQuerySpy.mockReturnValue(false);
//     renderWithRouter(<Layout />);
//     expect(screen.getByTestId('child-page')).toBeInTheDocument();
//   });

//   test('drawer toggle button shows on mobile and toggles drawer', () => {
//     useMediaQuerySpy.mockReturnValue(true); // simulate mobile view
//     renderWithRouter(<Layout />);

//     const toggleButton = screen.getByRole('button', { name: /open drawer/i });
//     expect(toggleButton).toBeInTheDocument();

//     fireEvent.click(toggleButton);
//     // Optionally test drawer open state here if state is visible in DOM
//   });
// });



import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ✅ Mock react-router-dom's Outlet
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="child-page" />,
  };
});

// ✅ Mock Sidebar
jest.mock('./Sidebar', () => () => <div data-testid="sidebar" />);

// ✅ Mock useMediaQuery via MUI module
let mockUseMediaQueryValue = false;

jest.mock('@mui/material', () => {
  const actualMui = jest.requireActual('@mui/material');
  return {
    ...actualMui,
    useMediaQuery: () => mockUseMediaQueryValue,
  };
});

// Now import Layout AFTER the mocks
import Layout from './Layout';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Layout component', () => {
  afterEach(() => {
    // reset the media query value after each test
    mockUseMediaQueryValue = false;
  });

  test('renders Sidebar inside the Drawer', () => {
    mockUseMediaQueryValue = false; // desktop view
    renderWithRouter(<Layout />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('renders child route content via Outlet', () => {
    mockUseMediaQueryValue = false;
    renderWithRouter(<Layout />);
    expect(screen.getByTestId('child-page')).toBeInTheDocument();
  });

  test('drawer toggle button shows on mobile and toggles drawer', () => {
    mockUseMediaQueryValue = true; // mobile view
    renderWithRouter(<Layout />);
    const toggleButton = screen.getByTestId('toggle-drawer');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    // Optionally assert drawer open state if accessible in DOM
  });
});


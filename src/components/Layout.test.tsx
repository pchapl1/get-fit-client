import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders children content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Sidebar component', () => {
    render(
      <Layout>
        <div />
      </Layout>
    );
    // Sidebar has nav links like "Home", so check one of them
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});

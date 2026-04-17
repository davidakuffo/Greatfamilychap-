import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../Navbar';

// Helper to mock window.location
const setPathname = (path) => {
  vi.stubGlobal('location', {
    ...window.location,
    pathname: path,
  });
};

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Donate')).toBeDefined();
  });

  it('uses relative anchors when on the home page', () => {
    setPathname('/');
    render(<Navbar />);
    const homeLink = screen.getByText('Home');
    expect(homeLink.getAttribute('href')).toBe('#hero');
  });

  it('uses absolute paths when on a sub-page (fixing Privacy Policy nav bug)', () => {
    setPathname('/privacy-policy');
    render(<Navbar />);
    const homeLink = screen.getByText('Home');
    expect(homeLink.getAttribute('href')).toBe('/#hero');
  });

  it('opens and closes the mobile sidebar', () => {
    render(<Navbar />);
    
    const openButton = screen.getByLabelText('Open menu');
    fireEvent.click(openButton);
    
    const closeButton = screen.getByLabelText('Close menu');
    expect(closeButton).toBeDefined();
    
    fireEvent.click(closeButton);
    // Sidebar transition logic is handled by CSS classes
  });
});
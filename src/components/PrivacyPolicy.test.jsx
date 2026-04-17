import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrivacyPolicy from '../PrivacyPolicy';

describe('PrivacyPolicy Component', () => {
  it('renders the title and content correctly', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText('Privacy Policy')).toBeDefined();
    expect(screen.getByText(/Information We Collect/i)).toBeDefined();
  });

  it('renders a functional mailto link', () => {
    render(<PrivacyPolicy />);
    const emailLink = screen.getByText('info@greatfamilychapel.org');
    expect(emailLink.tagName).toBe('A');
    expect(emailLink.getAttribute('href')).toBe('mailto:info@greatfamilychapel.org');
  });
});
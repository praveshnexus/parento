import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

// Helper to render with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Footer Component', () => {
  it('renders footer with brand name', () => {
    renderWithRouter(<Footer />);
    
    const brandName = screen.getByText('Parento');
    expect(brandName).toBeInTheDocument();
  });

  it('displays current year in copyright', () => {
    renderWithRouter(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('has navigation links', () => {
    renderWithRouter(<Footer />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Track Milestones')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
  });

  it('has contact information', () => {
    renderWithRouter(<Footer />);
    
    expect(screen.getByText('support@parento.com')).toBeInTheDocument();
  });

  it('has newsletter subscription input', () => {
    renderWithRouter(<Footer />);
    
    const emailInput = screen.getByPlaceholderText('Your email');
    expect(emailInput).toBeInTheDocument();
  });

  it('has subscribe button', () => {
    renderWithRouter(<Footer />);
    
    const subscribeButton = screen.getByText('Subscribe');
    expect(subscribeButton).toBeInTheDocument();
  });
});
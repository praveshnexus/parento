import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Login from '../Login';
import { renderWithProviders } from '../../test/utils/renderWithProviders';

describe('Login Page', () => {
  it('renders login form', async () => {
    renderWithProviders(<Login />);

    expect(
      await screen.findByPlaceholderText(/email/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByPlaceholderText(/password/i)
    ).toBeInTheDocument();
  });

  it('shows Google login button', async () => {
    renderWithProviders(<Login />);

    expect(
      await screen.findByText(/google/i)
    ).toBeInTheDocument();
  });
});

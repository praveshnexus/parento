import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Track from '../Track';
import { renderWithProviders } from '../../test/utils/renderWithProviders';

describe('Track Page', () => {
  it('renders Track page', async () => {
    renderWithProviders(<Track />);

    expect(
      await screen.findByText(/track milestones/i)
    ).toBeInTheDocument();
  });

  it('has add milestone button', async () => {
    renderWithProviders(<Track />);

    expect(
      await screen.findByRole('button', { name: /add milestone/i })
    ).toBeInTheDocument();
  });

  it('allows searching milestones', async () => {
    renderWithProviders(<Track />);

    const input = await screen.findByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'walk' } });

    expect(input.value).toBe('walk');
  });
});

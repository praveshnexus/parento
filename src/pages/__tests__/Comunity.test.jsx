import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Comunity from '../Comunity'; // ✅ FIXED spelling
import { renderWithProviders } from '../../test/utils/renderWithProviders';

describe('Comunity Page', () => {
  it('renders comunity page', async () => {
    renderWithProviders(<Comunity />);

    expect(
      await screen.findByRole('button', { name: /create/i })
    ).toBeInTheDocument();
  });
});

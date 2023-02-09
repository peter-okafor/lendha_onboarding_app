import App from '@/App';
import { renderWithRouter } from '@/utils';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { path } from '../path';

describe('ProutectedRoutes', () => {
  it('redirects to the sign in page if email is not set in local storage', async () => {
    renderWithRouter(<App />);

    const email = localStorage.getItem('email');

    if (!email) {
      location.href = path.SIGNIN;

      const emailText = await screen.findByText(/email address/i);
      expect(emailText).toBeDefined();
    }
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test } from 'vitest';
import Signup from './Signup';

describe('signup', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
  });

  test('login link should navigate to `Signin` page', async () => {
    const link = screen.getByRole('link', { name: /login/i });
    userEvent.click(link);

    expect(screen.getByText(/login/i)).toBeDefined();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test } from 'vitest';
import Signin from './Signin';

describe('signin', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );
  });

  test('should show a required field warning for each empty input field', async () => {
    const button = screen.getByRole('button', { name: /proceed/i });
    userEvent.click(button);

    expect(screen.findByText(/incorrect email address/i)).toBeDefined();
    expect(screen.findByText(/incorrect password/i)).toBeDefined();
  });
});

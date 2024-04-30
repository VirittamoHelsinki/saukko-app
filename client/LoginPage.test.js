// LoginPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../src/components/LoginPage';

describe('LoginPage component', () => {
  test('renders login form', () => {
    render(<LoginPage />);
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });
});

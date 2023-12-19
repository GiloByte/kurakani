import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../src/components/Home/Navbar';

test('renders Navbar component without errors', () => {
  render(<Navbar />);
});

test('renders navigation links with correct URLs', () => {
  render(<Navbar />);
  const starLink = screen.getByRole('link', { name: /star on github/i });
  expect(starLink).toHaveAttribute('href', 'https://github.com/diwash007/kurakani');
});
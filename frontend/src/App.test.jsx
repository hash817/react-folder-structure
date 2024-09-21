import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './components/Login';

test('renders learn react link', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

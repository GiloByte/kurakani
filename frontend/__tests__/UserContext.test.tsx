import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProvider, { useUser } from '@/contexts/UserContext';
import '@testing-library/jest-dom';
import 'mock-local-storage';

beforeEach(() => {
  // Vymaž localStorage pred každým testom
  localStorage.clear();
});

test('useUser returns the context with stored username', () => {
    localStorage.setItem('name', 'Marek');

    render(
        <UserProvider>
            <TestComponent />
        </UserProvider>
    );
});

function TestComponent() {
    const userContext = useUser();
    expect(userContext.username).toBe('Marek');

    return <div>Test Component</div>;
}



test('useUser returns the initial context when localStorage is not set', () => {
  render(
    <UserProvider>
      <TestComponent1 />
    </UserProvider>
  );

  // Expect the context to be in the initial state
  expect(screen.getByTestId('username-display')).toHaveTextContent('');
});

function TestComponent1() {
  const userContext = useUser();
  return (
    <div>
      <span data-testid="username-display">{userContext.username}</span>
    </div>
  );
}
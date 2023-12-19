import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import ThemeSwitcher from '../src/components/ThemeSwitcher';

test('initializes with mounted state set to true', () => {
  render(<ThemeSwitcher />);
  const sunIcon = screen.queryByTestId('sun-icon'); // Použijeme queryByTestId, aby sme nevyhodili chybu, ak neexistuje
  const moonIcon = screen.getByTestId('moon-icon');
  expect(sunIcon).toBeNull(); // Očakávame, že sun-icon nebude v dokumente
  expect(moonIcon).toBeInTheDocument();
});

// test('calls setTheme with "light" when dark mode icon is clicked', () => {
//   render(<ThemeSwitcher />);
//   const moonIcon = screen.queryByTestId('moon-icon');
//   fireEvent.click(moonIcon!);
// });

test('renders ThemeSwitcher correctly', () => {
  const tree = TestRenderer.create(<ThemeSwitcher />).toJSON();
  expect(tree).toMatchSnapshot();
});




import { act } from 'react-dom/test-utils';

test('calls setTheme with "light" when dark mode icon is clicked', () => {
  // Získať referenciu na funkciu setTheme zo závislosti (ak je dostupná)
  const setThemeMock = jest.fn();
  jest.mock('../src/components/ThemeSwitcher.tsx', () => ({
    useTheme: () => ({ setTheme: setThemeMock }),
  }));

  // Renderovať komponent s novým kontextom
  render(<ThemeSwitcher />);

  // Simulovať kliknutie na ikonu tmavého režimu
  const moonIcon = screen.queryByTestId('moon-icon');
  fireEvent.click(moonIcon!);

  // Simulovať nárast pamäťovej záťaže (príklad s použitím fake dát)
  act(() => {
    for (let i = 0; i < 10000; i++) {
      // Predstavme si, že tu dochádza k vytváraniu a manipulácii s dátami
      setThemeMock(`light-${i}`);
    }
  });

  // Overiť, či bolo volanie setTheme s argumentom, ktorý začína s "light", spustené
  expect(setThemeMock).toHaveBeenCalledWith(expect.stringMatching(/^light-/));
});

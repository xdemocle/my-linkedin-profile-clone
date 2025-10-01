import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLocale } from '../../hooks/useLocale';
import { render } from '../utils/test-utils';

describe('useLocale hook', () => {
  it('should throw error when used outside LocaleProvider', () => {
    // This test verifies the hook throws when not wrapped in provider
    expect(() => {
      renderHook(() => useLocale());
    }).toThrow('useLocale must be used within a LocaleProvider');
  });

  it('should return locale context when used within provider', () => {
    const TestComponent = () => {
      const { locale, setLocale } = useLocale();
      return (
        <div>
          <span data-testid="locale">{locale}</span>
          <button onClick={() => setLocale('it')}>Switch to Italian</button>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    
    // Should have default locale
    expect(getByTestId('locale')).toHaveTextContent('en');
  });

  it('should provide setLocale function', () => {
    const TestComponent = () => {
      const { setLocale } = useLocale();
      return (
        <button onClick={() => setLocale('fr')}>
          Switch Locale
        </button>
      );
    };

    const { getByRole } = render(<TestComponent />);
    const button = getByRole('button');
    
    // Should not throw when calling setLocale
    expect(() => button.click()).not.toThrow();
  });

  it('should work with different initial locales', () => {
    const TestComponent = () => {
      const { locale } = useLocale();
      return <span data-testid="locale">{locale}</span>;
    };

    // Test with Italian initial locale
    const { getByTestId } = render(<TestComponent />, { 
      initialLocale: 'it' 
    });
    
    expect(getByTestId('locale')).toHaveTextContent('it');
  });
});

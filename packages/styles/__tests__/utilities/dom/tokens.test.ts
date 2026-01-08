/**
 * @jest-environment jsdom
 */

import { createTokens as tokenRef } from '../../../source/utilities/dom/tokens';

describe('dom/tokens utilities', () => {
  describe('applyJSSTokensToDOM', () => {
    beforeEach(() => {
      // Reset the document.documentElement.style before each test
      document.documentElement.style.cssText = '';
    });

    it('should apply tokens as CSS variables to the DOM', () => {
      const tokens = {
        colors: {
          primary: '#ff0000',
          secondary: '#00ff00',
        },
        spacing: {
          sm: '8px',
          md: '16px',
        },
      };

      const instance = tokenRef(tokens);

      expect(
        document.documentElement.style.getPropertyValue('--colors-primary'),
      ).toBe('#ff0000');
      expect(
        document.documentElement.style.getPropertyValue('--colors-secondary'),
      ).toBe('#00ff00');
      expect(
        document.documentElement.style.getPropertyValue('--spacing-sm'),
      ).toBe('8px');
      expect(
        document.documentElement.style.getPropertyValue('--spacing-md'),
      ).toBe('16px');

      const appliedVars = instance.getAppliedVariables();
      expect(appliedVars).toContain('--colors-primary');
      expect(appliedVars).toContain('--colors-secondary');
      expect(appliedVars).toContain('--spacing-sm');
      expect(appliedVars).toContain('--spacing-md');
    });

    it('should add !important when specified', () => {
      const tokens = {
        colors: {
          primary: '#ff0000',
        },
      };

      tokenRef(tokens, { important: true });

      const value =
        document.documentElement.style.getPropertyValue('--colors-primary');
      expect(value.includes('!important')).toBe(true);
    });

    it('should apply tokens to specified target element', () => {
      const tokens = {
        colors: {
          primary: '#ff0000',
        },
      };

      const targetElement = document.createElement('div');
      document.body.appendChild(targetElement);

      tokenRef(tokens, { target: targetElement });

      expect(
        document.documentElement.style.getPropertyValue('--colors-primary'),
      ).toBe('');
      expect(targetElement.style.getPropertyValue('--colors-primary')).toBe(
        '#ff0000',
      );

      document.body.removeChild(targetElement);
    });

    it('should update tokens without removing others', () => {
      const tokens = {
        colors: {
          primary: '#ff0000',
          secondary: '#00ff00',
        },
      };

      const instance = tokenRef(tokens);

      instance.update({
        colors: {
          secondary: '#0000ff',
          tertiary: '#ffff00',
        },
      });

      expect(
        document.documentElement.style.getPropertyValue('--colors-primary'),
      ).toBe('#ff0000');
      expect(
        document.documentElement.style.getPropertyValue('--colors-secondary'),
      ).toBe('#0000ff');
      expect(
        document.documentElement.style.getPropertyValue('--colors-tertiary'),
      ).toBe('#ffff00');
    });

    it('should remove all applied variables', () => {
      const tokens = {
        colors: {
          primary: '#ff0000',
          secondary: '#00ff00',
        },
      };

      const instance = tokenRef(tokens);

      instance.remove();

      expect(
        document.documentElement.style.getPropertyValue('--colors-primary'),
      ).toBe('');
      expect(
        document.documentElement.style.getPropertyValue('--colors-secondary'),
      ).toBe('');
      expect(instance.getAppliedVariables().length).toBe(0);
    });

    it('should format values appropriately', () => {
      const tokens = {
        numbers: {
          integer: 42,
          float: 3.14,
          array: [1, 2, 3],
          nullValue: null,
          undefinedValue: undefined,
        },
      };

      tokenRef(tokens);

      expect(
        document.documentElement.style.getPropertyValue('--numbers-integer'),
      ).toBe('42');
      expect(
        document.documentElement.style.getPropertyValue('--numbers-float'),
      ).toBe('3.14');
      expect(
        document.documentElement.style.getPropertyValue('--numbers-array'),
      ).toBe('1, 2, 3');
      expect(
        document.documentElement.style.getPropertyValue('--numbers-null-value'),
      ).toBe('initial');
      expect(
        document.documentElement.style.getPropertyValue(
          '--numbers-undefined-value',
        ),
      ).toBe('initial');
    });
  });
});

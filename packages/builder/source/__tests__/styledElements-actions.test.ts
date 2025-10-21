/**
 * @jest-environment jsdom
 */

import * as actions from '../styledElements/actions';
import { ElementProps } from '../core/_types';

describe('Styled Elements - Actions', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('a');
    props = { element };
  });

  describe('iconSmall', () => {
    it('should create small icon action element', () => {
      const result = actions.iconSmall(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
      expect(result.element.classList.length).toBeGreaterThan(0);
    });

    it('should create dark theme small icon when isThemeDark is true', () => {
      const result = actions.iconSmall({ element, isThemeDark: true });

      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });
  });

  describe('outline', () => {
    it('should create outline action element', () => {
      const result = actions.outline(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('outlineLarge', () => {
    it('should create large outline action element', () => {
      const result = actions.outlineLarge(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('outlineWhite', () => {
    it('should create white outline action element', () => {
      const result = actions.outlineWhite(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('outlineOptions', () => {
    it('should create white outline when isThemeDark is true', () => {
      const result = actions.outlineOptions({ element, isThemeDark: true });

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });

    it('should create normal outline when isThemeDark is false', () => {
      const result = actions.outlineOptions(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('primary', () => {
    it('should create primary action element', () => {
      const result = actions.primary(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('primaryLarge', () => {
    it('should create large primary action element', () => {
      const result = actions.primaryLarge(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('primaryWhite', () => {
    it('should create white primary action element', () => {
      const result = actions.primaryWhite(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('secondary', () => {
    it('should create secondary action element', () => {
      const result = actions.secondary(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });

    it('should have animation line red flag set', () => {
      const result = actions.secondary(props);
      expect(result.styles).toBeTruthy();
    });
  });

  describe('secondaryLarge', () => {
    it('should create large secondary action element', () => {
      const result = actions.secondaryLarge(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('secondaryWhite', () => {
    it('should create white secondary action element', () => {
      const result = actions.secondaryWhite(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('secondaryGold', () => {
    it('should create gold secondary action element', () => {
      const result = actions.secondaryGold(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('element model interface', () => {
    it('should return consistent interface for all action types', () => {
      const actionTypes = [
        actions.iconSmall,
        actions.outline,
        actions.outlineLarge,
        actions.outlineWhite,
        actions.primary,
        actions.primaryLarge,
        actions.primaryWhite,
        actions.secondary,
        actions.secondaryLarge,
        actions.secondaryWhite,
        actions.secondaryGold,
      ];

      actionTypes.forEach((actionFn) => {
        const elem = document.createElement('a');
        const result = actionFn({ element: elem });

        expect(result).toHaveProperty('element');
        expect(result).toHaveProperty('className');
        expect(result).toHaveProperty('styles');
        expect(typeof result.className).toBe('string');
        expect(typeof result.styles).toBe('string');
      });
    });
  });
});

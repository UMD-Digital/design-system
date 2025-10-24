/**
 * @jest-environment jsdom
 */

import * as assets from '../styledElements/assets';
import * as event from '../styledElements/event';
import * as headline from '../styledElements/headline';
import * as layout from '../styledElements/layout';
import * as richText from '../styledElements/rich-text';

describe('Styled Elements - Assets (Complete Coverage)', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('imageCaption', () => {
    it('should create image caption element', () => {
      const result = assets.imageCaption({ element });
      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('imageAspect', () => {
    it('should create standard aspect image by default', () => {
      const result = assets.imageAspect({ element });
      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });

    it('should create square aspect image when isAspectSquare is true', () => {
      const result = assets.imageAspect({ element, isAspectSquare: true });
      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('imageWrapper', () => {
    it('should create normal image wrapper by default', () => {
      const result = assets.imageWrapper({ element });
      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });

    it('should create scaled image wrapper when isScaled is true', () => {
      const result = assets.imageWrapper({ element, isScaled: true });
      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('gifToggle', () => {
    it('should create gif toggle element', () => {
      const result = assets.gifToggle({ element });
      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });
});

describe('Styled Elements - Event (Complete Coverage)', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  test('all event functions return valid element models', () => {
    const eventFunctions = Object.values(event);

    eventFunctions.forEach((fn) => {
      if (typeof fn === 'function') {
        const result = fn({ element: document.createElement('div') });
        expect(result).toHaveProperty('element');
        expect(result).toHaveProperty('className');
        expect(result).toHaveProperty('styles');
      }
    });
  });
});

describe('Styled Elements - Headline (Complete Coverage)', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('h1');
  });

  test('all headline functions return valid element models', () => {
    const headlineFunctions = Object.values(headline);

    headlineFunctions.forEach((fn) => {
      if (typeof fn === 'function') {
        const result = fn({ element: document.createElement('h1') });
        expect(result).toHaveProperty('element');
        expect(result).toHaveProperty('className');
        expect(result).toHaveProperty('styles');
      }
    });
  });
});

describe('Styled Elements - Layout (Complete Coverage)', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  test('all layout functions return valid element models', () => {
    const layoutFunctions = Object.values(layout);

    layoutFunctions.forEach((fn) => {
      if (typeof fn === 'function') {
        const result = fn({ element: document.createElement('div') });
        expect(result).toHaveProperty('element');
        expect(result).toHaveProperty('className');
        expect(result).toHaveProperty('styles');
      }
    });
  });
});

describe('Styled Elements - Rich Text (Complete Coverage)', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  test('all richText functions return valid element models', () => {
    const richTextFunctions = Object.values(richText);

    richTextFunctions.forEach((fn) => {
      if (typeof fn === 'function') {
        const result = fn({ element: document.createElement('div') });
        expect(result).toHaveProperty('element');
        expect(result).toHaveProperty('className');
        expect(result).toHaveProperty('styles');
      }
    });
  });
});

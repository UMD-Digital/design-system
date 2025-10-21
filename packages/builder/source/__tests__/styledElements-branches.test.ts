/**
 * @jest-environment jsdom
 */

import * as layout from '../styledElements/layout';
import * as richText from '../styledElements/rich-text';
import * as headline from '../styledElements/headline';

describe('Styled Elements - Layout Branch Coverage', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('grid', () => {
    it('should create two column grid with gap by default', () => {
      const result = layout.grid({ element });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create two column grid with gap explicitly', () => {
      const result = layout.grid({ element, isColumnsTwo: true, isGap: true });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create three column grid with gap', () => {
      const result = layout.grid({ element, isColumnsThree: true, isGap: true });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create four column grid with gap', () => {
      const result = layout.grid({ element, isColumnsFour: true, isGap: true });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create two column grid without gap', () => {
      const result = layout.grid({ element, isColumnsTwo: true, isGap: false });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create three column grid without gap', () => {
      const result = layout.grid({ element, isColumnsThree: true, isGap: false });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create four column grid without gap (fallback)', () => {
      const result = layout.grid({ element, isColumnsFour: true, isGap: false });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });
  });

  describe('other layout functions', () => {
    it('should create alignedCenter', () => {
      const result = layout.alignedCenter({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create backgroundBoxWhite', () => {
      const result = layout.backgroundBoxWhite({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create gridInlineRow', () => {
      const result = layout.gridInlineRow({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create gridInlineTabletRows', () => {
      const result = layout.gridInlineTabletRows({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create gridStacked', () => {
      const result = layout.gridStacked({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create spaceHorizontalFull', () => {
      const result = layout.spaceHorizontalFull({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create spaceHorizontalLarger', () => {
      const result = layout.spaceHorizontalLarger({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create spaceHorizontalNormal', () => {
      const result = layout.spaceHorizontalNormal({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create spaceHorizontalSmall', () => {
      const result = layout.spaceHorizontalSmall({ element });
      expect(result.styles).toBeTruthy();
    });

    it('should create spaceHorizontalSmallest', () => {
      const result = layout.spaceHorizontalSmallest({ element });
      expect(result.styles).toBeTruthy();
    });
  });
});

describe('Styled Elements - Rich Text Branch Coverage', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('advanced', () => {
    it('should create advanced rich text in light theme', () => {
      const result = richText.advanced({ element });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create advanced rich text in dark theme', () => {
      const result = richText.advanced({ element, isThemeDark: true });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });
  });

  describe('simple', () => {
    it('should create simple rich text in light theme', () => {
      const result = richText.simple({ element });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create simple rich text in dark theme', () => {
      const result = richText.simple({ element, isThemeDark: true });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });
  });

  describe('simpleLarge', () => {
    it('should create simple large rich text in light theme', () => {
      const result = richText.simpleLarge({ element });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create simple large rich text in dark theme', () => {
      const result = richText.simpleLarge({ element, isThemeDark: true });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });
  });

  describe('simpleLargest', () => {
    it('should create simple largest rich text in light theme', () => {
      const result = richText.simpleLargest({ element });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create simple largest rich text in dark theme', () => {
      const result = richText.simpleLargest({ element, isThemeDark: true });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });
  });

  describe('simpleScaling', () => {
    it('should create simple scaling rich text in light theme', () => {
      const result = richText.simpleScaling({ element });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });

    it('should create simple scaling rich text in dark theme', () => {
      const result = richText.simpleScaling({ element, isThemeDark: true });
      expect(result.element).toBe(element);
      expect(result.styles).toBeTruthy();
    });
  });
});

describe('Styled Elements - Headline Branch Coverage', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('h1');
  });

  test('all headline functions work with theme variations', () => {
    const headlineFunctions = Object.values(headline);

    headlineFunctions.forEach((fn) => {
      if (typeof fn === 'function') {
        const lightResult = fn({ element: document.createElement('h1') });
        expect(lightResult).toHaveProperty('element');
        expect(lightResult).toHaveProperty('styles');

        const darkResult = fn({
          element: document.createElement('h1'),
          isThemeDark: true,
        });
        expect(darkResult).toHaveProperty('element');
        expect(darkResult).toHaveProperty('styles');
      }
    });
  });
});

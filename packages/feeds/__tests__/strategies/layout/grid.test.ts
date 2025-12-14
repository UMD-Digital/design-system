/**
 * Tests for Grid Layout Strategies
 *
 * @group strategies
 */

import {
  gridLayout,
  gridGapLayout,
  stackedLayout,
  gridOffsetLayout,
} from '../../../source/strategies/layout/grid';

describe('Layout Strategies', () => {
  describe('gridLayout', () => {
    it('should create grid element', () => {
      const result = gridLayout.create({ columns: 3 });

      expect(result).toHaveProperty('element');
      expect(result).toHaveProperty('styles');
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should return correct ID', () => {
      expect(gridLayout.getId()).toBe('umd-grid-layout-container');
    });

    it('should handle different column counts', () => {
      const result2 = gridLayout.create({ columns: 2 });
      const result3 = gridLayout.create({ columns: 3 });
      const result4 = gridLayout.create({ columns: 4 });

      expect(result2.element).toBeInstanceOf(HTMLElement);
      expect(result3.element).toBeInstanceOf(HTMLElement);
      expect(result4.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('gridGapLayout', () => {
    it('should create grid gap element', () => {
      const result = gridGapLayout.create({ columns: 3 });

      expect(result).toHaveProperty('element');
      expect(result).toHaveProperty('styles');
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should return correct ID', () => {
      expect(gridGapLayout.getId()).toBe('umd-grid-gap-layout-container');
    });
  });

  describe('stackedLayout', () => {
    it('should create stacked element', () => {
      const result = stackedLayout.create({});

      expect(result).toHaveProperty('element');
      expect(result).toHaveProperty('styles');
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should return correct ID', () => {
      expect(stackedLayout.getId()).toBe('umd-stacked-layout-container');
    });

    it('should handle dark theme', () => {
      const result = stackedLayout.create({ isThemeDark: true });

      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle dividers option', () => {
      const result = stackedLayout.create({ showDividers: false });

      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('gridOffsetLayout', () => {
    it('should create grid offset element', () => {
      const result = gridOffsetLayout.create({ columns: 2 });

      expect(result).toHaveProperty('element');
      expect(result).toHaveProperty('styles');
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should return correct ID', () => {
      expect(gridOffsetLayout.getId()).toBe('umd-grid-offset-layout-container');
    });

    it('should handle layout reversed', () => {
      const result = gridOffsetLayout.create({ isLayoutReversed: true });

      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle sticky position', () => {
      const result = gridOffsetLayout.create({ stickyTopPosition: 100 });

      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });
});

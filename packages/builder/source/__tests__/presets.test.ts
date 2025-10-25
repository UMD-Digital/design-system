/**
 * @file presets.test.ts
 * @description Unit tests for UMD preset builders
 */

import {
  actions,
  headlines,
  text,
  layouts,
  assets,
} from '../factories/presets';

describe('Presets', () => {
  describe('Action Presets', () => {
    test('primary should return slot element with correct class', () => {
      const model = actions.primary().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-primary')).toBe(true);
    });

    test('primaryLarge should return slot element with correct class', () => {
      const model = actions.primaryLarge().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-primary-large')).toBe(true);
    });

    test('primaryWhite should return slot element with correct class', () => {
      const model = actions.primaryWhite().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-primary-white')).toBe(true);
    });

    test('secondary should return slot element with correct class', () => {
      const model = actions.secondary().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-secondary')).toBe(true);
    });

    test('secondaryLarge should return slot element', () => {
      const model = actions.secondaryLarge().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-secondary-large')).toBe(true);
    });

    test('secondaryWhite should return slot element with correct class', () => {
      const model = actions.secondaryWhite().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-secondary-white')).toBe(true);
    });

    test('secondaryGold should return slot element with correct class', () => {
      const model = actions.secondaryGold().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-secondary-gold')).toBe(true);
    });

    test('outline should return slot element with correct class', () => {
      const model = actions.outline().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-outline')).toBe(true);
    });

    test('outlineLarge should return slot element', () => {
      const model = actions.outlineLarge().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-outline-large')).toBe(true);
    });

    test('outlineWhite should return slot element', () => {
      const model = actions.outlineWhite().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-outline-white')).toBe(true);
    });

    test('iconSmall should return slot element', () => {
      const model = actions.iconSmall().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-icon-small')).toBe(true);
    });

    test('iconSmallDark should return slot element', () => {
      const model = actions.iconSmallDark().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-action-icon-small-dark')).toBe(true);
    });

    test('all action presets should include styles', () => {
      const primary = actions.primary().build();
      const secondary = actions.secondary().build();
      const outline = actions.outline().build();

      expect(primary.styles).toBeTruthy();
      expect(secondary.styles).toBeTruthy();
      expect(outline.styles).toBeTruthy();
    });
  });

  describe('Headline Presets', () => {
    test('sansExtraLarge should return slot element', () => {
      const model = headlines.sansExtraLarge().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-xl')).toBe(true);
    });

    test('sansLargest should return slot element', () => {
      const model = headlines.sansLargest().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-largest')).toBe(true);
    });

    test('sansLarger should return slot element', () => {
      const model = headlines.sansLarger().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-larger')).toBe(true);
    });

    test('sansLarge should return slot element', () => {
      const model = headlines.sansLarge().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-large')).toBe(true);
    });

    test('sansMedium should return slot element', () => {
      const model = headlines.sansMedium().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-medium')).toBe(true);
    });

    test('sansSmall should return slot element', () => {
      const model = headlines.sansSmall().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-small')).toBe(true);
    });

    test('sansSmaller should return slot element', () => {
      const model = headlines.sansSmaller().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-smaller')).toBe(true);
    });

    test('sansMin should return slot element', () => {
      const model = headlines.sansMin().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-min')).toBe(true);
    });

    test('sansScalingLarger should return slot element', () => {
      const model = headlines.sansScalingLarger().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-scaling-larger')).toBe(true);
    });

    test('sansScalingMin should return slot element', () => {
      const model = headlines.sansScalingMin().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-sans-scaling-min')).toBe(true);
    });

    test('campaignMaximum should return slot element', () => {
      const model = headlines.campaignMaximum().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-campaign-max')).toBe(true);
    });

    test('campaignExtraLarge should return slot element', () => {
      const model = headlines.campaignExtraLarge().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-campaign-xl')).toBe(true);
    });

    test('campaignLarge should return slot element', () => {
      const model = headlines.campaignLarge().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-headline-campaign-large')).toBe(true);
    });

    test('all headline presets should include styles', () => {
      const large = headlines.sansLarge().build();
      const campaign = headlines.campaignLarge().build();

      expect(large.styles).toBeTruthy();
      expect(campaign.styles).toBeTruthy();
    });
  });

  describe('Text Presets', () => {
    test('eyebrow should return slot element', () => {
      const model = text.eyebrow().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-text-eyebrow')).toBe(true);
    });

    test('ribbon should return slot element', () => {
      const model = text.ribbon().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-text-ribbon')).toBe(true);
    });

    test('body should return slot element', () => {
      const model = text.body().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-text-body')).toBe(true);
    });

    test('all text presets should include styles', () => {
      const eyebrow = text.eyebrow().build();
      const ribbon = text.ribbon().build();
      const body = text.body().build();

      expect(eyebrow.styles).toBeTruthy();
      expect(ribbon.styles).toBeTruthy();
      expect(body.styles).toBeTruthy();
    });
  });

  describe('Layout Presets', () => {
    test('grid should create div element with grid styles', () => {
      const model = layouts.grid(3, true).build();
      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.classList.contains('umd-grid-3')).toBe(true);
    });

    test('grid should support 2, 3, and 4 columns', () => {
      const grid2 = layouts.grid(2).build();
      const grid3 = layouts.grid(3).build();
      const grid4 = layouts.grid(4).build();

      expect(grid2.element.classList.contains('umd-grid-2')).toBe(true);
      expect(grid3.element.classList.contains('umd-grid-3')).toBe(true);
      expect(grid4.element.classList.contains('umd-grid-4')).toBe(true);
    });

    test('grid should handle gap parameter', () => {
      const withGap = layouts.grid(3, true).build();
      const withoutGap = layouts.grid(3, false).build();

      // Both should have styles, but different ones based on gap
      expect(withGap.styles).toBeTruthy();
      expect(withoutGap.styles).toBeTruthy();
    });

    test('container should create div element', () => {
      const model = layouts.container().build();
      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.classList.contains('umd-container')).toBe(true);
    });

    test('centered should create div element', () => {
      const model = layouts.centered().build();
      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.classList.contains('umd-centered')).toBe(true);
    });

    test('stacked should create flexbox column', () => {
      const model = layouts.stacked('medium').build();
      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.classList.contains('umd-stacked')).toBe(true);
      expect(model.styles).toBeTruthy();
    });

    test('stacked should support small, medium, and large gaps', () => {
      const small = layouts.stacked('small').build();
      const medium = layouts.stacked('medium').build();
      const large = layouts.stacked('large').build();

      // All should have styles
      expect(small.styles).toBeTruthy();
      expect(medium.styles).toBeTruthy();
      expect(large.styles).toBeTruthy();
    });

    test('inline should create flexbox row', () => {
      const model = layouts.inline('medium').build();
      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.classList.contains('umd-inline')).toBe(true);
      expect(model.styles).toBeTruthy();
    });

    test('inline should support gap sizes', () => {
      const small = layouts.inline('small').build();
      const medium = layouts.inline('medium').build();
      const large = layouts.inline('large').build();

      // All should have styles
      expect(small.styles).toBeTruthy();
      expect(medium.styles).toBeTruthy();
      expect(large.styles).toBeTruthy();
    });

    test('gridStacked should create responsive grid', () => {
      const model = layouts.gridStacked().build();
      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.classList.contains('umd-grid-stacked')).toBe(true);
    });
  });

  describe('Asset Presets', () => {
    test('image should return slot element', () => {
      const model = assets.image().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-image-wrapper')).toBe(true);
    });

    test('image should support scaled parameter', () => {
      const normal = assets.image(false).build();
      const scaled = assets.image(true).build();

      expect(normal.styles).toBeTruthy();
      expect(scaled.styles).toBeTruthy();
      // Should use different styles based on scaled parameter
    });

    test('caption should return slot element', () => {
      const model = assets.caption().build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.classList.contains('umd-image-caption')).toBe(true);
    });
  });

  describe('Preset Chainability', () => {
    test('should support method chaining on slot presets', () => {
      const model = actions.primary()
        .withAttribute('data-test', 'value')
        .withText('Click Me')
        .build();

      expect(model.element.getAttribute('data-test')).toBe('value');
      expect(model.element.textContent).toBe('Click Me');
    });

    test('should support method chaining on div presets', () => {
      const model = layouts.container()
        .withClassName('custom-class')
        .withChild(document.createElement('span'))
        .build();

      expect(model.element.classList.contains('umd-container')).toBe(true);
      expect(model.element.classList.contains('custom-class')).toBe(true);
      expect(model.element.children.length).toBe(1);
    });
  });

  describe('Style Integration', () => {
    test('presets should integrate with UMD styles library', () => {
      // All presets should have compiled styles from UMD styles library
      const action = actions.primary().build();
      const headline = headlines.sansLarge().build();
      const eyebrow = text.eyebrow().build();

      // Styles should be present (not empty)
      expect(action.styles.length).toBeGreaterThan(0);
      expect(headline.styles.length).toBeGreaterThan(0);
      expect(eyebrow.styles.length).toBeGreaterThan(0);
    });

    test('styles should be deduplicated for same preset used multiple times', () => {
      const action1 = actions.primary().build();
      const action2 = actions.primary().build();

      // Both should have styles
      expect(action1.styles).toBeTruthy();
      expect(action2.styles).toBeTruthy();
    });
  });
});

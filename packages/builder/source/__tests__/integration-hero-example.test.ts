/**
 * @file integration-hero-example.test.ts
 * @description Integration test simulating real hero component pattern
 *
 * Tests the exact scenario from the user's question:
 * - Preset styles from typography.campaign.fonts.extraLarge
 * - Inline styles with overlapping media queries
 * - Ensures all properties are preserved and merged correctly
 */

import { ElementBuilder } from '../core/ElementBuilder';

describe('Hero Component Integration Test', () => {
  test('should merge campaign typography preset with inline hero styles', () => {
    // Simulate Styles.typography.campaign.fonts.extraLarge preset
    const campaignPreset = {
      className: 'umd-campaign-extralarge',
      fontFamily: "'BarlowCondensed', sans-serif",
      fontStyle: 'italic',
      fontWeight: 700,
      fontSize: '48px',
      letterSpacing: '0.02em',
      lineHeight: '0.91em',
      textWrap: 'pretty',
      color: '#000',

      // Preset has these media queries
      '@media (min-width: 1280px)': {
        fontSize: 'calc(48px + 4vw)',
      },
      '@media (min-width: 1024px)': {
        fontSize: '96px',
        lineHeight: '0.91em',
      },
    };

    // Create a headline element
    const headline = document.createElement('h1');
    headline.textContent = 'Fearlessly Forward';

    // Simulate the hero component pattern
    const isOverwriteHeadline = true;
    const isTextCenter = true;

    const headlineModel = new ElementBuilder(headline)
      .styled(campaignPreset)  // Priority 1 (base - outputs first)
      .withStyles({             // Priority 2 (overrides - outputs last)
        element: {
          textTransform: 'uppercase',

          // Custom styles with overlapping media query
          '@media (min-width: 768px)': {
            maxWidth: '700px',
            color: '#fff',

            ...(isTextCenter && { marginLeft: 'auto', marginRight: 'auto' }),
          },

          // Another overlapping media query (same as preset)
          '@media (min-width: 1024px)': {
            maxWidth: '816px',
            ...(isOverwriteHeadline && { fontSize: '80px' }),
          },
        },
      })
      .build();

    const css = headlineModel.styles;

    // Base styles should be present
    expect(css).toContain('font-family');
    expect(css).toContain('font-style: italic');
    expect(css).toContain('font-weight: 700');
    expect(css).toContain('text-transform: uppercase');

    // Large breakpoint (1280px) - should preserve preset styles
    expect(css).toContain('min-width: 1280px');
    expect(css).toContain('calc(48px + 4vw)'); // Preserved from preset

    // Desktop breakpoint (1024px) - both blocks output, withStyles wins via cascade
    expect(css).toContain('min-width: 1024px');
    expect(css).toContain('max-width: 816px'); // From withStyles
    expect(css).toContain('line-height: 0.91em'); // From styled (preserved!)

    // Both fontSize values appear (CSS cascade makes withStyles win)
    expect(css).toContain('font-size: 96px'); // From styled (priority 1)
    expect(css).toContain('font-size: 80px'); // From withStyles (priority 2 - wins)

    // Tablet breakpoint (768px) - should have custom styles
    expect(css).toContain('min-width: 768px');
    expect(css).toContain('max-width: 700px');
    expect(css).toContain('margin-left: auto');
    expect(css).toContain('margin-right: auto');

    // Both colors appear (withStyles wins via cascade)
    expect(css).toContain('color: #000'); // From styled (priority 1)
    expect(css).toContain('color: #fff'); // From withStyles (priority 2 - wins)
  });

  test('should handle container queries in hero asset styles', () => {
    // Simulate preset asset styles
    const assetPreset = {
      className: 'umd-hero-asset',
      position: 'relative',

      '@container (max-width: 1279px)': {
        aspectRatio: '16 / 9',
      },

      '@container (min-width: 768px)': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    };

    // Create asset element
    const asset = document.createElement('div');

    const assetModel = new ElementBuilder(asset)
      .styled(assetPreset)
      .withStyles({
        element: {
          overflow: 'hidden',

          // Overlapping container query
          '@container (min-width: 768px)': {
            borderRadius: '8px',
          },

          // Nested pseudo-element
          '&:before': {
            '@container (min-width: 768px)': {
              content: '""',
              position: 'absolute',
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 85%)',
              zIndex: '99',
            },
          },
        },
      })
      .build();

    const css = assetModel.styles;

    // Container queries should merge
    expect(css).toContain('min-width: 768px');
    expect(css).toContain('position: absolute'); // From preset
    expect(css).toContain('border-radius: 8px'); // From inline
    expect(css).toContain('width: 100%'); // From preset, preserved
    expect(css).toContain('height: 100%'); // From preset, preserved

    // Nested pseudo-element within container query
    expect(css).toContain('content: ""');
    expect(css).toContain('linear-gradient');
  });

  test('should preserve all media query properties from multiple sources', () => {
    // This tests CSS cascade order where properties are preserved
    const preset = {
      className: 'test-preset',
      '@media (min-width: 1024px)': {
        fontSize: '96px',
        lineHeight: '0.91em',
        letterSpacing: '0.02em',
      },
    };

    const element = document.createElement('div');
    const model = new ElementBuilder(element)
      .styled(preset)  // Priority 1 (base - outputs first)
      .withStyles({    // Priority 2 (overrides - outputs last)
        element: {
          '@media (min-width: 1024px)': {
            maxWidth: '816px',
            fontSize: '80px', // Wins via CSS cascade
          },
        },
      })
      .build();

    const css = model.styles;

    // lineHeight and letterSpacing should be preserved
    expect(css).toContain('line-height: 0.91em');
    expect(css).toContain('letter-spacing: 0.02em');

    // maxWidth should be added (no conflict)
    expect(css).toContain('max-width: 816px');

    // Both fontSize values appear (withStyles wins via cascade)
    expect(css).toContain('font-size: 96px'); // From styled
    expect(css).toContain('font-size: 80px'); // From withStyles (wins)
  });

  test('should handle multiple overlapping breakpoints cleanly', () => {
    const preset = {
      className: 'responsive-text',
      fontSize: '16px',

      '@media (min-width: 768px)': {
        fontSize: '20px',
        lineHeight: '1.4',
      },

      '@media (min-width: 1024px)': {
        fontSize: '24px',
        lineHeight: '1.3',
      },

      '@media (min-width: 1280px)': {
        fontSize: '28px',
      },
    };

    const element = document.createElement('p');
    const model = new ElementBuilder(element)
      .styled(preset)  // Priority 1 (base - outputs first)
      .withStyles({    // Priority 2 (overrides - outputs last)
        element: {
          color: '#333',

          '@media (min-width: 768px)': {
            color: '#000',
            maxWidth: '700px',
          },

          '@media (min-width: 1024px)': {
            maxWidth: '900px',
            fontSize: '26px', // Wins via CSS cascade
          },

          '@media (min-width: 1440px)': {
            maxWidth: '1200px',
          },
        },
      })
      .build();

    const css = model.styles;

    // All breakpoints should exist
    expect(css).toContain('min-width: 768px');
    expect(css).toContain('min-width: 1024px');
    expect(css).toContain('min-width: 1280px');
    expect(css).toContain('min-width: 1440px');

    // 768px: merged properties
    expect(css).toContain('max-width: 700px');
    expect(css).toContain('line-height: 1.4'); // Preserved from preset

    // 1024px: both fontSize values appear, withStyles wins via cascade
    expect(css).toContain('max-width: 900px');
    expect(css).toContain('font-size: 24px'); // From styled (priority 1)
    expect(css).toContain('font-size: 26px'); // From withStyles (priority 2 - wins)
    expect(css).toContain('line-height: 1.3');

    // 1280px: should still exist with preset fontSize
    expect(css).toContain('font-size: 28px');

    // 1440px: new breakpoint from withStyles
    expect(css).toContain('max-width: 1200px');
  });
});

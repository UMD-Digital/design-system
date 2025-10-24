/**
 * @file presets.ts
 * @description Preset builders for UMD Design System elements
 *
 * Provides pre-configured builders with UMD Design System styles
 * for common UI patterns like actions, headlines, text, and layouts
 */

import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '../core/ElementBuilder';
import type { ElementBuilderInterface, BuilderOptions } from '../core/types';

/**
 * Action/Link presets with UMD Design System styles
 * Uses slot elements as the primary element for content projection
 *
 * @example
 * ```typescript
 * const button = actions.primary().build();
 * // Returns a slot element with action styles applied
 * ```
 */
export const actions = {
  /**
   * Primary action button/link (red button)
   */
  primary: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-primary')
      .withStyles(
        Styles.element.action.primary.normal,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Large primary action
   */
  primaryLarge: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-primary-large')
      .withStyles(
        Styles.element.action.primary.large,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * White primary action (for dark backgrounds)
   */
  primaryWhite: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-primary-white')
      .withStyles(
        Styles.element.action.primary.white,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Secondary action with underline animation
   */
  secondary: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-secondary')
      .withStyles(Styles.element.action.secondary.normal)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Large secondary action
   */
  secondaryLarge: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-secondary-large')
      .withStyles(Styles.element.action.secondary.large)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * White secondary action (for dark backgrounds)
   */
  secondaryWhite: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-secondary-white')
      .withStyles(Styles.element.action.secondary.white)
      .withAnimation('slideUnder')
      .withTheme('dark') as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Gold secondary action (for dark backgrounds)
   */
  secondaryGold: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-secondary-gold')
      .withStyles(Styles.element.action.secondary.gold)
      .withAnimation('slideUnder')
      .withTheme('dark') as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Outline action button
   */
  outline: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-outline')
      .withStyles(
        Styles.element.action.outline.normal,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Large outline action
   */
  outlineLarge: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-outline-large')
      .withStyles(
        Styles.element.action.outline.large,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * White outline action (for dark backgrounds)
   */
  outlineWhite: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-outline-white')
      .withStyles(
        Styles.element.action.outline.white,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Small icon action
   */
  iconSmall: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-icon-small')
      .withStyles(
        Styles.element.action.icon.small,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Small icon action for dark backgrounds
   */
  iconSmallDark: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-action-icon-small-dark')
      .withStyles(
        Styles.element.action.icon.smallDark,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,
};

/**
 * Headline presets with UMD Design System typography
 * Uses slot elements as the primary element for content projection
 *
 * @example
 * ```typescript
 * const headline = headlines.sansLarge().build();
 * // Returns a slot element with headline styles applied
 * ```
 */
export const headlines = {
  // Sans Serif Fonts
  sansExtraLarge: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-xl')
      .withStyles(Styles.typography.sans.fonts.extraLarge)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  sansLargest: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-largest')
      .withStyles(Styles.typography.sans.fonts.largest)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  sansLarger: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-larger')
      .withStyles(Styles.typography.sans.fonts.larger)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  sansLarge: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-large')
      .withStyles(Styles.typography.sans.fonts.large)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  sansMedium: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-medium')
      .withStyles(Styles.typography.sans.fonts.medium)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  sansSmall: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-small')
      .withStyles(Styles.typography.sans.fonts.small)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  sansSmaller: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-smaller')
      .withStyles(Styles.typography.sans.fonts.smaller)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  sansMin: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-min')
      .withStyles(Styles.typography.sans.fonts.min)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  // Sans Scaling Fonts
  sansScalingLarger: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-scaling-larger')
      .withStyles(Styles.typography.sans.scalingFonts.larger)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  sansScalingMin: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-sans-scaling-min')
      .withStyles(Styles.typography.sans.scalingFonts.min)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  // Campaign Fonts
  campaignMaximum: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-campaign-max')
      .withStyles(Styles.typography.campaign.fonts.maximum)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  campaignExtraLarge: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-campaign-xl')
      .withStyles(Styles.typography.campaign.fonts.extraLarge)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  campaignLarge: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-headline-campaign-large')
      .withStyles(Styles.typography.campaign.fonts.large)
      .withAnimation(
        'slideUnder',
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,
};

/**
 * Text element presets
 * Uses slot elements as the primary element for content projection
 *
 * @example
 * ```typescript
 * const eyebrow = text.eyebrow().build();
 * // Returns a slot element with text styles applied
 * ```
 */
export const text = {
  /**
   * Eyebrow text (small uppercase label)
   */
  eyebrow: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-text-eyebrow')
      .withStyles(
        Styles.typography.elements.fonts.eyebrow,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Ribbon decoration text
   */
  ribbon: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-text-ribbon')
      .withStyles(
        Styles.element.text.decoration.ribbon,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Body paragraph text
   */
  body: (options?: BuilderOptions): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-text-body')
      .withStyles(
        Styles.typography.sans.fonts.small,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,
};

/**
 * Layout container presets
 *
 * @example
 * ```typescript
 * const grid = layouts.grid(3, true)
 *   .withChildren(...)
 *   .build();
 * ```
 */
export const layouts = {
  /**
   * Grid layout with configurable columns
   *
   * @param columns - Number of columns (2, 3, or 4)
   * @param withGap - Whether to include gap spacing
   */
  grid: (
    columns: 2 | 3 | 4 = 2,
    withGap: boolean = true,
  ): ElementBuilderInterface<HTMLDivElement> => {
    const styleMap = {
      2: withGap ? Styles.layout.grid.gap.two : Styles.layout.grid.columnsTwo,
      3: withGap
        ? Styles.layout.grid.gap.three
        : Styles.layout.grid.columnsThree,
      4: withGap ? Styles.layout.grid.gap.four : Styles.layout.grid.columnsFour,
    };

    return new ElementBuilder()
      .withClassName(`umd-grid-${columns}`)
      .withStyles(
        styleMap[columns],
      ) as unknown as ElementBuilderInterface<HTMLDivElement>;
  },

  /**
   * Container with horizontal spacing
   */
  container: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLDivElement> =>
    new ElementBuilder(options)
      .withClassName('umd-container')
      .withStyles(
        Styles.layout.space.horizontal.normal,
      ) as unknown as ElementBuilderInterface<HTMLDivElement>,

  /**
   * Centered container
   */
  centered: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLDivElement> =>
    new ElementBuilder(options)
      .withClassName('umd-centered')
      .withStyles(
        Styles.layout.alignment.block.center,
      ) as unknown as ElementBuilderInterface<HTMLDivElement>,

  /**
   * Stacked layout (vertical flexbox)
   *
   * @param gap - Gap size ('small', 'medium', or 'large')
   */
  stacked: (
    gap: 'small' | 'medium' | 'large' = 'medium',
  ): ElementBuilderInterface<HTMLDivElement> => {
    const gapValues = {
      small: '1rem',
      medium: '2rem',
      large: '3rem',
    };

    return new ElementBuilder().withClassName('umd-stacked').withStyles({
      element: {
        display: 'flex',
        flexDirection: 'column',
        gap: gapValues[gap],
      },
    }) as unknown as ElementBuilderInterface<HTMLDivElement>;
  },

  /**
   * Inline layout (horizontal flexbox)
   *
   * @param gap - Gap size ('small', 'medium', or 'large')
   */
  inline: (
    gap: 'small' | 'medium' | 'large' = 'medium',
  ): ElementBuilderInterface<HTMLDivElement> => {
    const gapValues = {
      small: '1rem',
      medium: '2rem',
      large: '3rem',
    };

    return new ElementBuilder().withClassName('umd-inline').withStyles({
      element: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: gapValues[gap],
      },
    }) as unknown as ElementBuilderInterface<HTMLDivElement>;
  },

  /**
   * Grid stacked layout (responsive grid that stacks on mobile)
   */
  gridStacked: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLDivElement> =>
    new ElementBuilder(options)
      .withClassName('umd-grid-stacked')
      .withStyles(
        Styles.layout.grid.gap.two,
      ) as unknown as ElementBuilderInterface<HTMLDivElement>,
};

/**
 * Asset element presets
 * Uses slot elements as the primary element for content projection
 *
 * @example
 * ```typescript
 * const imageWrapper = assets.image().build();
 * // Returns a slot element with image wrapper styles applied
 * ```
 */
export const assets = {
  /**
   * Image wrapper container
   *
   * @param isScaled - Whether to use scaled version
   */
  image: (
    isScaled: boolean = false,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot')
      .withClassName('umd-image-wrapper')
      .withStyles(
        isScaled
          ? Styles.element.asset.image.wrapperScaled
          : Styles.element.asset.image.wrapper,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,

  /**
   * Image caption
   */
  caption: (
    options?: BuilderOptions,
  ): ElementBuilderInterface<HTMLSlotElement> =>
    new ElementBuilder('slot', options)
      .withClassName('umd-image-caption')
      .withStyles(
        Styles.element.asset.image.caption,
      ) as unknown as ElementBuilderInterface<HTMLSlotElement>,
};

/**
 * All presets combined for convenient importing
 *
 * @example
 * ```typescript
 * import { presets } from '@universityofmaryland/web-builder-library/presets';
 *
 * const button = presets.actions.primary()
 *   .withText('Click me')
 *   .build();
 * ```
 */
export const presets = {
  actions,
  headlines,
  text,
  layouts,
  assets,
};

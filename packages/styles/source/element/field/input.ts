/**
 * @module element/field/input
 * Provides form input field styles and wrappers.
 */

import { color, spacing } from '../../token';
import { create, transform } from '../../utilities';
import type { JssObject } from '../../_types';
import { baseInput } from './_base';
import { valid, invalid } from './_state';

const CALENDAR_DARK = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0ndHJ1ZScgd2lkdGg9Jzk2JyBoZWlnaHQ9Jzk2JyB2aWV3Qm94PScwIDAgOTYgOTYnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZmlsbD0nIzc1NzU3NScgZmlsbC1ydWxlPSdldmVub2RkJyBjbGlwLXJ1bGU9J2V2ZW5vZGQnIGQ9J00xNSAzSDI3VjEzSDcxVjNIODNWMTNIOTBWMjlIN1YxM0gxNVYzWk05MCAzNUg3Vjg4SDkwVjM1WicgLz48L3N2Zz4=`;
const CALENDAR_RED = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgOTYgOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2UyMTgzMyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAzSDI3VjEzSDcxVjNIODNWMTNIOTBWMjlIN1YxM0gxNVYzWk05MCAzNUg3Vjg4SDkwVjM1WiIgLz48L3N2Zz4=`;
const CLOCK_DARK = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgOTYgOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iIzc1NzU3NSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OCA5MkM3Mi4zMDA1IDkyIDkyIDcyLjMwMDUgOTIgNDhDOTIgMjMuNjk5NSA3Mi4zMDA1IDQgNDggNEMyMy42OTk1IDQgNCAyMy42OTk1IDQgNDhDNCA3Mi4zMDA1IDIzLjY5OTUgOTIgNDggOTJaTTY4Ljk1MDIgNDkuNzMwOUw1MC43NTY3IDUwLjczNjlMNTIuMDk2OCAyNS4zMDYyTDQzLjE2NDUgMTYuMzczOEw0MC4wMDUyIDU4LjYxNjVMMzkuNzQ5NCA2MS43NDkzTDM5Ljc3MSA2MS43NDc2TDM5Ljc2OTQgNjEuNzY5NEw1MC4yMjAyIDYwLjkxNjJMNTAuMjIxIDYwLjkwMTlMNzcuODgyNiA1OC42NjMzTDY4Ljk1MDIgNDkuNzMwOVoiIC8+PC9zdmc+`;
const CLOCK_RED = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgOTYgOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2UyMTgzMyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OCA5MkM3Mi4zMDA1IDkyIDkyIDcyLjMwMDUgOTIgNDhDOTIgMjMuNjk5NSA3Mi4zMDA1IDQgNDggNEMyMy42OTk1IDQgNCAyMy42OTk1IDQgNDhDNCA3Mi4zMDA1IDIzLjY5OTUgOTIgNDggOTJaTTY4Ljk1MDIgNDkuNzMwOUw1MC43NTY3IDUwLjczNjlMNTIuMDk2OCAyNS4zMDYyTDQzLjE2NDUgMTYuMzczOEw0MC4wMDUyIDU4LjYxNjVMMzkuNzQ5NCA2MS43NDkzTDM5Ljc3MSA2MS43NDc2TDM5Ljc2OTQgNjEuNzY5NEw1MC4yMjAyIDYwLjkxNjJMNTAuMjIxIDYwLjkwMTlMNzcuODgyNiA1OC42NjMzTDY4Ljk1MDIgNDkuNzMwOVoiIC8+PC9zdmc+`;

// Consistent naming
const classNamePrefix = 'umd-field-input';

/**
 * Base input field styles with validation states.
 * @returns {JssObject} Base styles for input fields with validation state support.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.input.input
 * ```
 * @example
 * ```css
 * class="umd-field-input"
 * ```
 * @since 1.8.0
 */
export const input: JssObject = {
  className: 'umd-field-input',
  ...baseInput,

  "&[aria-invalid='true']": {
    ...invalid,
  },

  "&[aria-invalid='false']": {
    ...valid,
  },

  '&[type="number"]': {
    [`&::-webkit-inner-spin-button`]: {
      opacity: 1,
    },
  },
};

/**
 * Base styles for date and time input fields.
 */
const dateTimeBase = {
  appearance: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 9,

  [`&::-webkit-inner-spin-button, &::-webkit-outer-spin-button`]: {
    appearance: 'none',
    display: 'none',
  },

  '&::-webkit-calendar-picker-indicator': {
    backgroundImage: 'none',
    backgroundPosition: '-9999vw',
    cursor: 'pointer',
  },

  '&::-webkit-clear-button': {
    display: 'none',
  },
};

/**
 * Base styles for date and time input wrappers.
 */
const dateTimeWrapperBase = {
  backgroundColor: color.white,
  position: 'relative',

  [`&:before, &:after`]: {
    content: '""',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    height: spacing.sm,
    width: spacing.sm,
    position: 'absolute',
    right: spacing.sm,
    top: `calc(50% - ${spacing.min})`,
    zIndex: 0,
    transition: `opacity 0.5s ease-in-out`,
  },

  [`&:hover, &:focus, &:focus-within`]: {
    '&:before': {
      opacity: 0,
    },

    '&:after': {
      opacity: 1,
    },
  },

  '@supports (-moz-appearance: none)': {
    [`&:before, &:after`]: {
      display: 'none',
    },
  },
};

/**
 * Text input field styles.
 * @returns {JssObject} Styles for text input fields.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.input.text
 * ```
 * @example
 * ```css
 * class="umd-field-input-text"
 * ```
 * @since 1.8.0
 */
export const text: JssObject = create.jssObject({
  className: [`${classNamePrefix}-text`],
});

/**
 * Date and datetime input wrapper with calendar icon.
 * @returns {JssObject} Wrapper styles for date and datetime inputs with calendar icon.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.input.dateTimeWrapper
 * ```
 * @example
 * ```css
 * class="umd-field-input-date-time-wrapper"
 * ```
 * @deprecated Use 'umd-forms-datetime-wrapper' is deprecated, use 'umd-field-input-date-time-wrapper' instead.
 * @since 1.8.0
 */
export const dateTimeWrapper: JssObject = create.jssObject({
  ...dateTimeWrapperBase,

  className: [
    `${classNamePrefix}-date-time-wrapper`,
    /** @deprecated Use 'umd-field-input-date-time-wrapper' instead */
    'umd-forms-datetime-wrapper',
  ],

  '&:before': {
    backgroundImage: `url("${CALENDAR_DARK}")`,
    opacity: 1,
  },

  '&:after': {
    backgroundImage: `url("${CALENDAR_RED}")`,
    opacity: 0,
  },

  [`& input[type='date'], & input[type='datetime-local'],`]: {
    ...dateTimeBase,
  },
});

/**
 * Time input wrapper with clock icon.
 * @returns {JssObject} Wrapper styles for time input with clock icon.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.input.timeWrapper
 * ```
 * @since 1.8.0
 */
export const timeWrapper: JssObject = create.jssObject({
  ...dateTimeWrapperBase,

  className: [
    `${classNamePrefix}-time-wrapper`,
    /** @deprecated Use 'umd-field-input-time-wrapper' instead */
    'umd-forms-time-wrapper',
  ],

  '&:before': {
    backgroundImage: `url("${CLOCK_DARK}")`,
    opacity: 1,
  },

  '&:after': {
    backgroundImage: `url("${CLOCK_RED}")`,
    opacity: 0,
  },

  [`& input[type='time']`]: {
    ...dateTimeBase,
  },
});

/**
 * Search input wrapper with search icon.
 * @returns {JssObject} Wrapper styles for search input with search icon.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.input.searchWrapper
 * ```
 * @since 1.8.0
 */
export const searchWrapper: JssObject = create.jssObject({
  position: 'relative',

  className: [
    `${classNamePrefix}-search-wrapper`,
    /** @deprecated Use 'umd-field-input-search-wrapper' instead */
    'umd-forms-layout-wrapper-search-submit',
  ],

  [`&:before, &:after`]: {
    content: '""',
    position: 'absolute',
    bottom: spacing.min,
    right: spacing.min,
    height: spacing.lg,
    width: spacing.lg,
    padding: '4px',
    zIndex: '9',
  },

  [`&:before`]: {
    backgroundColor: 'transparent',
    borderRadius: '4px',
    transition: 'background 0.2s ease-in-out',
  },

  [`&:after`]: {
    content: `url("data:image/svg+xml,%3Csvg aria-hidden='true' viewBox='0 0 96 96' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M79.3401 42.2306C79.3401 54.1438 69.6826 63.8013 57.7694 63.8013C45.8562 63.8013 36.1987 54.1438 36.1987 42.2306C36.1987 30.3174 45.8562 20.6599 57.7694 20.6599C69.6826 20.6599 79.3401 30.3174 79.3401 42.2306ZM91 42.2306C91 60.5833 76.1222 75.4612 57.7694 75.4612C51.3447 75.4612 45.3458 73.6379 40.2619 70.4806L24.2216 86.5209H5L30.2245 60.8255C26.6351 55.5189 24.5388 49.1195 24.5388 42.2306C24.5388 23.8778 39.4167 9 57.7694 9C76.1222 9 91 23.8778 91 42.2306Z'/%3E%3C/svg%3E")`,
  },

  [`&:hover, &:focus`]: {
    [`&:before`]: {
      backgroundColor: color.red,
    },

    [`&:after`]: {
      content: `url("data:image/svg+xml,%3Csvg aria-hidden='true' viewBox='0 0 96 96' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M79.3401 42.2306C79.3401 54.1438 69.6826 63.8013 57.7694 63.8013C45.8562 63.8013 36.1987 54.1438 36.1987 42.2306C36.1987 30.3174 45.8562 20.6599 57.7694 20.6599C69.6826 20.6599 79.3401 30.3174 79.3401 42.2306ZM91 42.2306C91 60.5833 76.1222 75.4612 57.7694 75.4612C51.3447 75.4612 45.3458 73.6379 40.2619 70.4806L24.2216 86.5209H5L30.2245 60.8255C26.6351 55.5189 24.5388 49.1195 24.5388 42.2306C24.5388 23.8778 39.4167 9 57.7694 9C76.1222 9 91 23.8778 91 42.2306Z'/%3E%3C/svg%3E")`,
    },
  },

  [`& input[type='text']`]: {
    paddingRight: spacing['2xl'],
  },
});

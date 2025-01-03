import { color, spacing } from '../../token';
import { create } from '../../utilities';
import { baseInput } from './_base';
import { valid, invalid } from './_state';

const CALENDAR_DARK = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0ndHJ1ZScgd2lkdGg9Jzk2JyBoZWlnaHQ9Jzk2JyB2aWV3Qm94PScwIDAgOTYgOTYnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZmlsbD0nIzc1NzU3NScgZmlsbC1ydWxlPSdldmVub2RkJyBjbGlwLXJ1bGU9J2V2ZW5vZGQnIGQ9J00xNSAzSDI3VjEzSDcxVjNIODNWMTNIOTBWMjlIN1YxM0gxNVYzWk05MCAzNUg3Vjg4SDkwVjM1WicgLz48L3N2Zz4=`;
const CALENDAR_RED = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgOTYgOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2UyMTgzMyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAzSDI3VjEzSDcxVjNIODNWMTNIOTBWMjlIN1YxM0gxNVYzWk05MCAzNUg3Vjg4SDkwVjM1WiIgLz48L3N2Zz4=`;
const CLOCK_DARK = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgOTYgOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iIzc1NzU3NSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OCA5MkM3Mi4zMDA1IDkyIDkyIDcyLjMwMDUgOTIgNDhDOTIgMjMuNjk5NSA3Mi4zMDA1IDQgNDggNEMyMy42OTk1IDQgNCAyMy42OTk1IDQgNDhDNCA3Mi4zMDA1IDIzLjY5OTUgOTIgNDggOTJaTTY4Ljk1MDIgNDkuNzMwOUw1MC43NTY3IDUwLjczNjlMNTIuMDk2OCAyNS4zMDYyTDQzLjE2NDUgMTYuMzczOEw0MC4wMDUyIDU4LjYxNjVMMzkuNzQ5NCA2MS43NDkzTDM5Ljc3MSA2MS43NDc2TDM5Ljc2OTQgNjEuNzY5NEw1MC4yMjAyIDYwLjkxNjJMNTAuMjIxIDYwLjkwMTlMNzcuODgyNiA1OC42NjMzTDY4Ljk1MDIgNDkuNzMwOVoiIC8+PC9zdmc+`;
const CLOCK_RED = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgOTYgOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2UyMTgzMyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OCA5MkM3Mi4zMDA1IDkyIDkyIDcyLjMwMDUgOTIgNDhDOTIgMjMuNjk5NSA3Mi4zMDA1IDQgNDggNEMyMy42OTk1IDQgNCAyMy42OTk1IDQgNDhDNCA3Mi4zMDA1IDIzLjY5OTUgOTIgNDggOTJaTTY4Ljk1MDIgNDkuNzMwOUw1MC43NTY3IDUwLjczNjlMNTIuMDk2OCAyNS4zMDYyTDQzLjE2NDUgMTYuMzczOEw0MC4wMDUyIDU4LjYxNjVMMzkuNzQ5NCA2MS43NDkzTDM5Ljc3MSA2MS43NDc2TDM5Ljc2OTQgNjEuNzY5NEw1MC4yMjAyIDYwLjkxNjJMNTAuMjIxIDYwLjkwMTlMNzcuODgyNiA1OC42NjMzTDY4Ljk1MDIgNDkuNzMwOVoiIC8+PC9zdmc+`;

// Consistent naming
const classNamePrefix = 'umd-field-input';

export const input = {
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

  // [`@container ${CONTAINER_QUERY_NAME} (${media.queries.medium.min})`]: {
  //   backgroundPosition: `calc(100% - ${spacing.sm}) center`,
  //   padding: spacing.sm,
  // },
};

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

// To Do - Refactor to remove multiple classes for date/time. Can be condensed into one class.

// umd-field-input-text
export const text = create.jssObject({
  className: [`${classNamePrefix}-text`],
});

// umd-field-input-date-time-wrapper
export const dateTimeWrapper = create.jssObject({
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

// umd-field-input-time-wrapper
export const timeWrapper = create.jssObject({
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

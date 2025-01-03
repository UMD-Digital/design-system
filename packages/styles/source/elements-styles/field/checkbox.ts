import { colors, spacing } from '../../tokens';
import { create } from '../../utilities';
import { baseInputChoice, baseInputChoiceWrapper } from './_base';

const CHECK_RED = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgOTYgOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNlMjE4MzMiIGQ9Ik00MC41NTEyIDYxLjM0MTJMODQgMTEuMDAwMUw4NS42NDQ0IDMxLjg1N0w0Mi44NzkxIDgxLjk1MjJMNDEuOTIgODEuMTMzM0w0MS40MzE4IDgxLjcwNUw5Ljk3MDMxIDU1Ljk5MThMMjkuMTUyNSA1Mi4wNDY0TDQwLjU1MTIgNjEuMzQxMloiIC8+PC9zdmc+`;

// Consistent naming
const classNamePrefix = 'umd-field-checkbox';

export const checkbox = {
  ...baseInputChoice,
  border: `1px solid ${colors.gray.light}`,

  '&::after': {
    content: "''",
    backgroundImage: `url("${CHECK_RED}")`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    display: 'block',
    height: `calc(${spacing.md} - 4px)`,
    opacity: 0,
    position: 'absolute',
    left: '2px',
    top: '2px',
    transition: 'opacity 0.5s ease-in-out',
    visibility: 'hidden',
    width: `calc(${spacing.md} - 4px)`,
  },
};

// umd-field-checkbox-wrapper
export const checkboxWrapper = create.jssObject({
  ...baseInputChoiceWrapper,

  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-text-decoration-eyebrow' instead */
    'umd-forms-choices-wrapper',
  ],

  "& input[type='checkbox']": {
    ...checkbox,
  },
});

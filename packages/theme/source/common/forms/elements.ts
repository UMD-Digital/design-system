import { Tokens, Typography } from '@universityofmaryland/web-elements-styles';
import Assets from '../../assets';

const { Colors, Media, Spacing } = Tokens;
const { Icons } = Assets;

const CONTAINER_QUERY_NAME = `umd-forms-layout`;

const FormElementOverridesNumber = {
  [`&::-webkit-inner-spin-button`]: {
    opacity: 1,
  },
};

const FormElementOverridesSelectMultiple = {
  cursor: 'pointer',
  resize: 'vertical',

  '& option': {
    padding: '5px',
    color: Colors.black,
    transition: 'color 0.3s',

    '&:hover': {
      color: Colors.red,
    },

    '&:checked': {
      backgroundColor: Colors.gray.light,
    },
  },
};

const FormElementFileWrapper = {
  backgroundColor: Colors.white,
  overflow: 'hidden',
  position: 'relative',

  "& input[type='file']": {
    appearance: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 9,

    [`&::file-selector-button,
      &::-webkit-file-upload-button`]: {
      cursor: 'pointer',
      marginRight: Spacing.sm,
    },
  },
};

const FormElementSelectWrapper = {
  backgroundColor: Colors.white,
  overflow: 'hidden',
  position: 'relative',

  '& select': {
    appearance: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    paddingRight: Spacing.lg,
    position: 'relative',
    zIndex: 9,
  },

  [`&:after,
    &:before`]: {
    content: "''",
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    position: 'absolute',
    right: Spacing.sm,
    top: `calc(50% - ${Spacing.min})`,
    zIndex: 0,
    transition: 'opacity 0.5s ease-in-out',
    height: Spacing.sm,
    width: Spacing.sm,
  },

  '&:before': {
    backgroundImage: `url("${Icons.CHEVRON_DOWN_DARK}")`,
    opacity: 1,
  },

  '&:after': {
    backgroundImage: `url("${Icons.CHEVRON_DOWN_RED}")`,
    opacity: 0,
  },

  [`&:hover,
    &:focus,
    &:focus-within`]: {
    '&:before': {
      opacity: 0,
    },

    '&:after': {
      opacity: 1,
    },
  },
};

const FormElementBaseChoices = {
  appearance: 'none',
  backgroundColor: Colors.white,
  border: `1px solid ${Colors.gray.light}`,
  cursor: 'pointer',
  flex: 'none',
  height: Spacing.md,
  padding: 0,
  position: 'relative',
  width: Spacing.md,

  '&:checked::after': {
    opacity: 1,
    visibility: 'visible',
  },
};

const FormElementCheckbox = {
  ...FormElementBaseChoices,

  '&::after': {
    content: "''",
    backgroundImage: `url("${Icons.CHECK_RED}")`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    display: 'block',
    height: `calc(${Spacing.md} - 4px)`,
    opacity: 0,
    position: 'absolute',
    left: '2px',
    top: '2px',
    transition: 'opacity 0.5s ease-in-out',
    visibility: 'hidden',
    width: `calc(${Spacing.md} - 4px)`,
  },
};

const FormElementRadio = {
  ...FormElementBaseChoices,

  borderRadius: '50%',
  border: `1px solid ${Colors.gray.light}`,

  '&::after': {
    content: "''",
    backgroundSize: 'contain',
    backgroundColor: Colors.red,
    backgroundPosition: 'center',
    border: `1px solid ${Colors.gray.light}`,
    borderRadius: '50%',
    display: 'block',
    height: Spacing.xs,
    opacity: 0,
    position: 'absolute',
    left: '5px',
    top: '5px',
    transition: 'opacity 0.5s ease-in-out',
    visibility: 'hidden',
    width: Spacing.xs,
  },
};

const FormElementChoicesWrapper = {
  alignItems: 'center',
  cursor: 'pointer',
  color: Colors.black,
  display: 'inline-flex',
  gap: '16px',
  justifyContent: 'flex-start',
  transition: 'color 0.5s ease-in-out',

  [`&:hover,
    &:focus,
    &:focus-within`]: {
    color: Colors.redDark,
  },

  "& input[type='checkbox']": {
    ...FormElementCheckbox,
  },

  "& input[type='radio']": {
    ...FormElementRadio,
  },
};

const FormElementDateTime = {
  appearance: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 9,

  [`&::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button`]: {
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

  [`@container ${CONTAINER_QUERY_NAME} (${Media.queries.medium.min})`]: {
    backgroundPosition: `calc(100% - ${Spacing.sm}) center`,
    padding: Spacing.sm,
  },
};

const FormElementBaseDatetimeWrapper = {
  backgroundColor: Colors.white,
  position: 'relative',

  [`&:before,
    &:after`]: {
    content: '""',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    height: Spacing.sm,
    width: Spacing.sm,
    position: 'absolute',
    right: Spacing.sm,
    top: `calc(50% - ${Spacing.min})`,
    zIndex: 0,
    transition: `opacity 0.5s ease-in-out`,
  },

  [`&:hover,
    &:focus,
    &:focus-within`]: {
    '&:before': {
      opacity: 0,
    },

    '&:after': {
      opacity: 1,
    },
  },

  '@supports (-moz-appearance: none)': {
    [`&:before,
      &:after`]: {
      display: 'none',
    },
  },
};

const FormElementDatetimeWrapper = {
  ...FormElementBaseDatetimeWrapper,

  '&:before': {
    backgroundImage: `url("${Icons.CALENDAR_DARK}")`,
    opacity: 1,
  },

  '&:after': {
    backgroundImage: `url("${Icons.CALENDAR_RED}")`,
    opacity: 0,
  },

  [`& input[type='date'],
    & input[type='datetime-local'],`]: {
    ...FormElementDateTime,
  },
};

const FormElementTimeWrapper = {
  ...FormElementBaseDatetimeWrapper,

  '&:before': {
    backgroundImage: `url("${Icons.CLOCK_DARK}")`,
    opacity: 1,
  },

  '&:after': {
    backgroundImage: `url("${Icons.CLOCK_RED}")`,
    opacity: 0,
  },

  [`& input[type='time']`]: {
    ...FormElementDateTime,
  },
};

const FormElements = {
  'select[multiple]': {
    ...FormElementOverridesSelectMultiple,
  },

  "input[type='number']": {
    ...FormElementOverridesNumber,
  },

  '.umd-forms-file-wrapper': {
    ...FormElementFileWrapper,
  },

  '.umd-forms-choices-wrapper': {
    ...FormElementChoicesWrapper,
  },

  '.umd-forms-datetime-wrapper': {
    ...FormElementDatetimeWrapper,
  },
  '.umd-forms-time-wrapper': {
    ...FormElementTimeWrapper,
  },

  '.umd-forms-select-wrapper': {
    ...FormElementSelectWrapper,
  },
};

export default FormElements;

import { Typography, Tokens } from '@universityofmaryland/web-elements-styles';

const { Colors, Spacing } = Tokens;

const FormActionsBase = {
  ...Typography.elements.interativeSmall,

  padding: `${Spacing.xs} ${Spacing.lg}`,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',
  textAlign: 'center',
  maxWidth: '400px',
};

const SvgBase = {
  height: '14px',
  width: '14px',
  transition: 'fill 0.5s ease-in-out',
  flex: 'none',
  zIndex: '99',
  marginRight: ' 4px',
  marginTop: '2px',
};

const FormActionsPrimary = {
  ...FormActionsBase,

  backgroundColor: Colors.red,
  border: `1px solid ${Colors.red}`,
  color: Colors.white,

  '& svg': {
    ...SvgBase,

    fill: Colors.red,
  },

  [`&:hover,
    &:focus`]: {
    border: `1px solid ${Colors.redDark}`,
    backgroundColor: Colors.redDark,
  },
};

const FormActionsOutline = {
  ...FormActionsBase,

  backgroundColor: Colors.white,
  border: `1px solid ${Colors.gray.darker}`,
  color: Colors.black,

  '& svg': {
    ...SvgBase,

    fill: Colors.black,
  },

  [`&:hover,
    &:focus`]: {
    backgroundColor: Colors.gray.darker,
    color: Colors.white,

    '& svg': {
      fill: Colors.white,
    },
  },
};

const FormActions = {
  'button.umd-forms-actions-primary': {
    ...FormActionsPrimary,
  },

  'button.umd-forms-actions-outline': {
    ...FormActionsOutline,
  },
};

export default FormActions;

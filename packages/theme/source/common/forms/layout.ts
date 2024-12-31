import { Tokens, Typography } from '@universityofmaryland/web-elements-styles';
import Assets from '../../assets';
import State from './state';

const { Colors, Media, Spacing } = Tokens;
const { Icons } = Assets;
const { FormFieldValidation } = State;

const FormLayoutField = {
  '& label': {
    ...Typography.sans.large,

    display: 'inline-block',
    position: 'relative',

    '&.sr-only': {
      position: 'absolute',
    },

    '&:has(+ input[required]):after': {
      content: "' *'",
      color: Colors.redDark,
    },

    "&:not([class='sr-only']) + *": {
      marginTop: Spacing.sm,
    },

    '&[for]': {
      cursor: 'pointer',
    },
  },

  "& > [aria-invalid='true']": {
    ...FormFieldValidation.invalid,
  },

  "& > [aria-invalid='false']": {
    ...FormFieldValidation.valid,

    "&input[type='file']:before": {
      backgroundImage: `url('${Icons.DOCUMENT_GREEN}')`,
    },
  },
};

const FormLayoutBaseFieldset = {
  '& > legend': {
    ...Typography.sans.large,

    marginBottom: Spacing.sm,
    position: 'relative',

    [`@media (${Media.queries.large.min})`]: {
      gridColumn: 'span 2',
    },
  },

  '&[required] > legend': {
    content: "' *'",
    color: Colors.redDark,
  },

  "&[aria-invalid='true']": {
    ...FormFieldValidation.invalid,

    border: 0,
  },

  "&[aria-invalid='false']": {
    ...FormFieldValidation.valid,

    border: 0,
  },
};

const FormLayoutBaseFieldsetGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: `${Spacing.sm} ${Spacing.xl}`,
  justifyItems: 'start',

  [`@media (${Media.queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

const FormLayoutFieldsetGridTwo = {
  ...FormLayoutBaseFieldsetGrid,
  ...FormLayoutBaseFieldset,
};

const FormLayoutFieldsetGridThree = {
  ...FormLayoutBaseFieldsetGrid,
  ...FormLayoutBaseFieldset,

  [`@media (${Media.queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const FormLayoutFieldsetList = {
  ...FormLayoutBaseFieldset,

  '& > *': {
    alignItems: 'flex-start',
    marginTop: Spacing.md,

    '&:first-of-type': {
      marginTop: 0,
    },
  },
};

const FormLayoutSearchSubmit = {
  position: 'relative',

  "& > input[type='text']": {
    paddingRight: Spacing['2xl'],
  },

  [`& > a,
    & > button`]: {
    backgroundColor: 'transparent',
    borderRadius: '4px',
    color: Colors.black,
    height: Spacing.lg,
    padding: '4px',
    position: 'absolute',
    top: Spacing.min,
    right: Spacing.min,
    transition: 'background 0.5s ease-in-out',
    width: Spacing.lg,

    '& > svg': {
      fill: Colors.black,
      height: '100%',
      transition: 'fill 0.5s ease-in-out',
      width: '100%',
    },

    [`&:hover,
      &:focus`]: {
      backgroundColor: Colors.red,

      '& svg': {
        fill: Colors.white,
      },
    },
  },
};

const FormLayouts = {
  '.umd-forms-layout-field': {
    ...FormLayoutField,
  },

  '.umd-forms-layout-fieldset-grid-two': {
    ...FormLayoutFieldsetGridTwo,
  },

  '.umd-forms-layout-fieldset-grid-three': {
    ...FormLayoutFieldsetGridThree,
  },

  '.umd-forms-layout-fieldset-list': {
    ...FormLayoutFieldsetList,
  },

  '.umd-forms-layout-wrapper-search-submit': {
    ...FormLayoutSearchSubmit,
  },
};

export default FormLayouts;

import { Tokens, Typography } from '@universityofmaryland/variables';
import Assets from '../../assets';
import State from './state';

const { Colors, Spacing, Queries } = Tokens;
const { Icons } = Assets;
const { FormFieldValidation } = State;

const FormLayoutWrapper = {
  backgroundColor: Colors.gray.lighter,
  padding: `${Spacing.md}`,

  [`@media (${Queries.tablet.min})`]: {
    padding: `${Spacing.lg}`,
  },

  [`@media (${Queries.desktop.min})`]: {
    padding: `${Spacing['3xl']}`,
  },

  '& > *': {
    marginTop: Spacing.md,

    [`@media (${Queries.tablet.min})`]: {
      marginTop: Spacing.xl,
    },

    '&:first-child': {
      marginTop: 0,
    },
  },
};

const FormLayoutHeadlineWithAction = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: Spacing.sm,
  justifyContent: 'space-between',
  position: 'relative',

  '& > *:first-child': {
    maxWidth: '100%',
    flex: '1 0 auto',
  },

  '& > *:first-child + *:last-child:not(:first-child)': {
    margin: 0,
    position: 'relative',
    zIndex: 999,
  },
};

const FormFieldInstructions = {
  ...Typography.SansSmaller,

  display: 'block',
  fontStyle: 'italic',
  marginTop: Spacing.xs,

  '& *': {
    margin: 0,
    marginTop: Spacing.min,

    '&:first-child': {
      marginTop: 0,
    },
  },
};

const FormLayoutField = {
  '& label': {
    ...Typography.SansLarge,

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

  '& .umd-forms-instructions': {
    ...FormFieldInstructions,
  },
};

const FormLayoutBaseFieldset = {
  '& > legend': {
    ...Typography.SansLarge,

    marginBottom: Spacing.sm,
    position: 'relative',

    [`@media (${Queries.large.min})`]: {
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

  '& .umd-forms-instructions': {
    ...FormFieldInstructions,
  },
};

const FormLayoutBaseFieldsetGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: `${Spacing.sm} ${Spacing.xl}`,
  justifyItems: 'start',

  [`@media (${Queries.large.min})`]: {
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

  [`@media (${Queries.desktop.min})`]: {
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
  '.umd-forms-layout': {
    ...FormLayoutWrapper,
  },

  '.umd-forms-layout-headline-with-action': {
    ...FormLayoutHeadlineWithAction,
  },

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

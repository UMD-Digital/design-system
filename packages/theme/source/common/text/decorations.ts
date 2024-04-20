import { Elements, Typography, Tokens } from '@universityofmaryland/variables';

const { Eyebrow } = Elements;
const { Spacing, Colors, Queries } = Tokens;
const { LabelSmall } = Typography;

const Tailwing = {
  ...LabelSmall,
  textAlign: 'center',
  textTransform: 'uppercase',
  overflow: 'hidden',
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '9px',
    left: `0`,
    width: `100vw`,
    height: '1px',
    background: `${Colors.black}`,
    zIndex: -1,
  },

  '& > span': {
    position: 'relative',
    display: 'inline-block',
    maxWidth: '70%',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: `-2px`,
      right: `-2px`,
      height: '100%',
      backgroundColor: `${Colors.white}`,
      zIndex: -1,

      [`@media (${Queries.medium.min})`]: {
        left: `-${Spacing.min}`,
        right: `-${Spacing.min}`,
      },

      [`@media (${Queries.large.min})`]: {
        left: `-${Spacing.sm}`,
        right: `-${Spacing.sm}`,
      },
    },
  },

  '& + *': {
    marginTop: Spacing.md,
  },
};

const PillWrapper = {
  marginTop: `-${Spacing.min}`,

  '& > *': {
    backgroundColor: Colors.gray.lightest,
    display: 'inline-block',
    padding: `${Spacing.min} ${Spacing.xs}`,
    marginBottom: '0',
    marginTop: Spacing.min,
  },

  '& a': {
    transition: 'color .5s ease',
  },

  '& a:hover, &:focus': {
    color: Colors.red,
  },
};

const AdjustentLineText = {
  paddingLeft: Spacing.sm,
  borderLeft: `1px solid ${Colors.red}`,
};

export default {
  '.umd-eyebrow-ribbon': {
    ...Eyebrow.Ribbon,
  },
  '.umd-tailwings-headline': {
    ...Tailwing,
  },
  '.umd-adjustent-line-text': {
    ...AdjustentLineText,
  },
  '.umd-pills': {
    ...PillWrapper,
  },
};

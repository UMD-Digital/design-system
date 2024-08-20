import { Elements, Typography, Tokens } from '@universityofmaryland/variables';
import background from 'layout/background';

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

const TailwingRight = {
  ...LabelSmall,
  textTransform: 'uppercase',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: `${Colors.white}`,

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '9px',
    right: `0`,
    width: `100vw`,
    height: '1px',
    background: `${Colors.black}`,
    zIndex: 1,
  },

  '& > span': {
    position: 'relative',
    backgroundColor: `inherit`,
    paddingRight: Spacing.min,
    zIndex: 2,
  },

  '& + *': {
    marginTop: Spacing.xl,
  },
};

const TailwingRightLight = {
  ...TailwingRight,
  backgroundColor: `${Colors.gray.lightest}`,

  '&::before': {
    background: `${Colors.gray.medium}`,
  },
};

const TailwingRightDark = {
  ...TailwingRight,
  backgroundColor: `${Colors.gray.darker}`,

  '&::before': {
    background: `${Colors.white}`,
  },

  '& > span': {
    color: `${Colors.white}`,
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

  '& a:hover, &:focus': {
    textDecoration: 'underline',
  },
};

const PillList = {
  marginTop: `-${Spacing.min}`,

  '& > *': {
    backgroundColor: Colors.gray.lightest,
    display: 'inline-block',
    padding: `${Spacing.min} ${Spacing.xs}`,
    marginBottom: '0',
    marginTop: Spacing.min,
    transition: 'background-color 0.3s',

    '& > span': {
      display: 'flex',
      gap: '4px',
      whiteSpace: 'nowrap',
    },
  },

  '& svg': {
    height: '12px',
    width: '12px',
  },

  '& a:hover, & a:focus': {
    backgroundColor: Colors.gold,
  },
};

const AdjustentLineText = {
  paddingLeft: Spacing.sm,
  borderLeft: `1px solid ${Colors.red}`,
};

const AdjanctLineText = {
  position: 'relative',

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: '-24px',
    width: '2px',
    height: '100%',
    backgroundColor: Colors.red,
  },
};

export default {
  '.umd-eyebrow-ribbon': {
    ...Eyebrow.Ribbon,
  },
  '.umd-tailwings-headline': {
    ...Tailwing,
  },
  '.umd-tailwing-right-headline': {
    ...TailwingRight,
  },
  '.umd-tailwing-right-headline[theme="light"]': {
    ...TailwingRightLight,
  },
  '.umd-tailwing-right-headline[theme="dark"]': {
    ...TailwingRightDark,
  },
  '.umd-adjustent-line-text': {
    ...AdjustentLineText,
  },
  '.umd-adjacent-line-text': {
    ...AdjanctLineText,
  },
  '.umd-pills': {
    ...PillWrapper,
  },
  '.umd-pill-list': {
    ...PillList,
  },
};

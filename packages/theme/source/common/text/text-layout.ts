import { Typography, Tokens } from '@universityofmaryland/variables';

const { Spacing, Queries, Colors } = Tokens;
const { LabelSmall } = Typography;

const TextColumns = {
  display: 'flex',
  flexWrap: 'wrap',

  [`@media (${Queries.large.max})`]: {
    flexDirection: 'column',
  },

  '& a': {
    color: 'currentColor',
    textDecoration: 'underline',
    transition: 'color 0.5s',
  },

  '& a:hover, &:focus': {
    color: `${Colors.red}`,
  },
};

const TextColumnsWithLine = {
  ...TextColumns,

  '& > *:not(:last-child)': {
    [`@media (${Queries.large.max})`]: {
      marginBottom: Spacing.min,
    },

    [`@media (${Queries.tablet.min})`]: {
      marginRight: Spacing.sm,
      paddingRight: Spacing.sm,
      borderRight: `1px solid ${Colors.gray.medium}`,
    },
  },
};

export default {
  '.umd-text-columns-line': {
    ...TextColumnsWithLine,
  },

  '.umd-text-columns-line-capitize': {
    ...TextColumnsWithLine,

    '& > *': {
      textTransform: 'uppercase',
      margin: '0',
      ...LabelSmall,
    },
  },
};

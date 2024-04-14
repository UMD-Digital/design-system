import { Typography, Tokens } from '@universityofmaryland/variables';

const { Spacing, Colors } = Tokens;
const { LabelSmall } = Typography;

export default {
  '.umd-tailwings-headline': {
    ...LabelSmall,
    textAlign: 'center',
    textTransform: 'uppercase',
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      background: `${Colors.black}`,
      zIndex: -1,
    },

    '& span': {
      padding: `0 ${Spacing.sm}`,
      background: `${Colors.white}`,
    },
  },
};

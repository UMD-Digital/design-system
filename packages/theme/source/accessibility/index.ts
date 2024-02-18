import { Typography, Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing } = Tokens;
const { InterativeSmall } = Typography;

export default {
  '.sr-only': {
    clip: 'rect(0,0,0,0)',
    borderWidth: '0px',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
  '.umd-skip-content': {
    ...InterativeSmall,
    ...{
      backgroundColor: Colors.white,
      color: Colors.red,
      display: 'block',
      height: '0',
      padding: Spacing.min,
      position: 'absolute',
      zIndex: '-2147483647',
      opacity: '0',
      transition: 'none',
      textDecoration: 'underline',

      '&:focus': {
        display: 'block',
        height: 'inherit',
        zIndex: '2147483647',
        opacity: '1',
        transition: 'opacity 0.5s',
      },
    },
  },
};

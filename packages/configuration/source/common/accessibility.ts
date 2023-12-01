import { colors } from '../tokens/colors';
import { spacing } from '../tokens/layout';
import { typography } from '../common/typography';

const skipContent = {
  '.umd-skip-content': {
    ...typography['.umd-interactive-sans-small'],
    ...{
      backgroundColor: colors.white,
      color: colors.red,
      display: 'block',
      height: '0',
      padding: spacing.min,
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

const screenReaderOnly = {
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
};

export { skipContent, screenReaderOnly };

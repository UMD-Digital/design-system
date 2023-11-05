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

export { skipContent };

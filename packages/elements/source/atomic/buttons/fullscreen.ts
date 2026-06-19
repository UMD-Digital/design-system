import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { fullscreen as iconFullscreen } from '@universityofmaryland/web-icons-library/controls';

const CLASS_NAME = 'umd-action-button-full-screen';

const create = ({
  callback,
  index,
}: {
  callback: (arg: number) => void;
  index: number;
}) =>
  (() => {
    return new ElementBuilder('button')
      .withClassName(CLASS_NAME)
      .withAttribute('data-index', index.toString())
      .withAttribute('aria-label', 'View Full Screen')
      .withHTML(`Full Screen <span></span>${iconFullscreen}`)
      .on('click', () => callback(index))
      .styled(typography.sans.min)
      .withStyles({
        element: {
          position: 'absolute',
          top: '0',
          right: '0',
          color: token.color.white,
          textTransform: 'uppercase',
          fontWeight: '700',
          padding: token.spacing.min,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          transition: 'background-color 0.3s',

          '&:focus': {
            backgroundColor: 'rgba(0, 0, 0, 1)',
          },

          '@media (hover: hover)': {
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)',
            },
          },

          '& > span': {
            display: 'block',
            height: '12px',
            width: '1px',
            margin: `0 ${token.spacing.min}`,
            backgroundColor: token.color.gray.mediumAA,
          },
        },
      })
      .build();
  })();

export const fullscreen = {
  create,
  className: CLASS_NAME,
};

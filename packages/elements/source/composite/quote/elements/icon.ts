import * as token from '@universityofmaryland/web-styles-library/token';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { quote as iconQuote } from '@universityofmaryland/web-icons-library/brand';
import { SMALL } from '../_constants';
import { type QuoteBaseProps, type QuoteVariantProps } from '../_types';

interface QuoteIconProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'isThemeMaryland'> {
  hasImage?: boolean;
}

export default ({
  hasImage = false,
  isThemeMaryland,
  isTypeFeatured = false,
}: QuoteIconProps) => {
  const imageWithFeaturedLayout = hasImage && isTypeFeatured;

  const iconSpan = new ElementBuilder('span')
    .withClassName('quote-icon-span')
    .withStyles({
      element: {
        display: 'block',
        position: 'absolute',

        ...(imageWithFeaturedLayout && {
          display: 'none',
        }),

        ...(!hasImage && {
          height: '15px',
          width: '22px',
          left: '-24px',
          top: '-32px',

          [`@container (min-width: ${SMALL}px)`]: {
            left: `-${token.spacing['4xl']}`,
            top: '0',
          },
        }),

        ...(hasImage && {
          bottom: '-7px',
          left: '-2px',
          height: '15px',
          width: '21px',

          [`@container (min-width: ${SMALL}px)`]: {
            height: '20px',
            width: '29px',
            top: '-11px',
            right: '-20px',
            left: 'inherit',
          },
        }),

        ['& svg']: {
          fill: token.color.red,

          ...(isThemeMaryland && {
            fill: token.color.gold,
          }),
        },
      },
    })
    .build();

  iconSpan.element.innerHTML = iconQuote;

  return iconSpan;
};

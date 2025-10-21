import * as token from '@universityofmaryland/web-styles-library/token';
import { quote as iconQuote } from '@universityofmaryland/web-icons-library/brand';
import ElementBuilder from '@universityofmaryland/web-builder-library';
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

  const iconSpan = ElementBuilder.create.span({
    className: 'quote-icon-span',
    elementStyles: {
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
    },
  });

  iconSpan.element.innerHTML = iconQuote;

  return iconSpan;
};
